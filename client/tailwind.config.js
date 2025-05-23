import daisyui from "daisyui"
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust paths to your project
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "forest",
      "garden",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "wireframe",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
    ],
  },
};
