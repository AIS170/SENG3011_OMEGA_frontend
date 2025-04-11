import React, { useState, useRef } from "react";

export default function ConfirmCodeInput({ onComplete }) {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/[^0-9]/g, ""); // Only digits
    if (!val) return;

    const newValues = [...values];
    newValues[index] = val[0]; // Only keep the first digit
    setValues(newValues);

    // Move to next input
    if (index < 5 && inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }

    // If all filled, call onComplete
    if (newValues.every((char) => char)) {
      onComplete(newValues.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const newValues = [...values];
      newValues[index - 1] = "";
      setValues(newValues);
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {values.map((val, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          ref={(el) => (inputs.current[idx] = el)}
          onChange={(e) => handleChange(idx, e)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className="w-12 h-12 text-xl text-center rounded border border-gray-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
}
