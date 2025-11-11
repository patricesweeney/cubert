/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				neutral: {
					bg: "var(--color-neutral-bg)",
					surface: "var(--color-neutral-surface)",
					text: "var(--color-neutral-text)",
					muted: "var(--color-neutral-muted)",
				},
				accent: {
					DEFAULT: "var(--color-accent)",
					strong: "var(--color-accent-strong)",
				},
				negative: "var(--color-negative)",
				warning: "var(--color-warning)",
			},
		},
	},
	plugins: [],
};

