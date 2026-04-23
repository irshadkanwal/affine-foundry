import { render, screen, act, waitFor } from "test-utils";
import DataBucketTable from "./DataBucketTable";
import user from "@testing-library/user-event";

describe("data bucket tests", () => {
  test("check if top level components renders properly", () => {
    render(<DataBucketTable />);

    const newBucketButton = screen.getByRole("button", {
      name: /new data bucket \+/i,
    });

    const dataBucketHeading = screen.getByRole("heading", {
      name: /data bucket/i,
    });

    const switchGridButtonRender = screen.queryByRole("tab", {
      name: /grid view/i,
    });
    const switchListButtonRender = screen.queryByRole("tab", {
      name: /grid view/i,
    });
    expect(switchGridButtonRender).not.toBeInTheDocument();
    expect(switchListButtonRender).not.toBeInTheDocument();

    expect(newBucketButton).toBeInTheDocument();
    expect(dataBucketHeading).toBeInTheDocument();
  });
  // render test end
  test("check if data bucket add modal opens", async () => {
    user.setup();
    render(<DataBucketTable />);
    const newBucketButton = screen.getByRole("button", {
      name: /new data bucket \+/i,
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      user.click(newBucketButton);
    });
    await waitFor(() => {
      const addModalHeading = screen.getByRole("heading", {
        name: /new data bucket/i,
      });

      expect(addModalHeading).toBeInTheDocument();
    });
  });
});
