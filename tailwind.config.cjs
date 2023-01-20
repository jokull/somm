const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				serif: ['PPEditorialNew', 'Times New Roman', 'Times', 'ui-serif', 'serif']
			}
		}
	},

	plugins: [require('@tailwindcss/forms')]
};

module.exports = config;
