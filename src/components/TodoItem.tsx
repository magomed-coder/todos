import React, { useState } from "react";
import { Todo } from "../App";
import { Checkbox } from "./Checkbox";
import { TrashIcon } from "./icons/TrashIcon";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  onRename: (id: string, newText: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
  onRename,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  const handleDelete = () => {
    setIsRemoving(true);
    setTimeout(() => {
      deleteTodo(todo.id);
    }, 350);
  };

  return (
    <li className={`todo-item todo_padding ${isRemoving ? "fade-out" : ""}`}>
      <Checkbox checked={todo.completed} onClick={() => toggleTodo(todo.id)} />

      {!editMode ? (
        <div
          className={`todo-text  ${todo.completed ? "done" : ""}`}
          onClick={() => setEditMode((prev) => !prev)}
        >
          <span>{todo.text}</span>
        </div>
      ) : (
        <div className="todo-text">
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              setEditMode(false);
            }}
          >
            <input
              type="text"
              value={todo.text}
              onChange={(ev) => onRename(todo.id, ev.target.value)}
            />
          </form>
        </div>
      )}

      <button className="todo-item__delete" onClick={handleDelete}>
        <TrashIcon />
      </button>
    </li>
  );
};
