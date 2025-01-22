import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

test("adds a new todo", () => {
  render(<App />);

  const input = screen.getByPlaceholderText(
    /what needs to be done/i
  ) as HTMLInputElement;
  const addButton = screen.getByRole("button", { name: /add todo/i });

  fireEvent.change(input, { target: { value: "Test Todo" } });
  fireEvent.click(addButton);

  expect(screen.getByText(/test todo/i)).toBeInTheDocument();
});
