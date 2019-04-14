module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
    },
    "parser": 'babel-eslint',
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "allowImportExportEverywhere": true,
    },
    "extends": "eslint:recommended",
    "rules": {
       "no-console": "warn",    // 打印
       "quotes": ["error", "double"], // 双引号
       "keyword-spacing": [ // 关键字缩进
       "error",{
        "before": true,
        "after": true
    }
    ],
        "no-var": "warn", // 没有var
        "no-unreachable": [ // 不允许在 return, throw, break添加代码
        "error"
        ],
        "spaced-comment": [ // 注释后预留空格
        "error",
        "always"
        ],
        "space-before-function-paren": [ // 括号与函数名加空格
        "error","never"
        ],
        "eqeqeq": [ // 使用 ===
        "error", "always" 
        ],
        "space-infix-ops": [ // 拼接字符串预留空格
        "error", {
            "int32Hint":false
        }
        ],
        "no-multiple-empty-lines": [ // 最大空行数
        "error",{
            "max": 2
        }
        ],
        "block-spacing": [ // 大括号两边预留空格
        "error",
        "always"
        ],
        "comma-spacing": [ // 逗号前后的空格
        2,{
            'before': false,
            'after': true
        }],
        "semi": ["error","never"], // 禁止使用分号
        "semi-spacing": [ // 分号前后空格
        "error",
        {
           "before": false,
           "after": true
       },
       ],
       "implicit-arrow-linebreak": ["error", "beside"],
       "arrow-spacing": "error"
   }
};