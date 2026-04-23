import React from "react";
import { DotMark, UserFilled } from "@carbon/icons-react";
import { formatDateTime } from "../../../utils/formatDateTime";
import { useDataPackageActivitiesById } from "hooks/datapackage/useDataPackageActivitiesById";

function DataPackageActivity({ selectedDataPackageId }) {
  // const { data: users } = useUsers();
  // const { data: dataActivities } = useDataActivity();
  // const { data: dataActivityTypes } = useDataActivityTypes();

  const { data: dataActivities } = useDataPackageActivitiesById(
    selectedDataPackageId
  );
  // const activities = dataActivities?.map((activity) => {
  //   const foundCollaborator = users?.find(
  //     (user) => user.id === activity.collaboratorId
  //   );
  //   const foundActivitytype = dataActivities?.find(
  //     (type) => type.id === activity.activityTypeId
  //   );
  //   return {
  //     activityAt: activity?.activityAt,
  //     activityDescription: activity?.description,
  //     userName: foundCollaborator?.name,
  //     activityName: foundActivitytype?.name,
  //     activityID: activity?.id,
  //   };
  // });
  // {
  //     "activityAt": "2023-06-21 17:51:02.173163",
  //     "activityType": "Create",
  //     "description": "Created new Data Package",
  //     "id": 3,
  //     "user": "Test1 Test1"
  // }
  return (
    <ul className={"custom-list"}>
      {dataActivities?.map((activity, index) => (
        <li key={index}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "120px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingRight: "12rem",
                  paddingTop: "17px",
                }}
              >
                <DotMark style={{ color: "green" }} size={20} />
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#525252",
                  }}
                >
                  {formatDateTime(activity?.activityAt)}
                </p>
              </div>
              <div style={{ paddingTop: "28px" }}>
                <h6
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  {activity.activityType}
                </h6>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  {activity.description}
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "12rem",
                gap: "5px",
                paddingTop: "14px",
              }}
            >
              <UserFilled style={{ color: "gray" }} />
              <p
                style={{ color: "#161616", fontSize: "12px", fontWeight: 400 }}
              >
                {activity.user}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default DataPackageActivity;
