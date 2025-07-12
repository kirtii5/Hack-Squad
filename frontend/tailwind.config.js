const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...fontFamily.sans],
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
