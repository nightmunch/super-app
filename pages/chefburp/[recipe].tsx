import { useRouter } from "next/router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { MenuBar } from "../../components/MenuBar";
import { ModalRemove } from "../../components/chefburp/ModalRemove";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

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

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

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

	const { data: sessionData } = useSession();

	return (
		<>
			{!ingredients?.getText() ? (
				<div className="inline-flex items-center">
					<svg
						className="animate-spin mr-3 h-5 w-5 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					Loading...
				</div>
			) : (
				<div className="card bg-neutral text-neutral-content">
					<div className="card-body">
						{editable ? (
							<input
								type="text"
								className="input"
								value={title == "" ? (recipe.data?.title as string) : title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						) : (
							<h1 className="text-xl font-semibold text-primary capitalize">
								{recipe.data?.title}
							</h1>
						)}
						{editable ? (
							<input
								type="text"
								className="input"
								value={
									description == ""
										? (recipe.data?.description as string)
										: description
								}
								onChange={(e) => setDescription(e.target.value)}
							/>
						) : (
							<p className="text-sm">{recipe.data?.description}</p>
						)}
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
										title: title == "" ? (recipe.data?.title as string) : title,
										description:
											description == ""
												? (recipe.data?.description as string)
												: description,
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
							<button className="btn btn-sm btn-warning mt-2">Back</button>
						</Link>
						{sessionData?.user?.role == "Admin" ? (
							<div className="flex">
								<div className="tooltip" data-tip="Remove Recipe">
									<label
										htmlFor="delete-recipe"
										className="btn btn-square btn-error mt-2"
									>
										<FaTrash />
									</label>
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			)}
			<ModalRemove
				htmlfor="delete-recipe"
				title="Delete this recipe?"
				description="Are you sure you want to delete this recipe?"
				buttonTitle="Remove Recipe"
				id={id}
				alertMessage={"Recipe is successfully deleted!"}
			/>
		</>
	);
}
