import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

beforeEach(() => {
  localStorage.clear();
});

describe("Todo App functionality", () => {
  describe("Adding and Deleting Todos", () => {
    test("adds a new todo", () => {
      render(<App />);

      const input = screen.getByPlaceholderText(
        /what needs to be done/i
      ) as HTMLInputElement;
      const addButton = screen.getByRole("button", { name: /add todo/i });

      fireEvent.change(input, { target: { value: "Test a Todo" } });
      fireEvent.click(addButton);

      expect(screen.getByText(/test a todo/i)).toBeInTheDocument();
    });

    test("adds a single todo and deletes it", async () => {
      render(<App />);

      const input = screen.getByPlaceholderText(
        /what needs to be done/i
      ) as HTMLInputElement;
      const addButton = screen.getByRole("button", { name: /add todo/i });

      fireEvent.change(input, { target: { value: "Test Todo" } });
      fireEvent.click(addButton);

      const todoItem = await screen.findByText(/test todo/i);
      expect(todoItem).toBeInTheDocument();

      const deleteButton = await screen.findByTestId("delete-button");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.queryByText(/test todo/i)).not.toBeInTheDocument();
      });
    });
  });

  describe("Todo Completion and Toggling", () => {
    test("toggles todo completion", async () => {
      render(<App />);

      const input = screen.getByPlaceholderText(
        /what needs to be done/i
      ) as HTMLInputElement;
      const addButton = screen.getByRole("button", { name: /add todo/i });

      fireEvent.change(input, { target: { value: "Test Todo" } });
      fireEvent.click(addButton);

      const todoItem = await screen.findByText(/test todo/i);
      expect(todoItem).toBeInTheDocument();

      const toggleButton = await screen.findByTestId("checkbox-button");
      fireEvent.click(toggleButton);

      const todoItemParent = todoItem.closest(".todo-text");

      expect(todoItemParent).toHaveClass("done");
    });
  });

  describe("Filtering Todos", () => {
    test("filters todos based on active/completed", async () => {
      render(<App />);

      const input = screen.getByPlaceholderText(
        /what needs to be done/i
      ) as HTMLInputElement;
      const addButton = screen.getByRole("button", { name: /add todo/i });

      fireEvent.change(input, { target: { value: "Active Todo" } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: "Completed Todo" } });
      fireEvent.click(addButton);

      const toggleButtons = await screen.findAllByTestId("checkbox-button");
      fireEvent.click(toggleButtons[1]); // Toggle "Completed Todo"

      const completedTodoItem = await screen.findByText(/completed todo/i);
      const completedTodoParent = completedTodoItem.closest(".todo-text");
      expect(completedTodoParent).toHaveClass("done");

      const completedFilterButton = await screen.findByTestId("completed");
      fireEvent.click(completedFilterButton);

      const completedTodo = await screen.findByText(/completed todo/i);
      expect(completedTodo).toBeInTheDocument();

      const activeTodo = screen.queryByText(/active todo/i);
      expect(activeTodo).not.toBeInTheDocument();
    });
  });

  describe("Clearing Todos", () => {
    test("clears all todos when 'Clear completed' button is clicked", async () => {
      render(<App />);

      const input = screen.getByPlaceholderText(
        /what needs to be done/i
      ) as HTMLInputElement;
      const addButton = screen.getByRole("button", { name: /add todo/i });

      fireEvent.change(input, { target: { value: "Todo 1" } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: "Todo 2" } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: "Todo 3" } });
      fireEvent.click(addButton);

      expect(await screen.findByText("Todo 1")).toBeInTheDocument();
      expect(await screen.findByText("Todo 2")).toBeInTheDocument();
      expect(await screen.findByText("Todo 3")).toBeInTheDocument();

      const checkboxes = screen.getAllByTestId("checkbox-button");

      const firstCheckbox = checkboxes[0];
      const thirdCheckbox = checkboxes[2];

      fireEvent.click(firstCheckbox);
      fireEvent.click(thirdCheckbox);

      const clearCompletedButton = screen.getByRole("button", {
        name: /Clear completed/i,
      });
      fireEvent.click(clearCompletedButton);

      await waitFor(() => {
        expect(screen.queryByText("Todo 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Todo 2")).toBeInTheDocument();
        expect(screen.queryByText("Todo 3")).not.toBeInTheDocument();
      });
    });
  });
});
