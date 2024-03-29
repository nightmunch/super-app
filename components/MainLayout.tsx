import { SidebarLink } from "./SidebarLink";
import { TbBrandNextjs, TbToolsKitchen2 } from "react-icons/tb";
import { SidebarProfile } from "./SidebarProfile";
import { useSwipeable } from "react-swipeable";
import {
	FaHome,
	FaCog,
	FaBars,
	FaGrinSquint,
	FaSignInAlt,
	FaSignOutAlt,
	FaHouseUser,
	FaPiggyBank,
} from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";

import { atom, useAtom } from "jotai";
import { RiPaintFill } from "react-icons/ri";
import { Toaster } from "react-hot-toast";

export const themeAtom = atom<string>("shahrin");
export const handleDrawerAtom = atom<boolean>(false);

const swipeOpenMenuStyles = {
	float: "left",
	position: "fixed",
	width: "50%",
	height: "100%",
} as React.CSSProperties;

export const MainLayout = ({ children }: any) => {
	const [theme, setTheme] = useAtom(themeAtom);
	const [handleDrawer, setHandleDrawer] = useAtom(handleDrawerAtom);

	const handlers = useSwipeable({
		trackMouse: true,
		onSwipedRight: () => setHandleDrawer(true),
	});

	const { data: sessionData } = useSession();
	return (
		<>
			<Toaster
				toastOptions={{
					className: "!bg-neutral !text-base-content",
					success: {
						className: "!bg-success",
					},
					error: {
						className: "!bg-error",
					},
				}}
			/>
			<div className="drawer">
				<input
					id="my-drawer"
					type="checkbox"
					className="drawer-toggle"
					checked={handleDrawer}
					readOnly
				/>
				<div className="drawer-content">
					<div {...handlers} style={swipeOpenMenuStyles} />
					<div className="navbar bg-neutral gap-2 sticky top-0 z-50 shadow-sm">
						<div className="flex-none">
							<label
								htmlFor="my-drawer"
								className="btn btn-square btn-ghost"
								onClick={() => setHandleDrawer(true)}
							>
								<FaBars />
							</label>
						</div>
						<div className="flex-1">
							<h1 className="normal-case text-xl text-primary font-semibold">
								Super<span className="text-base-content">App</span>
							</h1>
						</div>
						<div className="pr-2">
							<div className="tooltip tooltip-bottom" data-tip="Change Theme">
								<button
									// type="checkbox"
									className="btn btn-ghost"
									data-toggle-theme="shahrin,aimi"
									data-act-class="ACTIVECLASS"
									onClick={() => {
										setTheme(
											document.documentElement.getAttribute("data-theme")!
										);
									}}
								>
									<RiPaintFill size={20} />
								</button>
							</div>
							<div>
								<button
									className="btn btn-ghost"
									onClick={
										sessionData
											? () => signOut({ redirect: false })
											: () => signIn("auth0")
									}
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
									<TbBrandNextjs className="text-2xl inline" />
								</a>
							</h1>
						</div>
					</div>
				</div>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer"
						className="drawer-overlay"
						onClick={() => setHandleDrawer(false)}
					></label>
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
									href="/moneytrack"
									name="Money Track"
									icon={FaPiggyBank}
								/>
								<SidebarLink
									href="/chefburp"
									name="Chef Burp"
									icon={TbToolsKitchen2}
								/>
								{/* <SidebarLink href="/storeit" name="Store It" icon={MdInventory} /> */}
								<SidebarLink
									href="/findmehome"
									name="Find Me Home"
									icon={FaHouseUser}
								/>
								{sessionData?.user?.role == "Admin" ? (
									<>
										<div className="divider"></div>
										<SidebarLink
											href="/settings"
											name="Settings"
											icon={FaCog}
										/>
									</>
								) : (
									<></>
								)}
							</nav>
							<div className="">
								<SidebarProfile
									name={sessionData?.user?.name!}
									img_dir={sessionData?.user?.image!}
								/>
							</div>
						</div>
					</ul>
				</div>
			</div>
		</>
	);
};
