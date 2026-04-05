import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SearchFilters } from "@/components/search-filters";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => "/products",
  useSearchParams: () => new URLSearchParams(),
}));

describe("SearchFilters", () => {
  beforeEach(() => {
    pushMock.mockReset();
    vi.useFakeTimers();
  });

  it("debounces URL updates for the search input", () => {
    render(
      <SearchFilters
        categories={[]}
        initialQuery=""
        initialCategory=""
      />,
    );

    fireEvent.change(screen.getByPlaceholderText(/try fragrance/i), {
      target: { value: "phone" },
    });

    act(() => {
      vi.advanceTimersByTime(399);
    });

    expect(pushMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(pushMock).toHaveBeenCalledWith("/products?query=phone");
  });

  it("updates the URL immediately when the category filter changes", () => {
    render(
      <SearchFilters
        categories={[{ slug: "smartphones", name: "smartphones" }]}
        initialQuery="phone"
        initialCategory=""
      />,
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "smartphones" },
    });

    expect(pushMock).toHaveBeenCalledWith(
      "/products?query=phone&category=smartphones",
    );
  });
});
