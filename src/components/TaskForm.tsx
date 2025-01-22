import React, { memo, useState } from "react";
import { AddIcon } from "./icons/AddIcon";

interface TodoAddFormProps {
  onAdd: (taskName: string) => void;
}

export const TodoAddForm: React.FC<TodoAddFormProps> = memo(({ onAdd }) => {
  const [taskName, setTaskName] = useState<string>("");

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>): void {
    ev.preventDefault();

    if (taskName.trim() === "") return;
    onAdd(taskName);
    setTaskName("");
  }

  return (
    <form className="task-form todo_padding" onSubmit={handleSubmit}>
      <button className="task-form__add" type="submit">
        <AddIcon />
      </button>
      <input
        className="task-form__input"
        type="text"
        value={taskName}
        onChange={(ev) => setTaskName(ev.target.value)}
        placeholder="What needs to be done?"
      />
    </form>
  );
});
