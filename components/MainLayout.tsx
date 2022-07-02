import Image from "next/image";
import { useState } from "react";
import { SidebarLink } from "./SidebarLink";
import { FaHome, FaHeart, FaCog, FaBars, FaGrinSquint } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
export const MainLayout: React.FunctionComponent = ({ children }) => {
	type User = {
		name: string;
		img_dir: string;
	};
	const [user, setUser] = useState<User>({
		name: "Shahrin Amin",
		img_dir: "/me.jpg",
	});
	return (
		<div className="drawer" data-Barseme="mytheme">
			<input id="my-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				<div className="navbar bg-base-300 gap-2 sticky top-0 z-50">
					<div className="flex-none">
						<label htmlFor="my-drawer" className="btn btn-square btn-ghost">
							<FaBars />
						</label>
					</div>
					<div className="flex-1">
						<h1 className="normal-case text-xl text-primary font-semibold">
							Super<span className="text-base-content">App</span>
						</h1>
					</div>
				</div>
				<div className="flex flex-col h-screen my-auto items-center pt-5 gap-5">
					<div className="w-11/12 space-y-5">{children}</div>
					<div className="bg-base-100 pb-5 text-center mt-auto">
						<h1 className="text-sm font-thin">
							Created by one and only,{" "}
							<span className="text-blue-400 underline decoration-wavy">
								nightmunch
							</span>
						</h1>
						<h1 className="pt-3">
							Made With{" "}
							<a href="https://nextjs.org/">
								<TbBrandNextjs className="text-white text-2xl inline" />
							</a>
						</h1>
					</div>
				</div>
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer" className="drawer-overlay"></label>
				<ul className="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">
					<h1 className="ml-3 text-3xl font-semibold text-primary">
						Super<span className="text-base-content">App</span>
					</h1>
					<div className="flex flex-col justify-between flex-1">
						<nav className="pt-5">
							<SidebarLink href="/" name="Home">
								<FaHome />
							</SidebarLink>
							<SidebarLink href="/shahrin" name="About Me">
								<FaGrinSquint />
							</SidebarLink>
							{/* <SidebarLink href="/aimi" name="Aimi">
								<FaHeart />
							</SidebarLink> */}
							<hr className="m-3 border-base-content" />
							<SidebarLink href="/settings" name="Settings">
								<FaCog />
							</SidebarLink>
						</nav>
						<div className="flex items-center px-4 -mx-2">
							{user !== null ? (
								<>
									<div className="h-9 w-9">
										<Image
											src={user.img_dir}
											alt="Avatar"
											width={1000}
											height={1000}
											className="object-cover mx-2 rounded-full"
										/>
									</div>
									<h4 className="ml-4 font-medium text-base-content hover:underline">
										{user.name}
									</h4>
								</>
							) : (
								""
							)}
						</div>
					</div>
				</ul>
			</div>
		</div>
	);
};
