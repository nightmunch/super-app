import { Dispatch } from "react";
import { trpc } from "../../utils/trpc";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "../MenuBar";

enum RecipeActionKind {
	SET_TITLE = "title",
	SET_DESCRIPTION = "description",
	SET_INGREDIENT = "ingredient",
	SET_STEP = "step",
	CLEAR_ALL = "clear_all",
}

interface RecipeState {
	title: string;
	description: string;
	ingredient: string;
	step: string;
}

type Props = {
	htmlfor: string;
	alertMessage: string;
	dispatch: Dispatch<any>;
	state: RecipeState;
	alertDispatch: Dispatch<any>;
};

export const ModalAdd = ({
	htmlfor,
	alertMessage,
	dispatch,
	state,
	alertDispatch,
}: Props) => {
	const utils = trpc.useContext();
	const createRecipe = trpc.useMutation(["recipe.create"], {
		async onSuccess() {
			// refetches posts after a post is adjusted
			await utils.invalidateQueries(["recipe.list"]);
		},
	});

	const ingredients = useEditor({
		extensions: [StarterKit],
		// intial content
		content: state.ingredient,
		editorProps: {
			attributes: {
				class: "textarea textarea-bordered pl-2 mt-2 border rounded-md",
			},
		},
		onUpdate: ({ editor }) => {
			dispatch({
				type: RecipeActionKind.SET_INGREDIENT,
				payload: editor.getHTML(),
			});
		},
	});
	const steps = useEditor({
		extensions: [StarterKit],
		// intial content
		content: state.step,
		editorProps: {
			attributes: {
				class: "textarea textarea-bordered pl-2 mt-2 border rounded-md",
			},
		},
		onUpdate: ({ editor }) => {
			dispatch({
				type: RecipeActionKind.SET_STEP,
				payload: editor.getHTML(),
			});
		},
	});

	const addRecipe = async () => {
		// create recipe
		await createRecipe.mutateAsync({
			title: state.title,
			description: state.description,
			ingredient: state.ingredient,
			step: state.step,
		});
		dispatch({
			type: RecipeActionKind.CLEAR_ALL,
		});
	};

	return (
		<>
			<input type="checkbox" id={htmlfor} className="modal-toggle" />
			<label htmlFor={htmlfor} className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<h1 className="text-xl font-semibold text-primary">Add Recipe</h1>
					<div className="divider"></div>
					<div className="flex flex-col gap-5">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Title</span>
							</label>
							<input
								type="text"
								placeholder="title..burp"
								className="input input-bordered w-full"
								value={state.title}
								onChange={(e) => {
									dispatch({
										type: RecipeActionKind.SET_TITLE,
										payload: e.target.value,
									});
								}}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Description</span>
							</label>
							<input
								type="text"
								placeholder="description..burp"
								className="input input-bordered w-full"
								value={state.description}
								onChange={(e) => {
									dispatch({
										type: RecipeActionKind.SET_DESCRIPTION,
										payload: e.target.value,
									});
								}}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Ingredients</span>
							</label>
							<MenuBar editor={ingredients} />
							<EditorContent editor={ingredients} />
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Steps</span>
							</label>
							<MenuBar editor={steps} />
							<EditorContent editor={steps} />
						</div>
						<label
							htmlFor={htmlfor}
							className="btn btn-primary input"
							onClick={() => addRecipe()}
						>
							Add
						</label>
					</div>
				</label>
			</label>
		</>
	);
};
