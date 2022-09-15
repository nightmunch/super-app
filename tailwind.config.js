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
					primary: "#6fa176",
					secondary: "#fcc0f1",
					accent: "#F6F9C8",
					neutral: "#F7DAD9",
					"base-100": "#fffaff",
					"base-200": "#fffaff",
					"base-200": "#fcf2fc",
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
