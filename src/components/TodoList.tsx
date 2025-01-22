import React, { memo } from "react";
import { TodoItem } from "./TodoItem";
import { Todo } from "../App";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  onRename: (id: string, newText: string) => void;
}

export const TodoList: React.FC<TodoListProps> = memo(
  ({ todos, toggleTodo, deleteTodo, onRename }) => {
    return (
      <>
        {todos.length === 0 ? (
          <EmptyList />
        ) : (
          <ul>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                onRename={onRename}
              />
            ))}
          </ul>
        )}
      </>
    );
  },
  (prevProps, nextProps) => prevProps.todos === nextProps.todos
);

const EmptyList: React.FC = memo(() => (
  <div className="empty-list">
    <p>No tasks!</p>
  </div>
));
