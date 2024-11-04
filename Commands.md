When cloning the project or when pulling new changes on package.json
npm install

When initalizing or pushing to neon db
npx prisma migrate deploy

When changing prisma schema
npx prisma migrate dev
npx prisma migrate deploy

How to commit
git add .
git commit -m "Message"
git push origin master
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init
