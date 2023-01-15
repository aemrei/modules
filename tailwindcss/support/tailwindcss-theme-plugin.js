// @ts-check
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

// -----------------------------------------------------------------
// Themes definition
// -----------------------------------------------------------------

/**
 * @type {Array<{
 *   name: string;
 *   extraSelectors?: string[];
 *   textColor: {
 *     base: string;
 *     muted: string;
 *     inverted: string;
 *   },
 *   backgroundColor: {
 *     fill: string;
 *   },
 *   colors: {
 *     "50": string;
 *     "100": string;
 *     "200": string;
 *     "300": string;
 *     "400": string;
 *     "500": string;
 *     "600": string;
 *     "700": string;
 *     "800": string;
 *     "900": string;
 *   },
 * }>}
 */
const themes = [
  {
    name: "default",
    extraSelectors: [":root"],
    textColor: {
      base: colors.slate["800"],
      muted: colors.slate["600"],
      inverted: colors.slate["100"],
    },
    backgroundColor: {
      fill: colors.slate["100"],
    },
    colors: colors.slate,
  },
  {
    name: "forest",
    textColor: {
      base: colors.green["800"],
      muted: colors.green["600"],
      inverted: colors.green["100"],
    },
    backgroundColor: {
      fill: colors.green["100"],
    },
    colors: colors.green,
  },
  {
    name: "ocean",
    textColor: {
      base: colors.blue["800"],
      muted: colors.blue["600"],
      inverted: colors.blue["100"],
    },
    backgroundColor: {
      fill: colors.blue["100"],
    },
    colors: colors.blue,
  },
  {
    name: "dark",
    textColor: {
      base: colors.gray["100"],
      muted: colors.gray["200"],
      inverted: colors.gray["900"],
    },
    backgroundColor: {
      fill: colors.gray["900"],
    },
    colors: {
      50: colors.gray["900"],
      100: colors.gray["800"],
      200: colors.gray["700"],
      300: colors.gray["600"],
      400: colors.gray["500"],
      500: colors.gray["400"],
      600: colors.gray["300"],
      700: colors.gray["200"],
      800: colors.gray["100"],
      900: colors.gray["50"],
    },
  },
];

// -----------------------------------------------------------------
// Tailwind CSS plugin
// -----------------------------------------------------------------

module.exports = plugin(
  function ({ addBase, addVariant }) {
    // -----------------------------------------------------------------
    // Root scope CSS variables
    // -----------------------------------------------------------------

    const styles = themes.flatMap((theme) => {
      const themeSelectors = [`[data-theme=${theme.name}]`].concat(
        theme.extraSelectors || []
      );
      const textColors = theme.textColor;
      const backgroundColors = theme.backgroundColor;
      const themeColors = theme.colors;

      return themeSelectors.map((selector) => {
        return {
          [selector]: {
            "--color-text-base": textColors.base,
            "--color-text-muted": textColors.muted,
            "--color-text-inverted": textColors.inverted,
            "--color-bg-fill": backgroundColors.fill,
            "--color-theme-50": themeColors["50"],
            "--color-theme-100": themeColors["100"],
            "--color-theme-200": themeColors["200"],
            "--color-theme-300": themeColors["300"],
            "--color-theme-400": themeColors["400"],
            "--color-theme-500": themeColors["500"],
            "--color-theme-600": themeColors["600"],
            "--color-theme-700": themeColors["700"],
            "--color-theme-800": themeColors["800"],
            "--color-theme-900": themeColors["900"],
          },
        };
      });
    });

    addBase(styles.reduce((acc, cur) => ({ ...acc, ...cur }), {}));

    themes.forEach((theme) => {
      addVariant(`theme-${theme.name}`, `[data-theme=${theme.name}] &`);
    });
  },
  {
    theme: {
      extend: {
        textColor: {
          theme: {
            base: "var(--color-text-base)",
            muted: "var(--color-text-muted)",
            inverted: "var(--color-text-inverted)",
          },
        },
        backgroundColor: {
          theme: {
            fill: "var(--color-bg-fill)",
          },
        },
        colors: {
          theme: {
            50: "var(--color-theme-50)",
            100: "var(--color-theme-100)",
            200: "var(--color-theme-200)",
            300: "var(--color-theme-300)",
            400: "var(--color-theme-400)",
            500: "var(--color-theme-500)",
            600: "var(--color-theme-600)",
            700: "var(--color-theme-700)",
            800: "var(--color-theme-800)",
            900: "var(--color-theme-900)",
          },
        },
      },
    },
  }
);
