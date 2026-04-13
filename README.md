# Scientific Calculator

A browser-based scientific calculator built with **React 18** and **Vite 5**. It supports basic arithmetic, trigonometric functions, logarithms, exponentiation, and mathematical constants — all without a backend or any external math library.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Project Structure](#project-structure)
- [Calculator Reference](#calculator-reference)
  - [Arithmetic Operators](#arithmetic-operators)
  - [Scientific Functions](#scientific-functions)
  - [Constants](#constants)
  - [Utility Buttons](#utility-buttons)
- [Contributing](#contributing)
- [License](#license)

---

## Features

| Category | Operations |
|---|---|
| Arithmetic | Addition, subtraction, multiplication, division |
| Trigonometry | sin, cos, tan (input in degrees) |
| Logarithms | Natural log (ln), base-10 log (log) |
| Powers | Square (x²), arbitrary power (xʸ), square root (√) |
| Reciprocal | 1/x |
| Constants | π, e |
| Utilities | ±, %, CE (clear entry), C (clear all) |
| Display | Two-line display — expression history + current value |

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 18.3 | UI & state management |
| [Vite](https://vite.dev) | 5.4 | Dev server & bundler |
| [ESLint](https://eslint.org) | 9 | Static code analysis |
| CSS Modules (plain CSS) | — | Component-scoped styles |

No external math or UI component libraries are used.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** ≥ 9  *(comes bundled with Node.js)*

Verify your versions:

```bash
node --version
npm --version
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/scientific-calculator.git
cd scientific-calculator

# 2. Install dependencies
npm install
```

### Development

Start the Vite dev server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The app is available at `http://localhost:5173` by default.

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build optimised production bundle to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across all source files |

### Production Build

```bash
npm run build
```

Output is placed in `dist/`. The folder is self-contained and can be served by any static file host (Netlify, Vercel, GitHub Pages, nginx, etc.).

```bash
# Preview the production build locally before deploying
npm run preview
```

---

## Project Structure

```
scientific-calculator/
├── public/                 # Static assets served as-is
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Calculator.jsx  # Calculator UI & logic (state machine)
│   │   └── Calculator.css  # Calculator-scoped styles
│   ├── App.jsx             # Root layout — hero, content sections, footer
│   ├── App.css             # Global layout & typography styles
│   └── main.jsx            # React DOM entry point
├── index.html              # HTML shell (Vite entry point)
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint flat-config
├── package.json
├── package-lock.json
└── .gitignore
```

---

## Calculator Reference

### Arithmetic Operators

| Button | Operation | Example |
|---|---|---|
| `+` | Addition | 3 + 4 = 7 |
| `−` | Subtraction | 10 − 6 = 4 |
| `×` | Multiplication | 5 × 3 = 15 |
| `÷` | Division | 8 ÷ 2 = 4 |

### Scientific Functions

All unary functions apply immediately to the current display value.

| Button | Operation | Example |
|---|---|---|
| `sin` | Sine (degrees) | sin(30) = 0.5 |
| `cos` | Cosine (degrees) | cos(60) = 0.5 |
| `tan` | Tangent (degrees) | tan(45) = 1 |
| `ln` | Natural logarithm | ln(e) = 1 |
| `log` | Base-10 logarithm | log(1000) = 3 |
| `√` | Square root | √(144) = 12 |
| `x²` | Square | 5² = 25 |
| `xʸ` | Power (binary) | 2 xʸ 8 = 256 |
| `1/x` | Reciprocal | 1/4 = 0.25 |

### Constants

| Button | Value |
|---|---|
| `π` | 3.141592653589793 |
| `e` | 2.718281828459045 |

### Utility Buttons

| Button | Action |
|---|---|
| `C` | Clear everything — resets display, history, and pending operator |
| `CE` | Clear current entry only — keeps the pending operator intact |
| `±` | Toggle sign of the current value |
| `%` | Divide current value by 100 |

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes and ensure the linter passes:
   ```bash
   npm run lint
   ```
3. Commit using a conventional commit message:
   ```
   feat: add keyboard input support
   fix: correct cosine result for 90 degrees
   ```
4. Open a pull request against `main` with a clear description of the change and why it was made.

Please keep pull requests focused — one feature or fix per PR.

---

## License

Distributed under the [MIT License](LICENSE).  
You are free to use, modify, and distribute this software for any purpose.
