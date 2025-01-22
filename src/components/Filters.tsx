import React from "react";
import { ToDoStatus } from "../App";

interface FiltersProps {
  filter: ToDoStatus;
  setFilter: (filter: ToDoStatus) => void;
}

const FILTERS: ToDoStatus[] = ["all", "completed", "active"];

export const Filters: React.FC<FiltersProps> = ({ filter, setFilter }) => {
  return (
    <div className="filters">
      {FILTERS.map((currentFilter) => (
        <button
          key={currentFilter}
          onClick={() => setFilter(currentFilter)}
          className={`filters__button ${
            filter === currentFilter ? "filters__button--active" : ""
          }`}
        >
          {currentFilter}
        </button>
      ))}
    </div>
  );
};
