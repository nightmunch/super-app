// Month - Number to Name
export const months: { num: number; name: string }[] = [
	{ num: 1, name: "January" },
	{ num: 2, name: "February" },
	{ num: 3, name: "March" },
	{ num: 4, name: "April" },
	{ num: 5, name: "May" },
	{ num: 6, name: "June" },
	{ num: 7, name: "July" },
	{ num: 8, name: "August" },
	{ num: 9, name: "September" },
	{ num: 10, name: "October" },
	{ num: 11, name: "November" },
	{ num: 12, name: "December" },
];

// Categories with Color
export const categories = [
	{ category: "Food & Beverages", color: "#618df4" },
	{ category: "Transportation", color: "#f46161" },
	{ category: "Shopping", color: "#e9c46a" },
	{ category: "Dating", color: "#de6dcf" },
	{ category: "Bills", color: "#b961f4" },
	{ category: "Healthcare", color: "#2a9d8f" },
	{ category: "Groceries", color: "#8ec94f" },
	{ category: "Others", color: "#f4a261" },
];

// Number Comma Separator
export const separator = (numb: any) => {
	var str = numb.toString().split(".");
	str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return str.join(".");
};

// Format Date
const padTo2Digits = (num: number) => {
	return num.toString().padStart(2, "0");
};

export const formatDate = (date: Date) => {
	return [
		padTo2Digits(date.getDate()),
		padTo2Digits(date.getMonth() + 1),
		date.getFullYear(),
	].join("/");
};

// Get Text Color Based on Contrast

function getRGB(c: string): number {
	return parseInt(c, 16);
}

function getsRGB(c: string) {
	return getRGB(c) / 255 <= 0.03928
		? getRGB(c) / 255 / 12.92
		: Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
}

function getLuminance(hexColor: string) {
	return (
		0.2126 * getsRGB(hexColor.substr(1, 2)) +
		0.7152 * getsRGB(hexColor.substr(3, 2)) +
		0.0722 * getsRGB(hexColor.substr(-2))
	);
}

function getContrast(f: string, b: string) {
	const L1 = getLuminance(f);
	const L2 = getLuminance(b);
	return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

export function getTextColor(
	bgColor: string,
	blackColor: string,
	whiteColor: string
) {
	const whiteContrast = getContrast(bgColor, blackColor);
	const blackContrast = getContrast(bgColor, whiteColor);

	return whiteContrast > blackContrast ? blackColor : whiteColor;
}

export function shadeColor(color: any, percent: any) {
	var R = parseInt(color.substring(1, 3), 16);
	var G = parseInt(color.substring(3, 5), 16);
	var B = parseInt(color.substring(5, 7), 16);

	R = (R * (100 + percent)) / 100;
	G = (G * (100 + percent)) / 100;
	B = (B * (100 + percent)) / 100;

	R = R < 255 ? R : 255;
	G = G < 255 ? G : 255;
	B = B < 255 ? B : 255;

	var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
	var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
	var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

	return "#" + RR + GG + BB;
}
