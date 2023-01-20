module.exports = {
	projects: {
		app: {
			schema: ['./schema.graphql'],
			documents: ['src/**/*.gql']
		}
	},
	extensions: {
		languageService: {
			cacheSchemaFileForLookup: true,
			enableValidation: true
		}
	}
};
