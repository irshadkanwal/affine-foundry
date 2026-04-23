import Loading from "components/Loading";
import { useJobs } from "hooks/workflow/useJobs";
import React from "react";

const transformStatuses = (jobs) => {
  const statusCounts = {
    Failed: 0,
    Succeeded: 0,
    Pending: 0,
    Running: 0,
  };

  jobs?.forEach((job) => {
    const status = job.lastRunStatus === "N/A" ? "Pending" : job.lastRunStatus;

    if (status === "fail") {
      statusCounts["Failed"]++;
    } else if (status === "success") {
      statusCounts["Succeeded"]++;
    } else if (status === "Pending") {
      statusCounts["Pending"]++;
    } else if (status === "running") {
      statusCounts["Running"]++;
    }
  });
  return [
    { label: "Failed", count: statusCounts["Failed"], color: "#FA4D56" },
    { label: "Pending", count: statusCounts["Pending"], color: "#F1C21B" },
    {
      label: "Succeeded",
      count: statusCounts["Succeeded"],
      color: "#42BE65",
    },
    { label: "Running", count: statusCounts["Running"], color: "#E0E0E0" },
  ];
};

const IngestionCard = ({ className = "" }) => {
  const barColors = ["#FA4D56", "#F1C21B", "#42BE65", "#E0E0E0"];
  const { data: jobsData, isLoading: isJobsDataLoading } = useJobs();

  const statuses = transformStatuses(jobsData);

  return (
    <>
      <div className={`landing-page-card ${className}`}>
        <div className="landing-page-card-header">
          <p>Ingestion SLA</p>
        </div>
        <div className="landing-page-card-body">
          {isJobsDataLoading ? (
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
              <div>
                <h2
                  style={{
                    marginLeft: "20px",
                    fontSize: "32px",
                    lineHeight: "40px",
                    fontWeight: 300,
                  }}
                >
                  {jobsData?.length}
                </h2>
                <div
                  style={{
                    display: "flex",
                    height: "10px",
                    width: "90%",
                    margin: "15px",
                  }}
                >
                  {barColors.map((color, index) => (
                    <div
                      key={index}
                      style={{
                        flex: 1,
                        backgroundColor: color,
                        border: "1px solid #ccc",
                      }}
                    ></div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginLeft: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {statuses.map((status, index) => (
                      <div
                        key={index}
                        style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: status.color,
                          marginRight: "5px",
                          marginTop: "15px",
                        }}
                      ></div>
                    ))}
                  </div>
                  <div>
                    {statuses.map((status, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          marginTop: "10px",
                          fontSize: "12px",
                          gap: "5px",
                          lineHeight: "16px",
                        }}
                      >
                        <div>{`${status.label}`}</div>
                        <div>{`(${status.count})`}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <h4
                style={{
                  marginLeft: "15px",
                  marginTop: "15px",
                  marginBottom: "15px",
                  letterSpacing: "0.16px",
                  lineHeight: "20px",
                  fontSize: "18px",
                }}
              >
                Ingestion Job
              </h4>
              <div>
                <div className="landing-page-card-body package_list">
                  {jobsData?.slice(0, 5).map((item, index) => (
                    <div key={item.id}>
                      <div
                        className="package_list_item"
                        style={{
                          padding: index === 0 && "0 15px 10px 15px",
                        }}
                      >
                        {item.name}
                      </div>
                      {jobsData?.slice(0, 5).length - 1 !== index && (
                        <div className="card_custom_hr"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default IngestionCard;
