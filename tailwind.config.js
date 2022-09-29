module.exports = {
	daisyui: {
		themes: [
			{
				shahrin: {
					primary: "#DC944C",
					secondary: "#60A5FA",
					accent: "#11596F",
					neutral: "#13151B",
					"base-100": "#181A20",
					info: "#8CCAC1",
					success: "#9CB686",
					warning: "#FFD261",
					error: "#FC9783",
				},
				aimi: {
					primary: "#679186",
					secondary: "#264e70",
					accent: "#F6F9C8",
					neutral: "#fcfcfa",
					"base-100": "#edf5f3",
					info: "#8CCAC1",
					success: "#9CB686",
					warning: "#FFD261",
					error: "#FC9783",
				},
			},
			"pastel",
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
