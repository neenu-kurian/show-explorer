import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { searchResults, shows } from "../testdata";

let savedCb = () => {};
jest.mock("../../hooks/useObserverRef", () => ({
  __esModule: true,
  useObserverRef: (cb: () => void) => {
    savedCb = cb;
    return () => {};
  },
}));

jest.mock("../../hooks/useDebounce", () => ({
  __esModule: true,
  useDebouncedValue: (value: string) => value,
}));

jest.mock("../../queries/index", () => ({
  __esModule: true,
  useSearchShows: jest.fn(() => ({
    searchResults,
    isLoading: false,
    error: false,
  })),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, fill, unoptimized, ...props }) => <img {...props} />,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

import HomeClient from "../../components/HomeClient";
import { useSearchShows } from "../../queries/index";

beforeEach(() => {
  jest.clearAllMocks();
});

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

test("it displays all categories", async () => {
  const queryClient = createTestQueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <HomeClient shows={shows} />
    </QueryClientProvider>
  );
  const headings = await screen.getAllByRole("heading", { level: 3 });
  expect(headings.length).toBe(4);
});

test("it loads more categories on infinite scroll", async () => {
  const queryClient = createTestQueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <HomeClient shows={shows} />
    </QueryClientProvider>
  );
  act(() => {
    savedCb();
  });

  const headings = await screen.getAllByRole("heading", { level: 3 });
  expect(headings.length).toBeGreaterThan(4);
});

test("it searches and displays results when user types something in search bar", async () => {
  const queryClient = createTestQueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <HomeClient shows={shows} />
    </QueryClientProvider>
  );

  const user = userEvent.setup();
  await user.type(screen.getByRole("searchbox"), "test");

  expect(await screen.findByText("Search Results")).toBeInTheDocument();
  expect(await screen.findByText("Johnny Test")).toBeInTheDocument();
});

test("it shows loading when search is in progress", async () => {
  (useSearchShows as jest.Mock).mockImplementation((query: string) => {
    if (query === "test") return { searchResults: undefined, isLoading: true, error: false };
    return { searchResults, isLoading: false, error: false };
  });
  const queryClient = createTestQueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <HomeClient shows={shows} />
    </QueryClientProvider>
  );

  const user = userEvent.setup();
  await user.type(screen.getByRole("searchbox"), "test");
  
  expect(await screen.findByText("Searching...")).toBeInTheDocument();
});

test("it shows error when there is error", async () => {
  (useSearchShows as jest.Mock).mockImplementation((query: string) => {
    if (query === "test") return { searchResults: undefined, isLoading: false, error: true };
    return { searchResults, isLoading: false, error: false };
  });
  const queryClient = createTestQueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <HomeClient shows={shows} />
    </QueryClientProvider>
  );

  const user = userEvent.setup();
  await user.type(screen.getByRole("searchbox"), "test");
  
  expect(await screen.findByText("Error loading shows")).toBeInTheDocument();
});

test("it shows no results when there is no results", async () => {
  (useSearchShows as jest.Mock).mockImplementation((query: string) => {
    if (query === "nonexitsfdfddfdfdsfgdgdfgdfgdfgddg") return { searchResults: [], isLoading: false, error: false };
    return { searchResults, isLoading: false, error: false };
  });
  const queryClient = createTestQueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <HomeClient shows={shows} />
    </QueryClientProvider>
  );

  const user = userEvent.setup();
  await user.type(screen.getByRole("searchbox"), "nonexitsfdfddfdfdsfgdgdfgdfgdfgddg");
  
  expect(await screen.findByText("No results found")).toBeInTheDocument();
});
