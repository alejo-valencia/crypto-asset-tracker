import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../NavBar";

jest.mock("../../../pages/Home/CoinTable", () => ({
  useSearchStore: () => ({
    searchString: "",
    setSearchString: jest.fn(),
  }),
}));

describe("NavBar", () => {
  it("should render links for Home and Compare", () => {
    render(<NavBar />);

    const homeLink = screen.getByText(/Home/i);
    const compareLink = screen.getByText(/Compare/i);

    expect(homeLink).toBeInTheDocument();
    expect(compareLink).toBeInTheDocument();
  });
});
