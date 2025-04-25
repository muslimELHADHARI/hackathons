// Système de design fluide et organique
export const fluidDesign = {
  // Couleurs principales avec des tons irisés et changeants
  colors: {
    primary: {
      base: "hsl(var(--fluid-primary))",
      hover: "hsl(var(--fluid-primary-hover))",
      foreground: "hsl(var(--fluid-primary-foreground))",
    },
    secondary: {
      base: "hsl(var(--fluid-secondary))",
      hover: "hsl(var(--fluid-secondary-hover))",
      foreground: "hsl(var(--fluid-secondary-foreground))",
    },
    accent: {
      base: "hsl(var(--fluid-accent))",
      hover: "hsl(var(--fluid-accent-hover))",
      foreground: "hsl(var(--fluid-accent-foreground))",
    },
    background: {
      base: "hsl(var(--fluid-background))",
      hover: "hsl(var(--fluid-background-hover))",
      foreground: "hsl(var(--fluid-background-foreground))",
    },
  },

  // Rayons de bordure organiques
  radius: {
    sm: "var(--fluid-radius-sm)",
    md: "var(--fluid-radius-md)",
    lg: "var(--fluid-radius-lg)",
    xl: "var(--fluid-radius-xl)",
    full: "var(--fluid-radius-full)",
  },

  // Animations fluides
  animation: {
    slow: "var(--fluid-animation-slow)",
    medium: "var(--fluid-animation-medium)",
    fast: "var(--fluid-animation-fast)",
    bounce: "var(--fluid-animation-bounce)",
    elastic: "var(--fluid-animation-elastic)",
    wave: "var(--fluid-animation-wave)",
  },

  // Ombres dynamiques
  shadows: {
    subtle: "var(--fluid-shadow-subtle)",
    medium: "var(--fluid-shadow-medium)",
    strong: "var(--fluid-shadow-strong)",
    glow: "var(--fluid-shadow-glow)",
    inner: "var(--fluid-shadow-inner)",
  },

  // Typographie fluide
  typography: {
    fontFamily: {
      display: "var(--fluid-font-display)",
      body: "var(--fluid-font-body)",
      accent: "var(--fluid-font-accent)",
    },
    fontWeight: {
      light: "var(--fluid-font-light)",
      regular: "var(--fluid-font-regular)",
      medium: "var(--fluid-font-medium)",
      bold: "var(--fluid-font-bold)",
    },
    fontSize: {
      xs: "var(--fluid-font-size-xs)",
      sm: "var(--fluid-font-size-sm)",
      md: "var(--fluid-font-size-md)",
      lg: "var(--fluid-font-size-lg)",
      xl: "var(--fluid-font-size-xl)",
      "2xl": "var(--fluid-font-size-2xl)",
      "3xl": "var(--fluid-font-size-3xl)",
    },
  },

  // Espacement dynamique
  spacing: {
    xs: "var(--fluid-spacing-xs)",
    sm: "var(--fluid-spacing-sm)",
    md: "var(--fluid-spacing-md)",
    lg: "var(--fluid-spacing-lg)",
    xl: "var(--fluid-spacing-xl)",
    "2xl": "var(--fluid-spacing-2xl)",
    "3xl": "var(--fluid-spacing-3xl)",
  },

  // Effets spéciaux
  effects: {
    blur: "var(--fluid-blur)",
    glassmorphism: "var(--fluid-glassmorphism)",
    noise: "var(--fluid-noise)",
    grain: "var(--fluid-grain)",
  },

  // Formes organiques
  shapes: {
    blob: "var(--fluid-shape-blob)",
    wave: "var(--fluid-shape-wave)",
    curve: "var(--fluid-shape-curve)",
    zigzag: "var(--fluid-shape-zigzag)",
  },
}
