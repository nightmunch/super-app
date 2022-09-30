import Link from "next/link";
import { useRouter } from "next/router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { MenuBar } from "../../components/MenuBar";

export default function Recipe() {
	const router = useRouter();
	const id = router.query.recipe as string;

	const utils = trpc.useContext();
	const updateRecipe = trpc.useMutation(["recipe.update"], {
		async onSuccess() {
			// refetches posts after a post is adjusted
			await utils.invalidateQueries(["recipe.show"]);
		},
	});

	const [editable, setEditable] = useState(false);

	const ingredients = useEditor({
		extensions: [StarterKit],
		editable: false,
	});
	const steps = useEditor({
		extensions: [StarterKit],
		editable: false,
	});

	const recipe = trpc.useQuery(["recipe.show", { id }], {
		onSuccess: (data) => {
			if (ingredients) {
				ingredients.commands.setContent(data?.ingredient as string);
			}
			if (steps) {
				steps.commands.setContent(data?.step as string);
			}
		},
	});

	return (
		<>
			<div className="card bg-neutral text-neutral-content">
				<div className="card-body">
					<h1 className="text-xl font-semibold text-primary capitalize">
						{recipe.data?.title}
					</h1>
					<p className="text-sm">{recipe.data?.description}</p>
					<div className="divider my-0"></div>
					{editable ? <MenuBar editor={ingredients} /> : <></>}
					<h2 className="text-lg font-semibold text-primary">Ingredients</h2>
					<EditorContent editor={ingredients} />
					{editable ? <MenuBar editor={steps} /> : <></>}
					<h2 className="text-lg font-semibold text-primary text-">Steps</h2>
					<EditorContent editor={steps} />
					<div className="divider my-0"></div>
					<button
						className="btn btn-sm btn-info"
						onClick={async () => {
							if (editable) {
								await updateRecipe.mutateAsync({
									id,
									title: recipe.data?.title as string,
									description: recipe.data?.description as string,
									ingredient: ingredients?.getHTML() as string,
									step: steps?.getHTML() as string,
								});
							}

							ingredients?.setEditable(!editable);
							steps?.setEditable(!editable);
							setEditable(!editable);
						}}
					>
						{editable ? "Done" : "Edit"}
					</button>
					<Link href={"/chefburp"}>
						<button className="btn btn-sm btn-error mt-2">Back</button>
					</Link>
				</div>
			</div>
		</>
	);
}
