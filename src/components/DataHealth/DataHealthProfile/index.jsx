import React from "react";
import { Button, Dropdown, Grid, ToastNotification } from "@carbon/react";
import { Add, DataClass } from "@carbon/react/icons";
import { useDataResourceProfileHeaderById } from "hooks/dataresources/useResourceProfileHeaderById";
import { useDataResource } from "hooks/dataresources/useDataResource";
import { useProfileDetailById } from "hooks/dataHealth/useProfileDetailsById";
import { useProfileHistogramById } from "hooks/dataHealth/useProfileHistogramById";
import { useProfileDataTypeById } from "hooks/dataHealth/useProfileDataTypeById";
import { useProfileSuggestionById } from "hooks/dataHealth/useProfileSuggestionById";
import { useProfileCorrelationsById } from "hooks/dataHealth/useProfileCorrelationsById";
import { useDataPackage } from "hooks/datapackage/useDataPackage";
import { useMostRecentActivity } from "hooks/useMostRecentActivity";
import { useDataClassbyLevel } from "hooks/dataclass/useDataClassbyLevel";
import { useDataClassMapping } from "hooks/dataHealth/dataClass/useDataClassMapping";
import { useAutoAssignClass } from "hooks/datapackage/useAutoAssignClass";
import { useAutoGenerateRules } from "hooks/datapackage/useAutoGenerateRules";
import { sortArraybyProp } from "utils/sortArrayByProp";
import DataHealthLeftColumn from "./DataHealthLeftColumn";
import DataHealthRightColumn from "./DataHealthRightColumn";
import DataClassModal from "./DataClassModal";
import DataHealthProfileCorrelation from "./DataHealthProfileCorrelation";
import Loading from "components/Loading";
import "./DataHealthProfile.scss";
import DataConstraints from "./DataConstraints";

/*
    For top level component with pop over search fields
    filteredData should look something like 
    {
      primaryListItemID: ...any primary listid,
      secondaryListItemID: ...any secondary list id
    }
  */
const NotificationContent = ({
  kind,
  caption = "The request has been fulfilled and resulted in a new resource being created.",
  title,
  timeout = 2000,
}) => {
  return (
    <ToastNotification
      aria-label="closes notification"
      caption={caption}
      kind={kind}
      timeout={timeout}
      style={{
        marginRight: "-5px",
        position: "absolute",
        right: "36px",
        zIndex: "3",
        top: "59px",
      }}
      lowContrast
      onClose={function noRefCheck() {}}
      onCloseButtonClick={function noRefCheck() {}}
      statusIconDescription="notification"
      title={title}
    />
  );
};

function DataHealthProfile({ sidebarOpen }) {
  const [selectedDataPackage, setSelectedDataPackage] = React.useState(null);
  const [selectedDataResource, setSelectedResource] = React.useState(null);
  const [selectedProfileKey, setSelectedProfileKey] = React.useState(null);
  const [selectFirstColumn, setSelectFirstColumn] = React.useState(true);
  const [selectedColumn, setSelectColumn] = React.useState(null);
  const [showDataClassModal, setShowDataClassModal] = React.useState(null);
  const [sliderValue, setSliderValue] = React.useState([0, 100]);
  const [isDataConstaintsOpen, setIsDataConstaintsOpen] = React.useState(false);

  const { data: dataRecources = [] } = useDataResource();
  const { data: mostRecentActivity } = useMostRecentActivity();
  const { data: dataPackage } = useDataPackage();
  const {
    data: dataClassByLevel2 = [],
    isLoading: dataClassLoading,
    refetch: refetchDataClass2,
  } = useDataClassbyLevel(2);
  const {
    data: dataClassMapping = [],
    refetch: refetchDataClassMapping,
    isLoading: isDataClassMappingLoading,
  } = useDataClassMapping();

  const filteredDataResources = dataRecources?.filter(
    (data) =>
      data.dataPackage?.id ===
      (selectedDataPackage
        ? selectedDataPackage
        : mostRecentActivity?.dataPackageId)
  );

  const { data: dataResourceProfileHeaderById = [] } =
    useDataResourceProfileHeaderById(
      selectedDataResource || filteredDataResources[0]?.id
    );

  const { data: correlationData, isLoading: isCorrelationLoading } =
    useProfileCorrelationsById(
      selectedProfileKey || dataResourceProfileHeaderById[0]?.profileKey
    );

  const {
    data: profileDataValues = [],
    isLoading: isDataProfileDetailsLoading,
  } = useProfileDetailById(
    selectedProfileKey || dataResourceProfileHeaderById[0]?.profileKey
  );

  const profileData = React.useMemo(() => {
    return profileDataValues?.filter(
      (profile) =>
        profile?.completeness * 100 >= sliderValue[0] &&
        profile?.completeness * 100 <= sliderValue[1]
    );
  }, [profileDataValues, sliderValue]);

  const {
    data: profileSuggestionsData,
    isLoading: isProfileSuggestionsLoading,
  } = useProfileSuggestionById(
    selectFirstColumn
      ? profileData[0]?.profileDetailKey
      : selectedColumn?.profileDetailKey
  );

  const { data: profileDetailsHistogram } = useProfileHistogramById(
    selectFirstColumn
      ? profileData[0]?.profileDetailKey
      : selectedColumn?.profileDetailKey
  );

  const { data: profileDetailDataType } = useProfileDataTypeById(
    selectFirstColumn
      ? profileData[0]?.profileDetailKey
      : selectedColumn?.profileDetailKey
  );
  const { mutateAsync: autoAssignClass, status: autoAssignStatus } =
    useAutoAssignClass();
  const { status: autoGenerateRulesStatus, mutateAsync: autoGenerateRules } =
    useAutoGenerateRules();

  const dataClassLevel2 = sortArraybyProp(dataClassByLevel2);

  return !isDataConstaintsOpen ? (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ paddingBottom: "25px" }}>Data Health Profile</h3>
          <div
            style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
          >
            <Button
              kind="secondary"
              onClick={() => setIsDataConstaintsOpen(true)}
            >
              Data Constraints
            </Button>
            <Button
              onClick={async () => {
                await autoAssignClass({
                  dataPackageId: selectedDataPackage
                    ? selectedDataPackage
                    : mostRecentActivity?.dataPackageId,
                });
              }}
              renderIcon={DataClass}
              disabled={
                selectedDataPackage
                  ? !selectedDataPackage
                  : !mostRecentActivity?.dataPackageId
              }
            >
              Auto Assign Class
            </Button>
            <Button
              onClick={async () => {
                await autoGenerateRules({
                  dataPackageId: selectedDataPackage
                    ? selectedDataPackage
                    : mostRecentActivity?.dataPackageId,
                });
              }}
              renderIcon={Add}
              disabled={
                selectedDataPackage
                  ? !selectedDataPackage
                  : !mostRecentActivity?.dataPackageId
              }
            >
              Auto Generate Rules
            </Button>
          </div>
        </div>
        {autoAssignStatus === "success" ? (
          <NotificationContent title={"Auto Assign Class"} kind="success" />
        ) : (
          autoAssignStatus === "error" && (
            <NotificationContent
              title={"Auto Assign Class"}
              kind="error"
              caption="Failed to process the request."
            />
          )
        )}
        {autoGenerateRulesStatus === "success" ? (
          <NotificationContent title={"Auto Generate Rules"} kind="success" />
        ) : (
          autoGenerateRulesStatus === "error" && (
            <NotificationContent
              title={"Auto Generate Rules"}
              kind="error"
              caption="Failed to process the request."
            />
          )
        )}

        <div className="flex_between" style={{ gap: "2%" }}>
          <div style={{ flexGrow: 1 }}>
            <Dropdown
              aria-label="Dropdown"
              id="carbon-dropdown-package"
              items={dataPackage || []}
              onChange={({ selectedItem }) => {
                setSelectedDataPackage(selectedItem?.id);
                setSelectedResource(null);
                setSelectedProfileKey(null);
                setSelectFirstColumn(true);
              }}
              itemToString={(value) => value?.name}
              label={
                dataPackage?.length ? "Choose an option" : "No Packages Found"
              }
              titleText="Data Package"
            />
          </div>
          <div style={{ flexGrow: 1 }}>
            <Dropdown
              aria-label="Dropdown"
              id="carbon-dropdown-resource"
              items={filteredDataResources}
              selectedItem={
                selectedDataResource
                  ? {
                      name: filteredDataResources?.filter(
                        (data) => data?.id === selectedDataResource
                      )[0].name,
                    }
                  : ""
              }
              disabled={
                selectedDataPackage || mostRecentActivity?.dataPackageId
                  ? false
                  : true
              }
              onChange={({ selectedItem }) => {
                setSelectedResource(selectedItem?.id);
                setSelectedProfileKey(null);
                // setSelectColumn(PRE_SELECTED_COL);
                setSelectFirstColumn(true);
              }}
              itemToString={(value) => value?.name}
              label={
                filteredDataResources?.length
                  ? "Choose an option"
                  : "No Resources Found"
              }
              titleText="Data Resource"
            />
          </div>
          <div style={{ flexGrow: 1 }}>
            <Dropdown
              aria-label="Dropdown"
              id="carbon-dropdown-profile-headers"
              items={dataResourceProfileHeaderById}
              selectedItem={
                selectedProfileKey
                  ? {
                      profileTitle: dataResourceProfileHeaderById?.filter(
                        (data) => data?.profileKey === selectedProfileKey
                      )[0].profileTitle,
                    }
                  : ""
              }
              disabled={selectedDataResource ? false : true}
              onChange={({ selectedItem }) => {
                setSelectedProfileKey(selectedItem?.profileKey);
                // setSelectColumn(PRE_SELECTED_COL);
                setSelectFirstColumn(true);
              }}
              itemToString={(value) => value?.profileTitle}
              label={
                dataResourceProfileHeaderById?.length
                  ? "Choose an option"
                  : "No Profile Headers Found"
              }
              titleText="Profile Headers"
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <DataHealthLeftColumn
          sidebarOpen={sidebarOpen}
          columnData={profileData}
          setSelectFirstColumn={setSelectFirstColumn}
          setShowDataClassModal={setShowDataClassModal}
          setSelectColumn={setSelectColumn}
          isLoading={isDataProfileDetailsLoading}
          selectColumn={selectFirstColumn ? profileData[0] : selectedColumn}
        />
        <div style={{ marginLeft: "170px", width: "100%", marginTop: "29px" }}>
          <DataHealthRightColumn
            correlationData={correlationData}
            dataResourceProfileHeaderById={dataResourceProfileHeaderById}
            selectedColumn={selectFirstColumn ? profileData[0] : selectedColumn}
            dataClassMapping={dataClassMapping}
            dataClassLevel2={dataClassLevel2}
            valueDistributionData={profileDetailsHistogram}
            dataTypeValues={profileDetailDataType}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
          />
        </div>
      </div>
      {showDataClassModal && (
        <DataClassModal
          isOpen={showDataClassModal}
          allDataClassMapping={dataClassMapping}
          modalHeading={"Assign Data Class"}
          refetchDataClass2={refetchDataClass2}
          refetchDataClassMapping={refetchDataClassMapping}
          isDataClassMappingLoading={isDataClassMappingLoading}
          buttonText={"Save"}
          secondaryButtonText={"Cancel"}
          selectedColumn={
            showDataClassModal !== true &&
            typeof showDataClassModal === "string"
              ? showDataClassModal
              : null
          }
          dataClassLevel2={dataClassLevel2}
          dataResourceId={selectedDataResource || filteredDataResources[0]?.id}
          columns={profileData}
          dataClassLoading={dataClassLoading}
          onRequestClose={() => setShowDataClassModal(false)}
        />
      )}
      {isCorrelationLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        <>
          <Grid className="correlation_table">
            <DataHealthProfileCorrelation correlationData={correlationData} />
          </Grid>
        </>
      )}
    </>
  ) : isProfileSuggestionsLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading />
    </div>
  ) : (
    <DataConstraints
      setIsDataConstaintsOpen={setIsDataConstaintsOpen}
      profileSuggestionsData={profileSuggestionsData}
    />
  );
}

export default DataHealthProfile;
