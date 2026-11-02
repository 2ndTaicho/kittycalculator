import { useState } from "react";
import KeyboardSupport from "./KeyboardSupport";
import { playMeow } from "./sounds";
import "./App.css";

const buttons = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["♡", "0", ".", "="],
];

const operators = ["+", "−", "×", "÷"];

function calculate(a, b, operator) {
  if (operator === "+") return a + b;
  if (operator === "−") return a - b;
  if (operator === "×") return a * b;
  if (operator === "÷") return b === 0 ? null : a / b;
  return b;
}

function formatNumber(number) {
  if (!Number.isFinite(number)) return "Error";
  return String(Number(number.toPrecision(10)));
}

function CatButton({ value, onClick }) {
  const isOperator = operators.includes(value);
  const isSpecial = ["C", "±", "%", "♡"].includes(value);
  const isEquals = value === "=";

  const fill = isEquals
    ? "#e6b7ed"
    : isOperator
      ? "#ffafc5"
      : isSpecial
        ? "#f8c8d7"
        : "#fffdfd";

  const numberColor =
    isOperator || isSpecial || isEquals
      ? "#fff9fc"
      : "#e7ad42";

  return (
    <button
      type="button"
      className="cat-button"
      aria-label={value}
      onClick={() => onClick(value)}
    >
      <svg
        viewBox="0 0 100 112"
        className="cat-svg"
        aria-hidden="true"
      >
        <path
          d="
            M 11 43
            Q 10 29 13 12
            Q 14 5 21 11
            L 37 23
            Q 50 18 63 23
            L 79 11
            Q 86 5 87 12
            Q 90 29 89 43
            Q 96 56 94 75
            Q 93 98 74 103
            Q 50 109 26 103
            Q 7 98 6 75
            Q 4 56 11 43
            Z
          "
          fill="#a77a86"
          stroke="#67444e"
          strokeWidth="3.5"
          strokeLinejoin="round"
          transform="translate(0 4)"
        />

        <path
          d="
            M 11 43
            Q 10 29 13 12
            Q 14 5 21 11
            L 37 23
            Q 50 18 63 23
            L 79 11
            Q 86 5 87 12
            Q 90 29 89 43
            Q 96 56 94 75
            Q 93 98 74 103
            Q 50 109 26 103
            Q 7 98 6 75
            Q 4 56 11 43
            Z
          "
          fill={fill}
          stroke="#67444e"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        <path
          d="M 18 17 Q 19 16 22 19 L 31 27 Q 23 29 17 34 Z"
          fill="#f3a6bd"
          opacity="0.8"
        />

        <path
          d="M 82 17 Q 81 16 78 19 L 69 27 Q 77 29 83 34 Z"
          fill="#f3a6bd"
          opacity="0.8"
        />

        <path
          d="M 20 46 Q 28 42 35 46"
          fill="none"
          stroke="#67444e"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <path
          d="M 65 46 Q 72 42 80 46"
          fill="none"
          stroke="#67444e"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <ellipse cx="32" cy="49" rx="2.8" ry="3.5" fill="#67444e" />
        <ellipse cx="68" cy="49" rx="2.8" ry="3.5" fill="#67444e" />

        <ellipse cx="23" cy="57" rx="7" ry="3.6" fill="#ff91b2" opacity="0.6" />
        <ellipse cx="77" cy="57" rx="7" ry="3.6" fill="#ff91b2" opacity="0.6" />

        <path
          d="M 46 56 Q 50 59 54 56 Q 52 62 50 62 Q 48 62 46 56 Z"
          fill="#8e5b68"
        />

        <path
          d="M 50 62 Q 44 69 40 63 M 50 62 Q 56 69 60 63"
          fill="none"
          stroke="#67444e"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M 21 66 L 8 63 M 21 71 L 8 72 M 79 66 L 92 63 M 79 71 L 92 72"
          stroke="#8e6874"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.65"
        />

        <path
          d="M 24 89 Q 27 85 30 89 M 70 89 Q 73 85 76 89"
          fill="none"
          stroke="#b88595"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.7"
        />

        <text
          x="50"
          y="89"
          textAnchor="middle"
          fill={numberColor}
          fontFamily="Quicksand, sans-serif"
          fontWeight="700"
          fontSize="23"
        >
          {value}
        </text>
      </svg>
    </button>
  );
}

export default function App() {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [message, setMessage] = useState("a little math, a lot of love ♡");
  const [soundEnabled, setSoundEnabled] = useState(true);

  function press(value) {
    playMeow(soundEnabled, value === "=");

    if (value === "C") {
      setDisplay("0");
      setStored(null);
      setOperator(null);
      setWaiting(false);
      setMessage("all clean! ♡");
      return;
    }

    if (value === "♡") {
      setMessage("meow! you're doing amazing ♡");
      return;
    }

    if (value === "±") {
      if (display !== "Error") {
        setDisplay(String(-Number(display)));
      }
      return;
    }

    if (value === "%") {
      if (display !== "Error") {
        setDisplay(formatNumber(Number(display) / 100));
      }
      return;
    }

    if (operators.includes(value)) {
      if (display === "Error") return;

      if (operator && !waiting && stored !== null) {
        const result = calculate(stored, Number(display), operator);

        if (result === null) {
          setDisplay("Error");
          setStored(null);
          setOperator(null);
          setWaiting(true);
          setMessage("oops! can't divide by zero ♡");
          return;
        }

        setStored(result);
        setDisplay(formatNumber(result));
      } else {
        setStored(Number(display));
      }

      setOperator(value);
      setWaiting(true);
      setMessage("calculating with love ♡");
      return;
    }

    if (value === "=") {
      if (operator === null || stored === null || waiting) return;

      const result = calculate(stored, Number(display), operator);

      if (result === null) {
        setDisplay("Error");
        setMessage("oops! can't divide by zero ♡");
      } else {
        setDisplay(formatNumber(result));
        setMessage("purrfect answer! ♡");
      }

      setStored(null);
      setOperator(null);
      setWaiting(true);
      return;
    }

    if (value === ".") {
      if (waiting || display === "Error") {
        setDisplay("0.");
        setWaiting(false);
      } else if (!display.includes(".")) {
        setDisplay(display + ".");
      }
      return;
    }

    if (/^\d$/.test(value)) {
      if (waiting || display === "0" || display === "Error") {
        setDisplay(value);
        setWaiting(false);
      } else if (display.replace(/[^0-9]/g, "").length < 12) {
        setDisplay(display + value);
      }
    }
  }

  return (
    <main className="page">
      <KeyboardSupport onKeyPress={press} />

      <div className="floating-decoration decoration-one">♡</div>
      <div className="floating-decoration decoration-two">✧</div>
      <div className="floating-decoration decoration-three">♡</div>

      <div className="calculator-wrapper">
        <div className="calculator-heading">
          <span>THE CUTEST WAY TO COUNT</span>
          <h1>Kitty Calculator</h1>
          <p>little paws, big calculations ♡</p>
        </div>

        <section className="calculator">
          <div className="calculator-top">
            <span className="calculator-brand">kitty ♡</span>
            <div className="solar-panel">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="calculator-screen">
            <div className="screen-history">
              {stored !== null && operator
                ? `${stored} ${operator}`
                : "♡"}
            </div>
            <div className="screen-number">{display}</div>
          </div>

          <div className="calculator-message">{message}</div>

          <div className="calculator-keys">
            {buttons.flat().map((value, index) => (
              <CatButton
                key={`${value}-${index}`}
                value={value}
                onClick={press}
              />
            ))}
          </div>

          <div className="calculator-bottom">
            <span>✧</span>
            made with love
            <span>♡</span>
          </div>
        </section>

        <button
          type="button"
          className={`sound-toggle ${soundEnabled ? "enabled" : ""}`}
          aria-pressed={soundEnabled}
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          <span className="sound-icon">
            {soundEnabled ? "♫" : "♪"}
          </span>
          <span>meow sounds {soundEnabled ? "on" : "off"}</span>
          <span className="sound-switch">
            <span />
          </span>
        </button>

        <p className="page-footer">
          a tiny calculator for lovely little things ♡
        </p>
      </div>
    </main>
  );
}
