import { FaTrash } from "react-icons/fa";

export function TodoList() {
	const dummies = [
		{
			content: "lorem1",
			isComplete: false,
		},
		{
			content: "lorem2",
			isComplete: true,
		},
		{
			content: "lorem3",
			isComplete: false,
		},
	];
	return (
		<>
			<div className="flex flex-col gap-4">
				<h1 className="text-xl font-semibold text-center text-primary">
					To-do List
				</h1>
				<div className="divider my-0"></div>
				<div className="flex flex-col gap-2">
					{dummies.map((dummy) => (
						<Todo
							key={dummy.content}
							content={dummy.content}
							isComplete={dummy.isComplete}
						/>
					))}
				</div>
				<div className="form-control">
					<label className="input-group input-group-sm ">
						<input
							type="text"
							placeholder="Hrm.."
							className="input input-bordered input-sm flex-1"
						/>
						<button className="btn btn-ghost btn-sm">Add Todo</button>
					</label>
				</div>
			</div>
		</>
	);
}

/**
 * TODO:
 * [] Schema for Todo
 * [] CRUD
 *  [] Create
 *  [] Read
 *  [] Update
 *  [] Delete
 */

function Todo({
	content,
	isComplete,
}: {
	content: string;
	isComplete: boolean;
}) {
	return (
		<>
			<div className="form-control flex-row justify-between gap-3">
				<label className="label justify-start cursor-pointer gap-2 truncate">
					<input
						type="checkbox"
						className="checkbox checkbox-primary"
						checked={isComplete}
					/>
					<span className="label-text ">{content}</span>
				</label>
				<div className="tooltip tooltip-error" data-tip="Delete Todo">
					<button className="btn btn-sm btn-outline btn-error px-2">
						<FaTrash />
					</button>
				</div>
			</div>
		</>
	);
}
