import React from "react";
import { Link } from "react-router-dom";
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  Theme,
  SideNavLink,
} from "@carbon/react";
import {
  Home,
  DataVis_2 as DataVis2,
  Settings,
  HealthCross,
  Workspace,
  CalculationAlt,
  Data_1 as Data1,
  DataTableReference,
  Application,
  Datastore,
  SoftwareResourceCluster,
  ZSystems,
  BatchJob,
  Run,
  CloudMonitoring,
  DataQualityDefinition,
  InventoryManagement,
  IbmCloudPakMantaAutomatedDataLineage,
  DataClass,
  Notebook,
} from "@carbon/react/icons";
import {
  DATA_HEALTH,
  WORKFLOW,
  DATA_MANAGEMENT,
  WORK_BENCH,
} from "../../routeConstants";

function SideNavBar({
  isSideNavExpanded,
  active,
  setActive,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <Theme theme="white">
      <SideNav
        style={{ width: !sidebarOpen ? "50px" : "" }}
        aria-label="Side navigation"
        expanded={isSideNavExpanded}
        className="sidenav__bar"
      >
        <SideNavItems>
          <Link to="/" style={{ textDecoration: "none" }}>
            <SideNavLink
              renderIcon={Home}
              isActive={active.activeItem === "/"}
              onClick={() => {
                setActive({ activeItem: "/" });
                setSidebarOpen(true);
              }}
            >
              Home
            </SideNavLink>
          </Link>
          <Link
            to={DATA_MANAGEMENT.dataBucket}
            style={{ textDecoration: "none" }}
            onClick={() => {
              setSidebarOpen(true);
            }}
          >
            <SideNavMenu
              renderIcon={DataVis2}
              title="Data Management"
              defaultExpanded={sidebarOpen}
            >
              <SideNavMenuItem
                element={Link}
                to="/data-management/data-bucket"
                isActive={active.activeItem === "/data-management/data-bucket"}
                onClick={() => {
                  setActive({
                    activeItem: "/data-management/data-bucket",
                  });
                }}
              >
                <div className="display_flex">
                  <Datastore />
                  Data Bucket
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem
                element={Link}
                to="/data-management/data-package"
                isActive={active.activeItem === "/data-management/data-package"}
                onClick={() => {
                  setActive({
                    activeItem: "/data-management/data-package",
                  });
                }}
              >
                <div className="display_flex">
                  <Data1 />
                  Data Package
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem
                element={Link}
                to="/data-management/data-resource"
                isActive={
                  active.activeItem === "/data-management/data-resource"
                }
                onClick={() => {
                  setActive({
                    activeItem: "/data-management/data-resource",
                  });
                }}
              >
                <div className="display_flex">
                  <SoftwareResourceCluster />
                  Data Resource
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem
                element={Link}
                to="/data-management/reference-data"
                isActive={
                  active.activeItem === "/data-management/reference-data"
                }
                onClick={() => {
                  setActive({
                    activeItem: "/data-management/reference-data",
                  });
                }}
              >
                <div className="display_flex">
                  <DataTableReference />
                  Reference Data
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem
                element={Link}
                to={DATA_MANAGEMENT.dataClasses}
                isActive={active.activeItem === DATA_MANAGEMENT.dataClasses}
                onClick={() => {
                  setActive({
                    activeItem: DATA_MANAGEMENT.dataClasses,
                  });
                }}
              >
                <div className="display_flex">
                  <DataClass />
                  Data Classes
                </div>
              </SideNavMenuItem>
            </SideNavMenu>
          </Link>
          <Link
            to="/computation-enviornment/applications"
            style={{ textDecoration: "none" }}
            onClick={() => {
              setSidebarOpen(true);
            }}
          >
            <SideNavMenu
              renderIcon={CalculationAlt}
              title="Computation Environment"
              defaultExpanded={sidebarOpen}
            >
              <SideNavMenuItem
                element={Link}
                to="/computation-enviornment/applications"
                isActive={
                  active.activeItem === "/computation-enviornment/applications"
                }
                onClick={() => {
                  setActive({
                    activeItem: "/computation-enviornment/applications",
                  });
                }}
              >
                <div className="display_flex">
                  <Application />
                  Applications
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem
                element={Link}
                to="/computation-enviornment/runtimes"
                isActive={
                  active.activeItem === "/computation-enviornment/runtimes"
                }
                onClick={() => {
                  setActive({
                    activeItem: "/computation-enviornment/runtimes",
                  });
                }}
              >
                <div className="display_flex">
                  <ZSystems />
                  Runtimes / Clusters
                </div>
              </SideNavMenuItem>
            </SideNavMenu>
          </Link>
          <Link
            to="/workflow/jobs"
            style={{ textDecoration: "none" }}
            onClick={() => {
              setSidebarOpen(true);
            }}
          >
            <SideNavMenu
              renderIcon={Workspace}
              title="Workflow"
              defaultExpanded={sidebarOpen}
            >
              <SideNavMenuItem
                element={Link}
                to={WORKFLOW.workflowJob}
                isActive={active.activeItem === WORKFLOW.workflowJob}
                onClick={() => {
                  setActive({
                    activeItem: WORKFLOW.workflowJob,
                  });
                }}
              >
                <div className="display_flex">
                  <BatchJob />
                  Jobs
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem
                element={Link}
                to={WORKFLOW.workflowJobRun}
                isActive={active.activeItem === WORKFLOW.workflowJobRun}
                onClick={() => {
                  setActive({
                    activeItem: WORKFLOW.workflowJobRun,
                  });
                }}
              >
                <div className="display_flex">
                  <Run />
                  Job Runs
                </div>
              </SideNavMenuItem>
              {/* <SideNavMenuItem
                element={Link}
                to={WORKFLOW.workflowTask}
                isActive={active.activeItem === WORKFLOW.workflowTask}
                onClick={() => {
                  setActive({
                    activeItem: WORKFLOW.workflowTask,
                  });
                }}
              >
                Tasks
              </SideNavMenuItem> */}
            </SideNavMenu>
          </Link>
          <Link
            to="/work-bench/transformation"
            style={{ textDecoration: "none" }}
            onClick={() => {
              setSidebarOpen(true);
            }}
          >
            <SideNavMenu
              renderIcon={Workspace}
              title="Work Bench"
              defaultExpanded={sidebarOpen}
            >
              <SideNavMenuItem
                element={Link}
                to={WORK_BENCH.workbook}
                isActive={active.activeItem === WORK_BENCH.workbook}
                onClick={() => {
                  setActive({
                    activeItem: WORK_BENCH.workbook,
                  });
                }}
              >
                <div className="display_flex">
                  <Notebook />
                  Workbook
                </div>
              </SideNavMenuItem>
            </SideNavMenu>
          </Link>
          <Link
            to="/data-health/data-health-profile"
            style={{ textDecoration: "none" }}
            onClick={() => {
              setSidebarOpen(true);
            }}
          >
            <SideNavMenu
              renderIcon={HealthCross}
              title="Data Health"
              defaultExpanded={sidebarOpen}
            >
              <SideNavMenuItem
                element={Link}
                to={DATA_HEALTH.dataHealthProfile}
                isActive={active.activeItem === DATA_HEALTH.dataHealthProfile}
                onClick={() => {
                  setActive({
                    activeItem: DATA_HEALTH.dataHealthProfile,
                  });
                }}
              >
                <div className="display_flex">
                  <CloudMonitoring />
                  Data Health Profiles
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem
                element={Link}
                to={DATA_HEALTH.dataQualityDashboard}
                isActive={
                  active.activeItem === DATA_HEALTH.dataQualityDashboard
                }
                onClick={() => {
                  setActive({
                    activeItem: DATA_HEALTH.dataQualityDashboard,
                  });
                }}
              >
                <div className="display_flex">
                  <DataQualityDefinition />
                  Data Quality
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem
                element={Link}
                to={DATA_HEALTH.dataInventory}
                isActive={active.activeItem === DATA_HEALTH.dataInventory}
                onClick={() => {
                  setActive({
                    activeItem: DATA_HEALTH.dataInventory,
                  });
                }}
              >
                <div className="display_flex">
                  <InventoryManagement />
                  Data Inventory
                </div>
              </SideNavMenuItem>
              <SideNavMenuItem
                element={Link}
                to={DATA_HEALTH.dataLineage}
                isActive={active.activeItem === DATA_HEALTH.dataLineage}
                onClick={() => {
                  setActive({
                    activeItem: DATA_HEALTH.dataLineage,
                  });
                }}
              >
                <div className="display_flex">
                  <IbmCloudPakMantaAutomatedDataLineage />
                  Data Lineage
                </div>
              </SideNavMenuItem>
            </SideNavMenu>
          </Link>
          <Link to="/user-settings" style={{ textDecoration: "none" }}>
            <SideNavLink
              renderIcon={Settings}
              isActive={active.activeItem === "/user-settings"}
              onClick={() => {
                setActive({ activeItem: "/user-settings" });
                setSidebarOpen(true);
              }}
            >
              User Settings / Preferences
            </SideNavLink>
          </Link>
        </SideNavItems>
      </SideNav>
    </Theme>
  );
}

export default SideNavBar;
