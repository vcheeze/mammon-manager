const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    chainWebpack: config => {
        config.plugin('vuetify-loader')
            .use(new VuetifyLoaderPlugin())
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/styles/_variables.scss";
                    @import "@/styles/_fonts.scss";
                    @import "@/styles/theme.scss";
                `
            }
        }
    }
}