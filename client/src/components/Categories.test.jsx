import "@testing-library/jest-dom"; // Add this import
import { render, screen } from "@testing-library/react";
import Categories from "./Categories";
import { MemoryRouter } from "react-router-dom";

test("renders Categories component with heading", () => {
  render(
    <MemoryRouter>
      <Categories />
    </MemoryRouter>
  );

  const heading = screen.getByText(/Explore Top Categories/i);
  expect(heading).toBeInTheDocument();
});
