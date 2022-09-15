module.exports = {
	daisyui: {
		themes: [
			{
				shahrin: {
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
				aimi: {
					primary: "#529B03",
					secondary: "#E9E92F",
					accent: "#F6F9C8",
					neutral: "#191A3E",
					"base-100": "#FFFFFF",
					info: "#CAE2E8",
					success: "#DFF2A1",
					warning: "#F7E488",
					error: "#F2B6B5",
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
