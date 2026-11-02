import { useEffect } from "react";

export default function KeyboardSupport({ onKeyPress }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (
        event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        event.repeat
      ) {
        return;
      }

      const keyMap = {
        Enter: "=",
        "=": "=",
        Backspace: "C",
        Escape: "C",
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        ".": ".",
        "%": "%",
      };

      const value = /^[0-9]$/.test(event.key)
        ? event.key
        : keyMap[event.key];

      if (!value) return;

      if (["/", "Enter", "Backspace"].includes(event.key)) {
        event.preventDefault();
      }

      onKeyPress(value);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onKeyPress]);

  return null;
}
