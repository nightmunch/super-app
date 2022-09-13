import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

export const useGetUser = () => {
	const { data: sessionData } = useSession();

	const getUser = trpc.useQuery(
		[
			"user.byEmail",
			{
				email: sessionData?.user ? sessionData?.user?.email : "guest@guest.com",
			},
		],
		{ staleTime: Infinity }
	);

	const userId = getUser.data ? getUser.data.id : "cl5qwgu6k0015zwv8jt19n94s";
	return userId;
};
