import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Todo from "./Todo";

describe("Todo component", () => {
  const todo = {
    text: "Learn javascript",
    done: false,
  };

  it("renders text correctly", () => {
    render(<Todo todo={todo} />);
    expect(screen.getByText("Learn javascript")).toBeInTheDocument();
  });

  it("calls deleteTodo when delete button is clicked", () => {
    const deleteTodo = jest.fn();
    render(<Todo todo={todo} deleteTodo={deleteTodo} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(deleteTodo).toHaveBeenCalled();
  });

  it("calls completeTodo when complete button is clicked", () => {
    const completeTodo = jest.fn();
    render(<Todo todo={todo} completeTodo={completeTodo} />);
    fireEvent.click(screen.getByText("Set as done"));
    expect(completeTodo).toHaveBeenCalled();
  });
});
