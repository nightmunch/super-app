import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

export default function LoginPage() {
	const { handleSubmit, register } = useForm<CreateUserInput>();
	const router = useRouter();
	// const { mutate, error } = trpc.useMutation(["users.register-user"], {
	// 	onError: (error) => {},
	// 	onSuccess: () => {
	// 		router.push("/login");
	// 	},
	// });

	const onSubmit = (values: CreateUserInput) => {
		// mutate(values);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* {error && error.message} */}
				<h1>Login</h1>
				<input
					type="email"
					placeholder="jane.doe@example.com"
					{...register("email")}
				/>
				<button type="submit">Register</button>
			</form>
			<Link href="/register">Register</Link>
		</>
	);
}
