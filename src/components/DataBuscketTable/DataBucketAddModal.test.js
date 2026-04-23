import { render, screen, act, waitFor } from "test-utils";
import DataBucketTable from "./DataBucketTable";
import user from "@testing-library/user-event";

describe("data bucket add modal test suit", () => {
  test("check if data bucket add modals shows", async () => {
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
    await waitFor(() => {
      const nameInput = screen.getByRole("textbox", { name: /name/i });

      expect(nameInput).toBeInTheDocument();
    });
    await waitFor(() => {
      const arnInput = screen.getByRole("textbox", { name: /arn/i });
      expect(arnInput).toBeInTheDocument();
    });
    await waitFor(() => {
      const cancelButton = screen.getByRole("button", { name: /cancel/i });

      expect(cancelButton).toBeInTheDocument();
    });
    await waitFor(() => {
      const submitButton = screen.getByRole("button", { name: /create/i });
      expect(submitButton).toBeInTheDocument();
    });
  });

  test("check if add modal inputs fields working correctly", async () => {
    user.setup();
    render(<DataBucketTable />);

    const newBucketButton = screen.getByRole("button", {
      name: /new data bucket \+/i,
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      user.click(newBucketButton);
    });
    await waitFor(async () => {
      const nameInput = screen.getByRole("textbox", { name: /name/i });
      await user.type(nameInput, "test case bucket name");
      expect(nameInput.value).toBe("test case bucket name");
    });
    await waitFor(async () => {
      const arnInput = screen.getByRole("textbox", { name: /arn/i });
      await user.type(arnInput, "test case bucket arn");
      expect(arnInput.value).toBe("test case bucket arn");
    });
  });
});
