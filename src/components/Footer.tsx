import React from "react";
import { ToDoStatus } from "../App";
import { Filters } from "./Filters";

interface FooterProps {
  filter: ToDoStatus;
  setFilter: (filter: ToDoStatus) => void;
  uncompletedTodoCount: number;
  isEmpty: boolean;
  clearTodos: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  filter,
  setFilter,
  uncompletedTodoCount,
  isEmpty,
  clearTodos,
}) => {
  const getFooterText = () => {
    if (isEmpty) return "empty";
    if (uncompletedTodoCount === 0) return "all done";
    return `${uncompletedTodoCount} item${
      uncompletedTodoCount > 1 ? "s" : ""
    } left`;
  };

  return (
    <div className="todos__footer">
      <p className="todos__count">{getFooterText()}</p>

      <Filters filter={filter} setFilter={setFilter} />
      <button className="todos__clear" onClick={clearTodos} disabled={isEmpty}>
        Clear completed
      </button>
    </div>
  );
};
