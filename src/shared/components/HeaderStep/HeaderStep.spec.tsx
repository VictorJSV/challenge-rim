import { render, screen, fireEvent } from "@testing-library/react";
import { HeaderStep } from "./HeaderStep";

describe("HeaderStep", () => {
  beforeEach(() => {
    jest.spyOn(window.history, "back").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("when rendered, then displays the back button and steps component", () => {
    render(<HeaderStep numberSelected={1} />);
    expect(screen.getByText("Planes y coberturas")).toBeInTheDocument();
    expect(screen.getByText("Resumen")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /volver/i })).toBeInTheDocument();
  });

  it("when back button is clicked, then calls window.history.back", () => {
    render(<HeaderStep numberSelected={1} />);
    fireEvent.click(screen.getByRole("button", { name: /volver/i }));
    expect(window.history.back).toHaveBeenCalled();
  });
});
