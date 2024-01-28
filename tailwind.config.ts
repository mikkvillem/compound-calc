import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      aspectRatio: {
        iphone: '9 / 19.5',
      },
      colors: {
        'pallette-black': '#031B10',
        'pallette-green': '#B2DAC5',
        'pallette-green-light': '#FAFFFA',
        'pallette-green-dark': '#11864E',
      },
    },
  },
  plugins: [],
};
export default config;
