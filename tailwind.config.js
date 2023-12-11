/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			roman: ['Luxurious Roman', 'serif'],
			sharp: ['MedievalSharp', 'cursive']
		},
		extend: {
			colors: {
				text: '#E9E3E6',
				accent: '#136bc5',
				background: '#4F6272'
			}
		}
	},
	plugins: []
};
