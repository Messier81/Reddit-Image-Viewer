import React from "react";
import { render } from "@testing-library/react";
import RIV from "./RIV";

test("renders learn react link", () => {
  const { getByText } = render(<RIV />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
