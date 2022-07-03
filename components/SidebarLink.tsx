import Link from "next/link";
import { useRouter } from "next/router";

type SidebarLinkProps = {
	href: string;
	name: string;
};

export const SidebarLink: React.FunctionComponent<SidebarLinkProps> = ({
	href,
	name,
	children,
}) => {
	// If the link is clicked, close the drawer
	function closeDrawer() {
		const drawer = document.getElementById("my-drawer")!;
		drawer.click();
	}
	const router = useRouter();

	return (
		<li
			className={`py-1 ${
				router.pathname == href ? "bordered text-primary" : ""
			}`}
		>
			<Link href={href}>
				<a onClick={closeDrawer} className={""}>
					{children}
					<span className="mx-4 font-medium">{name}</span>
				</a>
			</Link>
		</li>
	);
};
