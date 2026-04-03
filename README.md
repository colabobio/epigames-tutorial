# Epigames tutorial page

## Setting up

Install dependencies after cloning the repo:

```
npm install
```

## Building

Compile the React code into standard, browser-ready HTML, CSS, and JavaScript:

```
npm run build
```

This will create a new folder called dist in the project directory. The contents of this dist folder are the final, deployable website.

The tutorial can be tested locally by running:

```
npm run dev
```

# Move the files to the Epidemica website repo

Now, you need to transfer those built files into your existing epidemica-website repository.

- Clone or open your existing epidemica-website repository on your computer.

- Navigate to the epigames folder inside it.

- Create a new folder inside epigames named tutorial (if it doesn't already exist).

- Copy everything from inside the dist folder (from building step) and paste it into the epidemica-website/epigames/tutorial folder. (Note: Make sure you copy the contents inside dist, including the index.html and assets folder, not the dist folder itself).

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
