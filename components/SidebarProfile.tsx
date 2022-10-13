import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { AiOutlineUser } from "react-icons/ai";
import { handleDrawerAtom } from "./MainLayout";

type User = {
	name: string;
	img_dir: string;
};

export const SidebarProfile: React.FunctionComponent<User> = ({
	name = "Guest",
	img_dir = "",
}) => {
	const [handleDrawer, setHandleDrawer] = useAtom(handleDrawerAtom);

	const router = useRouter();
	const href = "/profile";
	return (
		<>
			<li>
				<Link href={`${name != "Guest" ? "/profile" : "#"}`}>
					<a
						onClick={() => setHandleDrawer(false)}
						className={` ${
							router.pathname == href ? "bg-neutral text-primary" : ""
						}`}
					>
						{name == "Guest" ? (
							<div className="avatar placeholder">
								<div className="bg-neutral-focus items-center text-neutral-content rounded-full w-9 ring ring-primary ring-offset-base-100 ring-offset-2">
									<span className="text-3xl text-primary">
										<AiOutlineUser />
									</span>
								</div>
							</div>
						) : (
							<div className="h-9 w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
								<Image
									src={img_dir}
									alt="Avatar"
									width={1000}
									height={1000}
									className="object-cover mx-2 rounded-full"
								/>
							</div>
						)}
						<h4 className="ml-4 font-medium">{name}</h4>
					</a>
				</Link>
			</li>
		</>
	);
};
