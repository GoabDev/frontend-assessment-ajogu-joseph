import { render, screen } from "@testing-library/react";

import { Pagination } from "@/components/pagination";

describe("Pagination", () => {
  it("builds previous and next links with the active query state", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        query="phone"
        category="smartphones"
      />,
    );

    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      "/products?query=phone&category=smartphones",
    );
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
      "href",
      "/products?page=3&query=phone&category=smartphones",
    );
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
