import Link from "next/link";

export default function ChefBurp() {
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
				<div className="card-body">
					<input
						type="text"
						name="searchbar"
						id="searchbar"
						className="input input-sm"
						placeholder="...food. burp."
					/>
				</div>
			</div>
			<div className="grid gap-3 sm:grid-cols-2">
				<RecipeCard title="Ayam Masak Merah" description="ayam yang digoreng" />
				<RecipeCard title="Ayam Goreng" description="ayam yang digoreng" />
				<RecipeCard title="Ayam Goreng" description="ayam yang digoreng" />
				<RecipeCard title="Ayam Goreng" description="ayam yang digoreng" />
				<RecipeCard title="Ayam Goreng" description="ayam yang digoreng" />
			</div>
		</>
	);
}

type RecipeCardType = {
	title: string;
	description: string;
};

const RecipeCard = ({ title, description }: RecipeCardType) => {
	return (
		<Link href={`/chefburp/${title}`}>
			<div className="card bg-neutral hover:border-primary hover:border">
				<div className="card-body">
					<h1 className="text-lg font-semibold text-primary">{title}</h1>
					<p className="text-sm">{description}</p>
				</div>
			</div>
		</Link>
	);
};
