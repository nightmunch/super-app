import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineUser } from "react-icons/ai";

type User = {
	name: string;
	img_dir: string;
};

export const SidebarProfile: React.FunctionComponent<User> = ({
	name = "Guest",
	img_dir = "",
}) => {
	// If the link is clicked, close the drawer
	function closeDrawer() {
		const drawer = document.getElementById("my-drawer")!;
		drawer.click();
	}

	const router = useRouter();
	const href = "/profile";
	return (
		<>
			<li>
				<Link href={`${name != "Guest" ? "/profile" : ""}`}>
					<a
						onClick={closeDrawer}
						className={` ${
							router.pathname == href ? "bg-[#2B2C33] text-primary" : ""
						}`}
					>
						{name == "Guest" ? (
							<div className="avatar placeholder">
								<div className="bg-neutral-focus items-center text-neutral-content rounded-full w-9">
									<span className="text-3xl text-primary">
										<AiOutlineUser />
									</span>
								</div>
							</div>
						) : (
							<div className="h-9 w-9">
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
