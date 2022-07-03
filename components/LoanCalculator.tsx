import { useEffect, useState } from "react";

export const LoanCalculator: React.FunctionComponent = () => {
	const [loanAmount, setLoanAmount] = useState("");
	const [interest, setInterest] = useState("");
	const [years, setYears] = useState("");
	const [months, setMonths] = useState("");
	const [repayment, setRepayment] = useState<number>(0);
	const [totalPayment, setTotalPayment] = useState<number>(0);
	const [totalInterest, setTotalInterest] = useState<number>(0);

	const handleCalculation = (a: any, y: any, m: any, i: any) => {
		a = Number(a);
		let n: number = Number(y) * 12 + Number(m);
		i = Number(i) / 100 / 12;
		let monthlyPayment: number = (i * a) / (1 - (1 + i) ** -n);
		let totalPayment = monthlyPayment * n;
		let totalInterest = totalPayment - a;
		setRepayment(Number(monthlyPayment.toFixed(2)));
		setTotalPayment(Number(totalPayment.toFixed(2)));
		setTotalInterest(Number(totalInterest.toFixed(2)));
	};

	const separator = (numb: number) => {
		var str = numb.toString().split(".");
		str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return str.join(".");
	};

	useEffect(() => {
		if (loanAmount != "" && interest != "" && (years != "" || months != "")) {
			handleCalculation(loanAmount, years, months, interest);
		} else {
			setRepayment(0);
		}
	}, [loanAmount, interest, years, months]);

	return (
		<>
			<h1 className="text-lg font-semibold text-primary">Loan Calculator</h1>
			<div className="flex flex-col gap-4 pt-3">
				<div className="form-control">
					<label className="label">
						<span className="label-text">Loan Amount (RM)</span>
					</label>
					<input
						type="text"
						placeholder="Loan Amount (RM)"
						value={loanAmount}
						onChange={(e) => {
							const re = /^[\d]*$/;
							if (re.test(e.target.value)) {
								setLoanAmount(e.target.value);
							}
						}}
						className="input input-bordered w-full "
					/>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Interest Rate % per year</span>
					</label>
					<input
						type="text"
						placeholder="Interest Rate % per year"
						value={interest}
						onChange={(e) => {
							const re = /^[\d]{0,3}\.?[\d]{0,2}$/;
							if (re.test(e.target.value)) {
								setInterest(e.target.value);
							}
						}}
						className="input input-bordered w-full "
					/>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Loan Term</span>
					</label>
					<div className="flex gap-2 flex-col">
						<label className="input-group">
							<input
								type="text"
								placeholder="Loan Term Years"
								value={years}
								onChange={(e) => {
									const re = /^[\d]*$/;
									if (re.test(e.target.value)) {
										setYears(e.target.value);
									}
								}}
								className="input input-bordered w-full "
							/>
							<span className="bg-base-100">Years</span>
						</label>
						<label className="input-group">
							<input
								type="text"
								placeholder="Loan Term Months"
								value={months}
								onChange={(e) => {
									const re = /^[\d]*$/;
									if (re.test(e.target.value)) {
										setMonths(e.target.value);
									}
								}}
								className="input input-bordered w-full "
							/>
							<span className="bg-base-100">Months</span>
						</label>
					</div>
				</div>
				{repayment !== 0 ? (
					<div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
						<div className="stats shadow">
							<div className="stat">
								<div className="stat-title">Monthly Payment</div>
								<div className="stat-value text-xl text-primary">
									RM{separator(repayment)}
								</div>
							</div>
						</div>
						<div className="stats shadow">
							<div className="stat">
								<div className="stat-title">Total Payment</div>
								<div className="stat-value text-xl text-primary">
									RM{separator(totalPayment)}
								</div>
							</div>
						</div>
						<div className="stats shadow">
							<div className="stat">
								<div className="stat-title">Total Interest</div>
								<div className="stat-value text-xl text-primary">
									RM{separator(totalInterest)}
								</div>
							</div>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
};
