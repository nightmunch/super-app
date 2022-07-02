module.exports = {
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#DC944C",
					secondary: "#263F40",
					accent: "#11596F",
					neutral: "#13151B",
					"base-100": "#181A20",
					info: "#8CCAC1",
					success: "#9CB686",
					warning: "#FFD261",
					error: "#FC9783",
				},
			},
		],
	},
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
