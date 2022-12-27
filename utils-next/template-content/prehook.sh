# Install husky prettier commitlint
yarn add -D prettier eslint-plugin-prettier eslint-config-prettier husky lint-staged @commitlint/cli @commitlint/config-conventional 

# Create .prettierrc
echo '{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": false,
  "printWidth": 90,
  "tabWidth": 2,
  "endOfLine": "auto"
}' > .prettierrc

cp .gitignore .prettierignore

npx husky install

npx husky add .husky/pre-commit "npx lint-staged"

npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
