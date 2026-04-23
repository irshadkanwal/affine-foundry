import { act, render, screen, waitFor } from "@testing-library/react";
import TopLevelComps from "./TopLevelContainer";
import user from "@testing-library/user-event";

describe("top level comps tests", () => {
  test("check if top level components renders properly", () => {
    render(
      <TopLevelComps
        buttonName="test button name"
        name="test top level comp heading"
        openAddModal={() => {}}
        onSubmit={() => {}}
        filterLable="test filter label"
        searchFilter={[]}
        setFilterData={() => {}}
        shouldContentSwitecherRender={true}
      />
    );

    const topLevelCompsHeading = screen.getByRole("heading", {
      name: /test top level comp heading/i,
    });
    const filterButton = screen.getByRole("button", {
      name: /filter/i,
    });
    const searchBar = screen.getByRole("searchbox", {
      name: /search/i,
    });
    const newBucketButton = screen.getByRole("button", {
      name: /test button name/i,
    });

    const switchGridButtonRender = screen.getByRole("tab", {
      name: /grid view/i,
    });
    const switchListButtonRender = screen.getByRole("tab", {
      name: /grid view/i,
    });
    expect(topLevelCompsHeading).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(newBucketButton).toBeInTheDocument();
    expect(switchGridButtonRender).toBeInTheDocument();
    expect(switchListButtonRender).toBeInTheDocument();
  });
  // render test end
  test("check if filter popover is shown", async () => {
    user.setup();
    render(
      <TopLevelComps
        buttonName="button name"
        name="test top level comp heading"
        openAddModal={() => {}}
        onSubmit={() => {}}
        filterLable="test filter label"
        searchFilter={[]}
        setFilterData={() => {}}
      />
    );

    const filterButton = screen.getByRole("button", {
      name: /filter/i,
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      user.click(filterButton);
    });

    await waitFor(() => {
      const yesCheckBox = screen.getByRole("checkbox", {
        name: /yes/i,
        hidden: true,
      });

      expect(yesCheckBox).toBeInTheDocument();
    });
    await waitFor(() => {
      const noCheckBox = screen.getByRole("checkbox", {
        name: /no/i,
        hidden: true,
      });

      expect(noCheckBox).toBeInTheDocument();
    });
    await waitFor(() => {
      const dateStarting1 = screen.getByRole("textbox", {
        name: /created from/i,
        hidden: true,
      });

      expect(dateStarting1).toBeInTheDocument();
    });
    await waitFor(() => {
      const dateEnding1 = screen.getByRole("textbox", {
        name: /last updated from/i,
        hidden: true,
      });

      expect(dateEnding1).toBeInTheDocument();
    });
    await waitFor(() => {
      const resetButton = screen.getByRole("button", {
        name: /reset/i,
        hidden: true,
      });

      expect(resetButton).toBeInTheDocument();
    });
    await waitFor(() => {
      const applyButton = screen.getByRole("button", {
        name: /apply/i,
        hidden: true,
      });
      expect(applyButton).toBeInTheDocument();
    });
  });

  test("search bar testing", async () => {
    user.setup();
    render(
      <TopLevelComps
        buttonName="button name"
        name="test top level comp heading"
        openAddModal={() => {}}
        onSubmit={() => {}}
        filterLable="test filter label"
        searchFilter={[]}
        setFilterData={() => {}}
      />
    );
    const searchBar = screen.getByRole("searchbox", {
      name: /search/i,
    });

    await user.type(searchBar, "testtong");

    expect(searchBar.value).toBe("testtong");
  });

  test("check if create button works", async () => {
    const handleCreateBucket = jest.fn();
    user.setup();
    render(
      <TopLevelComps
        buttonName="button name"
        name="test top level comp heading"
        openAddModal={handleCreateBucket}
        onSubmit={() => {}}
        filterLable="test filter label"
        searchFilter={[]}
        setFilterData={() => {}}
      />
    );
    const newBucketButton = screen.getByRole("button", {
      name: /button name/i,
    });
    await user.click(newBucketButton);
    expect(handleCreateBucket).toHaveBeenCalledTimes(1);
  });

  test("check if submit button on pop over works", async () => {
    const handleSubmit = jest.fn();
    user.setup();
    render(
      <TopLevelComps
        buttonName="button name"
        name="test top level comp heading"
        openAddModal={() => {}}
        onSubmit={handleSubmit}
        filterLable="test filter label"
        searchFilter={[]}
        setFilterData={() => {}}
      />
    );

    const filterButton = screen.getByRole("button", {
      name: /filter/i,
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      user.click(filterButton);
    });

    const submitButton = await waitFor(() => {
      const applyButton = screen.getByRole("button", {
        name: /apply/i,
        hidden: true,
      });
      return applyButton;
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      user.click(submitButton);
    });
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test("testing switch button working", async () => {
    user.setup();
    const handleViewSwitch = jest.fn();
    render(
      <TopLevelComps
        buttonName="test button name"
        name="test top level comp heading"
        openAddModal={() => {}}
        onSubmit={() => {}}
        filterLable="test filter label"
        searchFilter={[]}
        setFilterData={() => {}}
        setIsViewChange={handleViewSwitch}
        shouldContentSwitecherRender={true}
      />
    );

    const switchGridButtonRender = screen.getByRole("tab", {
      name: /grid view/i,
    });
    const switchListButtonRender = screen.getByRole("tab", {
      name: /grid view/i,
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      user.click(switchGridButtonRender);
      user.click(switchListButtonRender);
    });
    await waitFor(() => {
      expect(handleViewSwitch).toHaveBeenCalledTimes(2);
    });
  });
});
