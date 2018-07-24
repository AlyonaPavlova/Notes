module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2015
    },
    "rules": {
        "no-else-return": "error",
        "no-multi-spaces": "error",
        "no-whitespace-before-property": "error",
        "camelcase": "error",
        "new-cap": "error",
        "no-console": "off",
        "comma-dangle": "error",
        "no-var": "error",
        "indent": ["error", 4, {"SwitchCase": 1}],
        "padded-blocks": ["error", "never"],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};