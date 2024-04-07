# Kanban

This is the Kanban project folder.

## Tech Stack 🥞

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Code Rules and Structure 📖

You can look through the codebase to see how code is structured and written. ESlint also enforces some rules.

## Pre-commits 🏁

On every commit the following scripts are run

- yarn check-format (Check Prettier standards)
- yarn check-lint (Check ESLint standards)
- yarn check-types (Check tsconfig standards)

## Setting up Project 👨🏾‍💻

```
git clone https://github.com/oyerindedaniel/kanban.git
# or with the Github CLI
gh repo clone oyerindedaniel/kanban

cd kanban
yarn

npx prisma migrate dev (migrate db schema)
yarn dev

```

## Environmental Variables 🌳

Look at the `.env.example` file to see the environmental variables, contact an admin for their values and copy it to a `.env` file.

## Frontend Figma Designs

[Figma Design](https://www.figma.com/file/ifFZUhI1Yn0LjwGPNkdwJS/kanban-task-management-web-app?type=design&node-id=0-1&mode=design&t=8ocX1vlERfYAGEuc-0)
