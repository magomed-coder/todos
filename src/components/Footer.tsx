import React, { ReactNode, useMemo } from "react";

interface FooterProps {
  children: ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return <div className="todos__footer">{children}</div>;
};

interface TodoCountProps {
  uncompletedTodoCount: number;
  isEmpty: boolean;
}

export const TodoCount: React.FC<TodoCountProps> = ({
  uncompletedTodoCount,
  isEmpty,
}) => {
  const footerText = useMemo(() => {
    if (isEmpty) return "empty";
    if (uncompletedTodoCount === 0) return "all done";
    return `${uncompletedTodoCount} item${
      uncompletedTodoCount > 1 ? "s" : ""
    } left`;
  }, [isEmpty, uncompletedTodoCount]);

  return <p className="todos__count">{footerText}</p>;
};

interface ClearButtonProps {
  isEmpty: boolean;
  clearTodos: () => void;
}

export const ClearButton: React.FC<ClearButtonProps> = ({
  isEmpty,
  clearTodos,
}) => {
  return (
    <button className="todos__clear" onClick={clearTodos} disabled={isEmpty}>
      Clear completed
    </button>
  );
};
