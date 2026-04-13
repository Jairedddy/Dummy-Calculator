import Calculator from './components/Calculator'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <h1>Scientific Calculator</h1>
          <p className="hero-subtitle">
            A powerful, browser-based scientific calculator built with React.
            Perform basic arithmetic, trigonometry, logarithms, and more — all in one place.
          </p>
        </div>
      </header>

      <main>
        <section className="calculator-section">
          <Calculator />
        </section>

        <section className="info-section">
          <h2>About This Calculator</h2>
          <p>
            This scientific calculator is designed to help students, engineers, and everyday
            users perform a wide range of mathematical computations without needing to install
            any software. Everything runs directly in your browser using modern web technologies.
          </p>
          <p>
            Whether you're solving quadratic equations, computing trigonometric ratios for your
            physics homework, or just splitting a dinner bill, this calculator has you covered.
            It supports both basic and advanced mathematical operations, with a clean and
            intuitive interface.
          </p>
        </section>

        <section className="features-section">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Basic Arithmetic</h3>
              <p>
                Perform addition, subtraction, multiplication, and division with ease.
                The calculator handles large numbers and decimal values accurately,
                making it suitable for both simple and complex calculations.
              </p>
            </div>
            <div className="feature-card">
              <h3>Trigonometric Functions</h3>
              <p>
                Calculate sine, cosine, and tangent values. Useful for geometry,
                physics, and engineering problems. Results are computed in degrees
                for everyday usability.
              </p>
            </div>
            <div className="feature-card">
              <h3>Logarithms &amp; Exponents</h3>
              <p>
                Evaluate natural logarithms (ln), base-10 logarithms (log), and
                raise numbers to arbitrary powers using the x^y function. Essential
                for scientific and engineering calculations.
              </p>
            </div>
            <div className="feature-card">
              <h3>Square Root &amp; Squares</h3>
              <p>
                Instantly compute the square root of any non-negative number, or
                square a value with a single button press. These operations are
                fundamental in algebra, geometry, and statistics.
              </p>
            </div>
            <div className="feature-card">
              <h3>Constants</h3>
              <p>
                Access the mathematical constant π (pi ≈ 3.14159) and Euler's
                number e (≈ 2.71828) at the tap of a button. These constants appear
                in countless formulas across mathematics and physics.
              </p>
            </div>
            <div className="feature-card">
              <h3>Expression History</h3>
              <p>
                The calculator displays your previous expression alongside the
                current result, so you always know what you computed. Supports
                chained calculations without losing context.
              </p>
            </div>
          </div>
        </section>

        <section className="how-to-section">
          <h2>How to Use</h2>
          <ol className="how-to-list">
            <li>
              <strong>Enter a number</strong> by clicking the digit buttons (0–9) or the
              decimal point button.
            </li>
            <li>
              <strong>Choose an operation</strong> — arithmetic operators (+, −, ×, ÷) or
              scientific functions (sin, cos, tan, ln, log, √, x², xʸ).
            </li>
            <li>
              <strong>Apply a function</strong> like sin or √ immediately after entering the
              number. The result appears on screen right away.
            </li>
            <li>
              <strong>Press = (Equals)</strong> to evaluate a two-operand expression such
              as 5 + 3 or 2 ^ 8.
            </li>
            <li>
              <strong>Use CE / C</strong> to clear the current entry or the entire
              calculation and start fresh.
            </li>
            <li>
              <strong>Toggle sign (±)</strong> to switch between positive and negative values.
            </li>
          </ol>
        </section>

        <section className="math-section">
          <h2>Mathematical Background</h2>
          <p>
            Scientific calculators bridge everyday arithmetic and advanced mathematics.
            Here's a quick primer on some of the functions available:
          </p>

          <h3>Trigonometry</h3>
          <p>
            Trigonometric functions relate the angles of a triangle to the lengths of its
            sides. For a right triangle with an angle θ:
          </p>
          <ul>
            <li><strong>sin(θ)</strong> = opposite / hypotenuse</li>
            <li><strong>cos(θ)</strong> = adjacent / hypotenuse</li>
            <li><strong>tan(θ)</strong> = opposite / adjacent</li>
          </ul>
          <p>
            These functions are also periodic and appear in wave mechanics, signal processing,
            electrical engineering, and many areas of physics and pure mathematics.
          </p>

          <h3>Logarithms</h3>
          <p>
            A logarithm answers the question: "To what exponent must we raise the base to
            obtain this number?" For example, log₁₀(1000) = 3 because 10³ = 1000.
            The natural logarithm (ln) uses base e ≈ 2.71828 and appears naturally in
            exponential growth and decay models, compound interest, and information theory.
          </p>

          <h3>Exponentiation</h3>
          <p>
            Raising a number to a power is a fundamental operation. x² means multiplying x
            by itself, while xʸ generalises this to any power y. Exponentiation underlies
            polynomial equations, compound growth formulas, and combinatorics.
          </p>

          <h3>The Constants π and e</h3>
          <p>
            <strong>π (pi)</strong> is the ratio of a circle's circumference to its diameter,
            approximately 3.14159265. It appears in geometry, trigonometry, Fourier analysis,
            and even in the probability distribution of random events.
          </p>
          <p>
            <strong>e (Euler's number)</strong> ≈ 2.71828 is the base of the natural
            logarithm. It is the unique number such that the function eˣ is its own
            derivative, making it indispensable in calculus and differential equations.
          </p>
        </section>

        <section className="tips-section">
          <h2>Tips &amp; Tricks</h2>
          <ul className="tips-list">
            <li>
              To compute 2⁸, press <kbd>2</kbd>, then <kbd>xʸ</kbd>, then <kbd>8</kbd>,
              then <kbd>=</kbd>.
            </li>
            <li>
              To compute sin(30°), press <kbd>3</kbd> <kbd>0</kbd>, then <kbd>sin</kbd>.
              The result should be 0.5.
            </li>
            <li>
              To compute √144, press <kbd>1</kbd> <kbd>4</kbd> <kbd>4</kbd>, then <kbd>√</kbd>.
              The result is 12.
            </li>
            <li>
              Use <kbd>π</kbd> as the starting value in a calculation, e.g. π × r² to
              compute the area of a circle.
            </li>
            <li>
              Chain calculations: compute a result, then immediately apply another operator
              to continue from that result.
            </li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>Built with React &amp; Vite — Scientific Calculator &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
