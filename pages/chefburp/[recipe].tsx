import Link from "next/link";
import { useRouter } from "next/router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

export default function Recipe() {
	const router = useRouter();
	const recipe = router.query.recipe;
	const description = "ayam yang digoreng";

	const [editable, setEditable] = useState(false);

	const ingredients = useEditor({
		extensions: [StarterKit],
		// intial content
		content: `<ul>
                    <li>ingredient 1</li>
                    <li>ingredient 1</li>
                    <li>ingredient 1</li>
                    <li>ingredient 1</li>
                </ul>`,
		editable: false,
	});
	const steps = useEditor({
		extensions: [StarterKit],
		// intial content
		content: `<ol>
                    <li>step 1</li>
                    <li>step 1</li>
                    <li>step 1</li>
                    <li>step 1</li>
                </ol>`,
		editable: false,
	});

	return (
		<>
			<div className="card bg-neutral text-neutral-content">
				<div className="card-body">
					<h1 className="text-xl font-semibold text-primary">{recipe}</h1>
					<p className="text-sm">{description}</p>
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
						onClick={() => {
							ingredients?.setEditable(!editable);
							steps?.setEditable(!editable);
							setEditable(!editable);
							// TODO:
							// [] save to database
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
