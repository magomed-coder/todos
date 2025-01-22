import React from "react";
import { ToDoStatus } from "../App";

interface FiltersProps {
  filter: ToDoStatus;
  setFilter: (filter: ToDoStatus) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filter, setFilter }) => {
  return (
    <div className="filters">
      <button
        onClick={() => setFilter("all")}
        className={`filters__button ${
          filter === "all" ? "filters__button--active" : ""
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`filters__button ${
          filter === "completed" ? "filters__button--active" : ""
        }`}
      >
        Completed
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`filters__button ${
          filter === "active" ? "filters__button--active" : ""
        }`}
      >
        Active
      </button>
    </div>
  );
};
