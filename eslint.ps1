# Instalar Angular ESLint
ng add @angular-eslint/schematics

# Instalar Prettier y las configuraciones necesarias
npm i prettier eslint-config-prettier eslint-plugin-prettier --save-dev

# Reemplazar el contenido de eslint.config.js
$eslintConfig = @'
// @ts-check
const prettierPlugin = require("eslint-plugin-prettier");
const typescriptParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const angularPlugin = require("@angular-eslint/eslint-plugin");
const angularTemplateParser = require("@angular-eslint/template-parser");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
module.exports = [
  {
    ignores: [".cache/", ".git/", ".github/", "node_modules/"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: [
          "./tsconfig.json",
          "./tsconfig.app.json",
          "./tsconfig.spec.json",
        ],
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@angular-eslint": angularPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...angularPlugin.configs.recommended.rules,
      ...prettierPlugin.configs?.rules,
      "@angular-eslint/directive-selector": [
        "warn",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "warn",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "import/order": "off",
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/member-ordering": 0,
      "@typescript-eslint/naming-convention": 0,
      "@angular-eslint/no-host-metadata-property": "off",
      "@angular-eslint/no-output-on-prefix": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@angular-eslint/prefer-standalone": "off",
    },
  },
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      "@angular-eslint": angularPlugin,
      "@angular-eslint/template": angularPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error", { parser: "angular" }],
    },
  },
  eslintPluginPrettierRecommended,
];
'@
Set-Content -Path "eslint.config.js" -Value $eslintConfig

# Crear el archivo .prettierrc
$prettierrc = @'
{
    "arrowParens": "avoid",
    "bracketSpacing": true,
    "printWidth": 80,
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "all",
    "endOfLine": "auto",
    "overrides": [
      {
        "files": "*.html",
        "options": {
          "printWidth": 120
        }
      }
    ]
}
'@
Set-Content -Path ".prettierrc" -Value $prettierrc

# Crear el archivo .prettierignore
$prettierIgnore = @'
build
coverage
e2e
node_modules
'@
Set-Content -Path ".prettierignore" -Value $prettierIgnore

# Crear el archivo .vscode/settings.json
New-Item -ItemType Directory -Path ".vscode" -Force
$vscodeSettings = @'
{
    "angular-schematics.schematicsDefaultOptions": {
      "angular-*": {
        "style": "scss"
      }
    },
    "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
      },
      "editor.formatOnSave": true
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.codeActionsOnSave": {
        "source.organizeImports": "explicit",
        "source.fixAll.eslint": "explicit",
        "source.fixAll.tslint": "explicit",
        "source.fixAll.stylelint": "explicit"
      },
      "editor.formatOnSave": true
    },
    "editor.suggest.snippetsPreventQuickSuggestions": false,
    "editor.inlineSuggest.enabled": true
}
'@
Set-Content -Path ".vscode/settings.json" -Value $vscodeSettings

# Agregar el script "prettier" a package.json
# Ruta de package.json
$packageJsonPath = "package.json"

if (Test-Path $packageJsonPath) {
  # Leer el contenido de package.json
  $packageJson = Get-Content -Path $packageJsonPath -Raw | ConvertFrom-Json

  # Verificar si "scripts" existe, si no, crearlo como un objeto vacío
  if (-not $packageJson.PSObject.Properties['scripts']) {
    $packageJson | Add-Member -MemberType NoteProperty -Name 'scripts' -Value @{}
  }

  # Crear una copia del objeto scripts, agregar el script y reasignarlo
  $scripts = $packageJson.scripts | ConvertTo-Json -Depth 10 | ConvertFrom-Json
  $scripts | Add-Member -MemberType NoteProperty -Name 'prettier' -Value 'prettier --write "src/**/*.ts" "src/**/*.html" "src/**/*.scss"' -Force
  $packageJson.scripts = $scripts

  # Guardar los cambios en package.json
  $packageJson | ConvertTo-Json -Depth 10 | Set-Content -Path $packageJsonPath
}
else {
  Write-Host "package.json no encontrado. Asegúrate de ejecutar este script en la raíz del proyecto."
}
