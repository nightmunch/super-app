import Image from "next/image";
type User = {
	name: string;
	img_dir: string;
};

export const SidebarProfile: React.FunctionComponent<User> = ({
	name,
	img_dir,
}) => {
	return (
		<>
			<div className="h-9 w-9">
				<Image
					src={img_dir}
					alt="Avatar"
					width={1000}
					height={1000}
					className="object-cover mx-2 rounded-full"
				/>
			</div>
			<h4 className="ml-4 font-medium text-base-content hover:underline">
				{name}
			</h4>
		</>
	);
};
