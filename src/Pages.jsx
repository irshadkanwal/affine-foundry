import React from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound";
import LandingPage from "./content/LandingPage";
import DataBucketTable from "./components/DataBuscketTable/DataBucketTable";
import DataConnector from "./components/DataConnector/DataConnector";
import DataPackage from "./components/DataPackage/DataPackage";
import DataResource from "./components/DataResources/DataResource";
import DataReference from "./components/ReferenceData/ReferenceData";
import Application from "./components/Application/Application";
import Runtimes from "./components/Runtimes/Runtimes";
import DataHealthProfile from "./components/DataHealth/DataHealthProfile";
import DataQualityDashboard from "./components/DataHealth/DataQualityDashboard";
import { DataInventory } from "./components/DataHealth/DataInventory/DataInventory";
import Jobs from "./components/Workflow/Jobs/Jobs";
import JobRuns from "./components/Workflow/JobRuns/JobRuns";
import Tasks from "components/Workflow/Tasks/Tasks";
import Transformation from "components/WorkBench/Transformation/Transformation";
import DataValidation from "components/WorkBench/DataValidation/DataValidation";
import DataClasses from "components/DataClasses/DataClasses";

import {
  DATA_HEALTH,
  WORKFLOW,
  WORK_BENCH,
  USER_SETTINGS,
  DATA_MANAGEMENT,
} from "./routeConstants";
import DataLineage from "components/DataHealth/DataLineage/DataLineage";
import UserSettings from "components/UserSettings/UserSettings";
import Workbook from "components/WorkBench/Workbook/Workbook";

function Pages({ sidebarOpen }) {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/data-management/data-bucket"
          element={<DataBucketTable />}
        />
        <Route
          path="/data-management/data-connectors"
          element={<DataConnector />}
        />
        <Route path="/data-management/data-package" element={<DataPackage />} />
        <Route
          path="/data-management/data-resource"
          element={<DataResource />}
        />
        <Route
          path="/data-management/reference-data"
          element={<DataReference />}
        />
        <Route path={DATA_MANAGEMENT.dataClasses} element={<DataClasses />} />
        <Route
          path="/computation-enviornment/applications"
          element={<Application />}
        />
        <Route
          path="/computation-enviornment/runtimes"
          element={<Runtimes />}
        />
        <Route path={WORKFLOW.workflowJob} element={<Jobs />} />
        <Route path={WORKFLOW.workflowJobRun} element={<JobRuns />} />
        <Route path={WORKFLOW.workflowTask} element={<Tasks />} />
        <Route
          path={WORK_BENCH.transformation}
          element={<Transformation sidebarOpen={sidebarOpen} />}
        />
        <Route path={WORK_BENCH.dataValidation} element={<DataValidation />} />
        <Route path={WORK_BENCH.workbook} element={<Workbook />} />
        <Route
          path={DATA_HEALTH.dataHealthProfile}
          element={<DataHealthProfile sidebarOpen={sidebarOpen} />}
        />
        <Route
          path={DATA_HEALTH.dataQualityDashboard}
          element={<DataQualityDashboard />}
        />
        <Route path={DATA_HEALTH.dataInventory} element={<DataInventory />} />
        <Route path="*" element={<NotFound />} />
        <Route path={DATA_HEALTH.dataLineage} element={<DataLineage />} />
        <Route path={USER_SETTINGS.userSettings} element={<UserSettings />} />
      </Routes>
    </React.Suspense>
  );
}

export default Pages;
