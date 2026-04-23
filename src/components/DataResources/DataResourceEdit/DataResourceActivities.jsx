import React from "react";
import { DotMark, UserFilled } from "@carbon/icons-react";
import { formatDateTime } from "../../../utils/formatDateTime";
import { useDataResourceActivitiesById } from "hooks/dataresources/useDataResourceActivitiesById";

function DataResourceActivities({ selectedDataResourceId }) {
  const { data: dataActivities } = useDataResourceActivitiesById(
    selectedDataResourceId
  );

  return (
    <ul className={"custom-list"}>
      {dataActivities?.map((activity) => (
        <li>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: "12rem",
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
                  {formatDateTime(activity.activityAt)}
                </p>
              </div>
              <div style={{ paddingTop: "28px" }}>
                <h6>{activity.activityType}</h6>
                <p>{activity.description}</p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "12rem",
                gap: "5px",
              }}
            >
              <UserFilled style={{ color: "gray" }} />
              <p style={{ color: "#161616" }}>{activity.user}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default DataResourceActivities;
