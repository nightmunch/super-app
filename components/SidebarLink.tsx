import Link from "next/link";
import { useRouter } from "next/router";
import { createElement } from "react";
import { IconType } from "react-icons/lib";

type SidebarLinkProps = {
	href: string;
	name: string;
	icon: IconType;
};

export const SidebarLink: React.FunctionComponent<SidebarLinkProps> = ({
	href,
	name,
	icon,
}) => {
	// If the link is clicked, close the drawer
	function closeDrawer() {
		const drawer = document.getElementById("my-drawer")!;
		drawer.click();
	}
	const router = useRouter();

	return (
		<div>
			<li className={`py-1`}>
				<Link href={href}>
					<a
						onClick={closeDrawer}
						className={` ${
							router.pathname == href ? "bg-[#2B2C33] text-primary" : ""
						}`}
					>
						{createElement(icon)}
						<span className="mx-4 font-medium">{name}</span>
					</a>
				</Link>
			</li>
		</div>
	);
};
