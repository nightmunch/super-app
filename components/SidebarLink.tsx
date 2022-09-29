import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { createElement } from "react";
import { IconType } from "react-icons/lib";
import { handleDrawerAtom } from "./MainLayout";

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
	const [handleDrawer, setHandleDrawer] = useAtom(handleDrawerAtom);
	const router = useRouter();

	return (
		<div>
			<li className={`py-1`}>
				<Link href={href}>
					<a
						onClick={() => setHandleDrawer(false)}
						className={` ${
							router.pathname == href
								? "bg-neutral text-primary"
								: href != "/" && router.pathname.includes(href)
								? "bg-neutral text-primary"
								: ""
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
