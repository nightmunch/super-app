import { useAutoAnimate } from "@formkit/auto-animate/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ModalAdd } from "../../components/chefburp/ModalAdd";
import { useRecipeReducer } from "../../hooks/useRecipeReducer";
import { trpc } from "../../utils/trpc";

export default function ChefBurp() {
	const [searchBar, setSearchBar] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const recipeQuery = trpc.useQuery(["recipe.list", { search }]);

	const [recipeState, recipeDispatch] = useRecipeReducer();

	useEffect(() => {
		const timeOutId = setTimeout(() => setSearch(searchBar), 500);
		return () => clearTimeout(timeOutId);
	}, [searchBar]);

	const [parent] = useAutoAnimate<HTMLDivElement>();

	return (
		<>
			<div className="card bg-neutral text-neutral-content">
				<div className="card-body">
					<div className="flex flex-col xl:w-1/2 md:m-auto sm:flex-row sm:gap-10 justify-center">
						<div className="flex">
							<div className="my-auto">
								<h1 className="text-lg">Welcome to</h1>
								<h2 className="text-3xl font-semibold text-primary">
									Chef Burp!
								</h2>
								<h2 className="text-lg pt-1">
									Community-based recipe library to find your favourite recipe.
									Burp!
								</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="card bg-neutral text-neutral-content">
				<div className="card-body flex-row items-center">
					<input
						type="text"
						name="searchbar"
						id="searchbar"
						className="input input-sm grow"
						placeholder="...food. burp."
						value={searchBar}
						onChange={(e) => setSearchBar(e.target.value)}
					/>
					<div className="tooltip" data-tip="Add Recipe">
						<label htmlFor="add-recipe" className="btn btn-ghost">
							<FaPlus />
						</label>
					</div>
				</div>
			</div>
			<div className="grid gap-3 sm:grid-cols-2" ref={parent}>
				{recipeQuery.data?.map((item, index) => (
					<RecipeCard
						key={item.id}
						title={item.title}
						description={item.description}
						id={item.id}
					/>
				))}
			</div>
			<ModalAdd
				htmlfor={"add-recipe"}
				alertMessage={"Recipe has successfully added!"}
				state={recipeState}
				dispatch={recipeDispatch}
			/>
		</>
	);
}

type RecipeCardType = {
	title: string;
	description: string | null;
	id: string;
};

const RecipeCard = ({ title, description, id }: RecipeCardType) => {
	return (
		<Link href={`/chefburp/${id}`}>
			<div className="card bg-neutral hover:border-primary hover:border">
				<div className="card-body">
					<h1 className="text-lg font-semibold text-primary capitalize">
						{title}
					</h1>
					<p className="text-sm">{description}</p>
				</div>
			</div>
		</Link>
	);
};
