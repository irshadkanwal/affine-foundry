import { Button, ContentSwitcher, IconSwitch } from "@carbon/react";
import { Menu, Grid as GridIcon, List } from "@carbon/icons-react";

export default function TopLevelButtons({
  openAddModal,
  buttonName,
  setIsViewChange,
  isListView,
  shouldContentSwitecherRender,
  isTableView,
}) {
  return (
    <>
      <Button onClick={() => openAddModal(true)}>{buttonName} +</Button>
      {shouldContentSwitecherRender && (
        <div>
          <ContentSwitcher size="lg" onChange={() => {}}>
            <IconSwitch
              name="Grid"
              text={isListView ? "List View" : "Grid View"}
              onClick={() => setIsViewChange(true)}
            >
              {isListView ? <List /> : <GridIcon />}
            </IconSwitch>
            <IconSwitch
              name="table"
              text={!isTableView ? "List View" : "Table View"}
              onClick={() => setIsViewChange(false)}
            >
              {isTableView ? <Menu /> : <List />}
            </IconSwitch>
          </ContentSwitcher>
        </div>
      )}
    </>
  );
}
