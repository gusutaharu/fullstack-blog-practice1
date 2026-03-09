import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import { render, screen } from "@testing-library/react";

//next/navigation をモック化
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
//配下の子コンポーネント（非同期処理）をモック化

jest.mock("../app/ui/notification", () => () => null);
jest.mock("../app/ui/Bloglist", () => {
  return function MockBloglist() {
    return <div data-testid="mock-bloglist">Blog List</div>;
  };
});

describe("Page", () => {
  it("renders a heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
