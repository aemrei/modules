echo 'Installing: base-nestjs'

# Init the nestjs project in the current directory
nest new -p yarn --strict .

yarn add @nestjs/jwt @nestjs/config argon2 class-validator class-transformer @nestjs/passport passport passport-jwt
yarn add -D @types/passport-jwt
