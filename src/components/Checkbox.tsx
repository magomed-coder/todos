import React from "react";
import { CheckIcon } from "./icons/CheckIcon";

interface CheckboxProps {
  checked?: boolean;
  onClick: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`todo-item__checkbox ${checked ? "checked" : ""}`}
      data-testid="checkbox-button"
    >
      {checked && <CheckIcon />}
    </div>
  );
};
