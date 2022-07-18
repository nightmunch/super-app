import { SidebarLink } from "./SidebarLink";
import { TbBrandNextjs } from "react-icons/tb";
import { SidebarProfile } from "./SidebarProfile";
import {
	FaHome,
	FaCog,
	FaBars,
	FaGrinSquint,
	FaSignInAlt,
	FaSignOutAlt,
	FaHouseUser,
} from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";

export const MainLayout: React.FunctionComponent = ({ children }) => {
	const { data: sessionData } = useSession();
	return (
		<div className="drawer" data-barseme="mytheme">
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
					<div className="pr-2">
						<div>
							<button
								className="btn btn-ghost"
								onClick={sessionData ? () => signOut() : () => signIn()}
							>
								{sessionData ? (
									<>
										<FaSignOutAlt className="inline mr-2" />
										<span>Sign Out</span>
									</>
								) : (
									<>
										<FaSignInAlt className="inline mr-2" />
										<span>Sign In</span>
									</>
								)}
							</button>
						</div>
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
							<SidebarLink href="/" name="Home" icon={FaHome} />
							<SidebarLink
								href="/shahrin"
								name="About Me"
								icon={FaGrinSquint}
							/>
							<div className="divider"></div>
							<SidebarLink
								href="/findmehome"
								name="Find Me Home"
								icon={FaHouseUser}
							/>
							{sessionData?.user?.role == "Admin" ? (
								<>
									<div className="divider"></div>
									<SidebarLink href="/settings" name="Settings" icon={FaCog} />
								</>
							) : (
								<></>
							)}
						</nav>
						<div className="flex items-center px-4 -mx-2">
							<SidebarProfile
								name={sessionData?.user?.name!}
								img_dir={sessionData?.user?.image!}
							/>
						</div>
					</div>
				</ul>
			</div>
		</div>
	);
};
