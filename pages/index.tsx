import { useEffect, useState } from "react";
import { TodoList } from "../components/TodoList";

export default function Home() {
	return (
		<>
			<div className="hero bg-base-200 py-5">
				<div className="hero-content  sm:text-center">
					<div className="max-w-md">
						<h2 className="text-4xl sm:text-5xl font-semibold text-primary">
							Super<span className="text-base-content">App</span>
						</h2>
						<p className="py-6">
							Welcome to one for all web application. Consist of personal
							finance, storage management and many more to come!
						</p>
						<LoopingBar />
					</div>
				</div>
			</div>
			<div className="card border">
				<div className="card-body">
					<Clock />
				</div>
			</div>
			{/* <div className="card bg-neutral shadow-xl text-neutral-content w-full sm:w-[600px] sm:mx-auto">
				<div className="card-body">
					<TodoList />
				</div>
			</div> */}
		</>
	);
}

function LoopingBar() {
	let timer: any;
	const [counterState, setCounter] = useState(0);
	useEffect(() => {
		clearInterval(timer);
		timer = setInterval(() => {
			if (counterState >= 100.0) {
				clearInterval(timer);
				setCounter(0);
				return;
			}
			setCounter((prev) => prev + 0.1);
		}, 5);

		return () => clearInterval(timer);
	}, [counterState]);
	return (
		<>
			<span className="text-xs text-gray-600">
				Why there is a loading bar here.?
			</span>
			<progress
				className="progress progress-primary w-full"
				value={counterState}
				max="100"
			></progress>
		</>
	);
}

function Clock() {
	const [date, setDate] = useState(new Date());

	function refreshClock() {
		setDate(new Date());
	}
	useEffect(() => {
		const timerId = setInterval(refreshClock, 1000);
		return function cleanup() {
			clearInterval(timerId);
		};
	}, []);
	return (
		<>
			<div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center">
				<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
					<span className="countdown font-mono text-5xl">
						<span
							style={
								{ "--value": date.getHours() % 12 || 12 } as React.CSSProperties
							}
						></span>
					</span>
					hours
				</div>
				<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
					<span className="countdown font-mono text-5xl">
						<span
							style={{ "--value": date.getMinutes() } as React.CSSProperties}
						></span>
					</span>
					minutes
				</div>
				<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
					<span className="countdown font-mono text-5xl">
						<span
							style={
								{
									"--value": date.getSeconds(),
								} as React.CSSProperties
							}
						></span>
					</span>
					seconds
				</div>
			</div>
			<span className="text-xs text-gray-600 text-center">A clock. Yup.</span>
		</>
	);
}
