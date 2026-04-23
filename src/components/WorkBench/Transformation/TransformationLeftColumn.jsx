import React from "react";
import { Button, SideNav, SideNavMenu, SideNavMenuItem } from "@carbon/react";
import { Folder, Add, Document } from "@carbon/react/icons";
import NewProjectModal from "../WorkBenchModals/NewProjectModal";

function TransformationLeftColumn({ sidebarOpen, setTransformationView }) {
  const [isAddProjectModelOpen, setIsProjectModelOpen] = React.useState(null);
  return (
    <div style={{ marginRight: "2px" }}>
      <SideNav
        style={{
          position: "absolute",
          left: sidebarOpen ? "288px" : "96px",
          top: "136px",
          height: "52.5rem",
          zIndex: "0",
        }}
      >
        <style>
          {`
        .cds--side-nav__item::marker {
          content: none;
        }
        `}
        </style>
        <div className="flex_between" style={{ margin: "15px" }}>
          <h4>Project List</h4>
          <Button
            renderIcon={Add}
            hasIconOnly
            iconDescription="New"
            tooltipPosition="left"
            kind="tertiary"
            size="sm"
            onClick={() => {
              setIsProjectModelOpen(true);
            }}
          />
        </div>
        <SideNavMenu
          renderIcon={Folder}
          title="Project Name 01"
          defaultExpanded
          onClick={(e) => {
            // e.stopPropagation();
            alert("hello");
          }}
        >
          <div style={{ marginLeft: "20px" }}>
            <SideNavMenu
              renderIcon={Folder}
              title="Transformation"
              defaultExpanded
            >
              <SideNavMenuItem onClick={() => setTransformationView(true)}>
                <div className="display_flex">
                  <Document />
                  Transform 1
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem onClick={() => setTransformationView(true)}>
                <div className="display_flex">
                  <Document />
                  Transform 2
                </div>
              </SideNavMenuItem>
            </SideNavMenu>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <SideNavMenu
              renderIcon={Folder}
              title="Data Validations"
              defaultExpanded
            >
              <SideNavMenuItem>
                <div className="display_flex">
                  <Document />
                  Validation 1
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem>
                <div className="display_flex">
                  <Document />
                  Validation 2
                </div>
              </SideNavMenuItem>
            </SideNavMenu>
          </div>
        </SideNavMenu>
        <SideNavMenu renderIcon={Folder} title="Project Name 01">
          <div style={{ marginLeft: "20px" }}>
            <SideNavMenu
              renderIcon={Folder}
              title="Transformation"
              defaultExpanded
            >
              <SideNavMenuItem>
                <div className="display_flex">
                  <Document />
                  Transform 1
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem>
                <div className="display_flex">
                  <Document />
                  Transform 2
                </div>
              </SideNavMenuItem>
            </SideNavMenu>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <SideNavMenu
              renderIcon={Folder}
              title="Data Validations"
              defaultExpanded
            >
              <SideNavMenuItem>
                <div className="display_flex">
                  <Document />
                  Validation 1
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem>
                <div className="display_flex">
                  <Document />
                  Validation 2
                </div>
              </SideNavMenuItem>
            </SideNavMenu>
          </div>
        </SideNavMenu>
      </SideNav>
      {isAddProjectModelOpen && (
        <NewProjectModal
          setIsAddModalOpen={setIsProjectModelOpen}
          isAddModalOpen={isAddProjectModelOpen}
        />
      )}
    </div>
  );
}

export default TransformationLeftColumn;
