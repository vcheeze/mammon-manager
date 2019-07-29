module.exports = {
  root: true,
  env: {
    node: true,
    mongo: true
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "quotes": [2, "single", "avoid-escape"],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "prettier/prettier": [
      "error",
      {
        "tabWidth": 2,
        "singleQuote": true
      }
    ]
  }
};
