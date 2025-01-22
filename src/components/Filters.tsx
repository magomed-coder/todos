import React from "react";
import { ToDoStatus } from "../App";

interface FiltersProps {
  filter: ToDoStatus;
  setFilter: (filter: ToDoStatus) => void;
}

const FILTERS: ToDoStatus[] = ["all", "completed", "active"];

export const Filters: React.FC<FiltersProps> = React.memo(
  ({ filter, setFilter }) => {
    const getButtonClass = (currentFilter: ToDoStatus) =>
      `filters__button ${
        filter === currentFilter ? "filters__button--active" : ""
      }`;

    return (
      <div className="filters">
        {FILTERS.map((currentFilter) => (
          <button
            key={currentFilter}
            onClick={() => setFilter(currentFilter)}
            className={getButtonClass(currentFilter)}
          >
            {currentFilter}
          </button>
        ))}
      </div>
    );
  }
);
