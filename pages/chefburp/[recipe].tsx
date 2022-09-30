import Link from "next/link";
import { useRouter } from "next/router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

export default function Recipe() {
	const router = useRouter();
	const id = router.query.recipe as string;

	const utils = trpc.useContext();
	const recipe = trpc.useQuery(["recipe.show", { id }]);
	const updateRecipe = trpc.useMutation(["recipe.update"], {
		async onSuccess() {
			// refetches posts after a post is adjusted
			await utils.invalidateQueries(["recipe.show"]);
		},
	});

	const [editable, setEditable] = useState(false);

	const ingredients = useEditor({
		extensions: [StarterKit],
		// intial content
		content: recipe.data?.ingredient,
		editable: false,
	});
	const steps = useEditor({
		extensions: [StarterKit],
		// intial content
		content: recipe.data?.step,
		editable: false,
	});

	return (
		<>
			<div className="card bg-neutral text-neutral-content">
				<div className="card-body">
					<h1 className="text-xl font-semibold text-primary">
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

const MenuBar = ({ editor }: { editor: any }) => {
	if (!editor) {
		return null;
	}

	return (
		<>
			<div className="flex gap-2 overflow-x-auto hide-scroll">
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					className={`btn btn-sm btn-ghost ${
						editor.isActive("bold") ? "btn-active" : ""
					}`}
				>
					bold
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={`btn btn-sm btn-ghost ${
						editor.isActive("heading", { level: 1 }) ? "btn-active" : ""
					}`}
				>
					h1
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={`btn btn-sm btn-ghost ${
						editor.isActive("bulletList") ? "btn-active" : ""
					}`}
				>
					bullet list
				</button>
				<button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={`btn btn-sm btn-ghost ${
						editor.isActive("orderedList") ? "btn-active" : ""
					}`}
				>
					ordered list
				</button>
				<button
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}
					className="btn btn-sm btn-ghost"
				>
					undo
				</button>
				<button
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}
					className="btn btn-sm btn-ghost"
				>
					redo
				</button>
			</div>
		</>
	);
};
