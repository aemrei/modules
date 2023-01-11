echo 'Installing: utils-nestjs'
yarn add -D husky lint-staged @commitlint/cli @commitlint/config-conventional

cp .gitignore .prettierignore

npx husky install

npx husky add .husky/pre-commit "npx lint-staged"

npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
