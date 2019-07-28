module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/recommended",
        "eslint:recommended",
        "prettier/vue",
        "plugin:prettier/recommended"
    ],
    rules: {
        "vue/component-name-in-template-casing": ["error", "PascalCase"],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "prettier/prettier": [
            "error",
            {
                "tabWidth": 2,
                "singleQuote": true,
                "semi": false
            }
        ],
        "semi": [2, "never"],
        "quotes": [2, "single", "avoid-escape"]
    },
    parserOptions: {
        parser: "babel-eslint"
    }
}
