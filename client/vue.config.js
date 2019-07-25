module.exports = {
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