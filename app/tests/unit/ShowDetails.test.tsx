jest.mock("../../queries/index", () => ({
  useShowDetails: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, fill, ...props }) => <img {...props} />,
}));

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "123" }),
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

import { useShowDetails } from "../../queries/index";
import MovieDetail from "../../show/[id]/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

beforeEach(() => {
  jest.clearAllMocks();
});

test("shows loading state initially", () => {
  (useShowDetails as jest.Mock).mockReturnValue({ isLoading: true });
  render(<MovieDetail />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("displays error state", () => {
  (useShowDetails as jest.Mock).mockReturnValue({
    error: new Error("Failed to load"),
  });
  render(<MovieDetail />);
  expect(screen.getByText("Error loading show details")).toBeInTheDocument();
});

test("renders show details", () => {
  (useShowDetails as jest.Mock).mockReturnValue({
    show: {
      name: "Test Show",
      image: { original: "/test.jpg" },
      rating: { average: 8.5 },
      summary: "<p>Test summary</p>",
    },
  });
  render(<MovieDetail />);
  expect(screen.getByText("Test Show")).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute("src", "/test.jpg");
  expect(screen.getByText("Test summary")).toBeInTheDocument();
});

test("renders fallback image", () => {
  (useShowDetails as jest.Mock).mockReturnValue({
    show: {
      name: "Test Show",
      image: { original: null },
      rating: { average: 8.5 },
      summary: "<p>Test summary</p>",
    },
  });
  render(<MovieDetail />);
  const fallbackIcon = screen.getByRole("img");
  expect(fallbackIcon).toBeVisible();
});

