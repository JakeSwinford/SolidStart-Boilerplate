# SolidStart Boilerplate

## 🚀 Tech Stack

Our project is built on a robust and modern technology stack, carefully chosen to provide the best developer experience and user performance.

### 🏗️ Core Framework
<a href="https://start.solidjs.com/" target="_blank">
  <img src="https://img.shields.io/badge/SolidStart-2C4F7C?style=for-the-badge&logo=solid&logoColor=white" alt="SolidStart" />
</a>

Leveraging the power of SolidJS, SolidStart offers an intuitive and efficient way to build reactive web applications. Its fine-grained reactivity model ensures optimized rendering and a smooth user experience.

### 🔐 Authentication
<a href="https://lucia-auth.com/" target="_blank">
  <img src="https://img.shields.io/badge/Lucia--Auth-4A4A4A?style=for-the-badge&logo=lock&logoColor=white" alt="Lucia-Auth" />
</a>

Lucia-Auth provides a secure, flexible, and easy-to-use authentication solution. It supports various authentication methods and offers robust session management, ensuring your users' data stays protected.

### 🗄️ Database
<a href="https://www.postgresql.org/" target="_blank">
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</a>

PostgreSQL, a powerful open-source relational database, is our choice for data persistence. Known for its reliability.

### 🎨 UI Components
<a href="https://shadcn-solid.com/" target="_blank">
  <img src="https://img.shields.io/badge/Shadcn--Solid-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="Shadcn-Solid" />
</a>

Shadcn-Solid offers a collection of beautifully crafted, accessible UI components. 



### 🎨 Styling
<a href="https://tailwindcss.com/" target="_blank">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</a>

Tailwind CSS is our go-to utility-first CSS framework.

---

This powerful combination of technologies ensures our application is:

- 🚀 **Fast**: SolidStart's reactivity and Tailwind's utility classes keep things snappy.
- 🔒 **Secure**: Backed by Lucia-Auth.
- 🎨 **Beautiful**: Shadcn-Solid and Tailwind CSS create a visually stunning UI.
- 🛠️ **Maintainable**: Each tool is chosen for its simplicity and excellent documentation and great community.

We're always on the lookout for ways to enhance our stack, so stay tuned for updates! 🌟
---

## Developing
PostgreSQL Docker Instance
```bash
docker run --name solidstart-boilerplate -e POSTGRES_USER=example -e POSTGRES_PASSWORD=password -e POSTGRES_DB=boilerplate -p 5432:5432 -d postgres
```
Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _presets_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different preset, add it to the `devDependencies` in `package.json` and specify in your `app.config.js`.

## This project was created with the [Solid CLI](https://solid-cli.netlify.app)
