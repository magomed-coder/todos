import { useCallback, useEffect, useMemo, useState } from "react";

import { TodoAddForm } from "./components/TodoAddForm";
import { TodoList } from "./components/TodoList";
import { ClearButton, Footer, TodoCount } from "./components/Footer";
import { Filters } from "./components/Filters";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type ToDoStatus = "all" | "completed" | "active";

function App() {
  const [filter, setFilter] = useState<ToDoStatus>("all");

  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) return JSON.parse(storedTodos);
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    if (text.trim().length === 0) return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now().toString(), text, completed: false },
    ]);
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const clearTodos = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }, []);

  const renameToDo = useCallback((id: string, newText: string): void => {
    setTodos((prev) => {
      const index = prev.findIndex((todo) => todo.id === id);
      if (index === -1) return prev;
      const updatedTodos = [...prev];
      updatedTodos[index] = { ...updatedTodos[index], text: newText };
      return updatedTodos;
    });
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "active":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const uncompletedTodoCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );
  const isEmpty = todos.filter((todo) => todo.completed).length === 0;

  return (
    <main className="todos">
      <h1 className="todos__title">todos</h1>

      <div className="todos__container">
        <TodoAddForm onAdd={addTodo} />

        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          onRename={renameToDo}
        />

        <Footer>
          <TodoCount
            uncompletedTodoCount={uncompletedTodoCount}
            isEmpty={isEmpty}
          />
          <Filters filter={filter} setFilter={setFilter} />
          <ClearButton isEmpty={isEmpty} clearTodos={clearTodos} />
        </Footer>
      </div>
    </main>
  );
}

export default App;
