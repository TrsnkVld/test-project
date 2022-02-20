const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,

	// глобальные css переменные
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import "@/assets/scss/_variables.scss";`
			}
		}
	},
})
