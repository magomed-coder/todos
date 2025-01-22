import { useEffect, useMemo, useState } from "react";

import { TodoAddForm } from "./components/TaskForm";
import { TodoList } from "./components/TodoList";
import { Footer } from "./components/Footer";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type ToDoStatus = "all" | "completed" | "active";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<ToDoStatus>("all");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim().length === 0) return;

    setTodos([...todos, { id: Date.now().toString(), text, completed: false }]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearTodos = () => {
    setTodos([]);
  };

  function renameToDo(id: string, newText: string): void {
    setTodos((prev) => {
      const newTasks = [...prev];
      const taskIndex = newTasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        newTasks[taskIndex].text = newText;
      }
      return newTasks;
    });
  }

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
  const isEmpty = todos.length === 0;

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

        <Footer
          filter={filter}
          setFilter={setFilter}
          uncompletedTodoCount={uncompletedTodoCount}
          isEmpty={isEmpty}
          clearTodos={clearTodos}
        />
      </div>
    </main>
  );
}

export default App;
