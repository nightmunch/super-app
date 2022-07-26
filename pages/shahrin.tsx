import Image from "next/image";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
export default function Shahrin() {
	return (
		<>
			<div className="card bg-neutral shadow-xl text-neutral-content">
				<div className="card-body">
					<div className="flex flex-col xl:w-1/2 md:m-auto sm:flex-row sm:gap-10">
						<div className="flex">
							<div className="my-auto">
								<h1 className="text-lg">Hello!</h1>
								<h2 className="text-3xl font-semibold text-primary">
									I&apos;m Shahrin
								</h2>
								<h2 className="text-lg">
									Web Developer & Deep Learning Enthusiast
								</h2>
							</div>
						</div>
						<div className="flex-none pt-6 sm:w-64 sm:pt-0">
							<Image
								src="/me.jpg"
								alt="Picture of Shahrin"
								width={1000}
								height={1000}
								className="rounded-full"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="card bg-neutral shadow-xl text-neutral-content">
				<div className="card-body">
					<h1 className="text-xl font-semibold text-center text-primary">
						My socials
					</h1>
					<div className="flex flex-row m-auto gap-3 mt-3">
						<a href="https://www.instagram.com/nightmunch/?theme=dark">
							<FaInstagram className="hover:text-primary text-3xl" />
						</a>
						<a href="https://www.linkedin.com/in/shahrinamin-2703/">
							<FaLinkedin className="hover:text-primary text-3xl" />
						</a>
						<a href="https://github.com/nightmunch">
							<FaGithub className="hover:text-primary text-3xl" />
						</a>
						<a href="mailto:shahrinamin.my@gmail.com">
							<FaEnvelope className="hover:text-primary text-3xl" />
						</a>
					</div>
				</div>
			</div>
			<div className="card bg-neutral shadow-xl text-neutral-content">
				<div className="card-body">
					<h1 className="text-xl font-semibold text-center text-primary">
						About Me
					</h1>
					<p className="mt-3">
						Have been passionate on developing and collabrate with talented
						people to create awesome project. Well rounded developer, fast-paced
						learner, and always been holding on to this one quote{" "}
						<span className="text-primary font-semibold md:block md:text-center md:mt-2">
							&quot;Jack of all trades, master of some&quot;.
						</span>
					</p>
				</div>
			</div>
			<div className="card bg-neutral shadow-xl text-neutral-content">
				<div className="card-body">
					<h1 className="text-xl font-semibold text-center text-primary">
						Skills
					</h1>
					<div className="flex flex-col md:flex-row gap-3 mt-3">
						<div className="card bg-base-100">
							<div className="card-body">
								<h1 className="text-lg font-semibold text-center text-blue-400">
									Web Development
								</h1>
								<p>
									I love to explore different framework, method and use cases to
									bring great and optimal functionality to the table.
								</p>
								<h2 className="text-md font-semibold text-center text-blue-400 mt-3">
									Language/Framework
								</h2>
								<p className="text-center">
									HTML, CSS, Javascript, PHP, Laravel, React, Typescript
								</p>
							</div>
						</div>
						<div className="card bg-base-100">
							<div className="card-body">
								<h1 className="text-lg font-semibold text-center text-blue-400">
									Data Science & Artificial Intelligence
								</h1>
								<p>
									I have teach and train multiple student (read: Machine
									Learning model) to differentiate between apple and orange.
								</p>
								<h2 className="text-md font-semibold text-center text-blue-400 mt-3">
									Language/Framework
								</h2>
								<p className="text-center">
									Python, Pandas, Numpy, Sklearn, TensorFlow
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
