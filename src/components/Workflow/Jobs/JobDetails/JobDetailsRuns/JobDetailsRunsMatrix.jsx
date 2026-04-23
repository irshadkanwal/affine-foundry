import React from "react";
import JobDetailsRunsMatrixChart from "./JobDetailsRunsMatrixChart";
import { useTaskRun } from "hooks/workflow/useTaskRun";
import { useTaskNodes } from "hooks/workflow/useTasks";
import Loading from "components/Loading";
import { dateFormatChart } from "utils/formatDateTime";

function extractDay(timestamp) {
  try {
    return new Date(timestamp).toISOString().split("T")[0];
  } catch (error) {
    return timestamp;
  }
}
function getBackgroundColor(hasRun, isFailed, isSkipped) {
  if (hasRun) {
    if (!isFailed) {
      if (isSkipped) {
        return "rgba(15, 98, 254,.5)";
      } else {
        return "rgba(15, 98, 254, 1)";
      }
    } else {
      return "rgba(218, 30, 40,0.5)";
    }
  } else {
    return "rgb(218, 30, 40)";
  }
}

function JobDetailsRunsMatrix({ jobId }) {
  const [barWidth, setBarWidth] = React.useState(0);
  const { data: taskRun = [], isLoading: isTaskRunLoading } = useTaskRun();
  const { data: taskNodesData = [] } = useTaskNodes();

  const filteredTaskNodes = React.useMemo(() => {
    return taskNodesData?.filter((data) => data?.jobId === jobId);
  }, [jobId, taskNodesData]);

  const filteredTaskRuns = React.useMemo(() => {
    return taskRun?.filter((run) => {
      const taskId = run.taskId;
      return filteredTaskNodes.some((node) => node.id === taskId);
    });
  }, [filteredTaskNodes, taskRun]);

  //TODO
  // some task run objects does not have startedAt as property

  const groupedRunsByDays = React.useMemo(() => {
    const sortedTaskRunData = [...filteredTaskRuns].sort((a, b) => {
      return new Date(a.startedAt) - new Date(b.startedAt);
    });
    return sortedTaskRunData?.reduce((acc, entry) => {
      const startedAtDay = entry?.startedAt
        ? extractDay(entry?.startedAt)
        : "N/A";
      return {
        ...acc,
        [startedAtDay]: [...(acc[startedAtDay] || []), entry],
      };
    }, {});
  }, [filteredTaskRuns]);

  const timeDurationByGroupedRuns = React.useMemo(() => {
    return Object.keys(groupedRunsByDays)?.reduce((acc, day, index) => {
      const dayDuration = groupedRunsByDays[day]?.reduce((dayAcc, entry) => {
        const startedAt = new Date(entry?.startedAt);
        const finishedAt = new Date(entry?.finishedAt);
        const duration = (finishedAt - startedAt) / 1000 || 0;
        return dayAcc + duration;
      }, 0);

      const hasFailed = groupedRunsByDays[day]?.filter(
        (run) => run?.status === "fail"
      );
      const taskList = Object.values(groupedRunsByDays)?.map((task) =>
        task?.map((value) => ({ id: value?.taskId, status: value?.status }))
      );
      const dataForDay =
        hasFailed?.length !== 0
          ? {
              value: Math.floor(dayDuration),
              task: taskList[index],
              itemStyle: {
                color: `rgba(218, 30, 40, 1)`,
              },
              hasFailed: true,
              date: day !== "N/A" ? dateFormatChart(day, false) : "-- -- -- --",
            }
          : {
              value: Math.floor(dayDuration),
              task: taskList[index],
              date: day !== "N/A" ? dateFormatChart(day, false) : "-- -- -- --",
            };

      return { ...acc, [day]: dataForDay };
    }, {});
  }, [groupedRunsByDays]);

  return (
    <div
      style={{
        background: "white",
        width: "100%",
      }}
    >
      {isTaskRunLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className="flex_between"
            style={{ marginBottom: "-15px", gap: "11%" }}
          >
            <p
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "center",
                whiteSpace: "nowrap",
                marginLeft: "-45px",
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Run Total Duration
            </p>
            <JobDetailsRunsMatrixChart
              updateBarWidth={setBarWidth}
              chartData={timeDurationByGroupedRuns}
            />
          </div>
          <div
            className="flex_between"
            style={{
              background: "white",
              overflow: "auto",
              paddingBottom: "20px",
            }}
          >
            <p
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "center",
                width: "0.5%",
                marginLeft: "20px",
                fontWeight: "bold",
                color: "grey",
                marginTop: "1%",
              }}
            >
              Tasks
            </p>
            <div style={{ width: "99.5%" }}>
              {/* Added dummy Object for Date Row */}
              {[...filteredTaskNodes, { id: "date", name: "" }]?.map(
                (task, ind) => {
                  return (
                    <div key={ind} style={{ margin: "0 20px 2px 15px" }}>
                      <hr style={{ margin: "0 0 2px 0" }} />
                      <div style={{ gap: "", display: "flex" }}>
                        <p style={{ minWidth: "112px", maxWidth: "112px" }}>
                          {task?.name}
                        </p>
                        <div style={{ width: "12.35%" }} />
                        <div
                          style={{
                            width: "100%",
                            justifyContent: "space-around",
                            display: "flex",
                          }}
                        >
                          {Object?.values(timeDurationByGroupedRuns)?.map(
                            (val, index) => {
                              const hasRun = val?.task?.find(
                                (valueTask) => valueTask?.id === task?.id
                              );
                              const isFailed = val?.task?.find(
                                (valueTask) =>
                                  valueTask?.status === "fail" &&
                                  valueTask?.id === task?.id
                              );
                              const isSkipped = val?.task?.find(
                                (valueTask) =>
                                  valueTask?.status === "skipped" &&
                                  valueTask?.id === task?.id
                              );
                              return (
                                <div
                                  key={index}
                                  style={{
                                    height: "50px",
                                    position: "relative",
                                    width: barWidth / 1.45 + "px",
                                  }}
                                >
                                  {task?.id !== "date" ? (
                                    <div
                                      style={{
                                        height: "50px",
                                        width: "100%",
                                        backgroundColor: getBackgroundColor(
                                          hasRun,
                                          isFailed,
                                          isSkipped
                                        ),
                                      }}
                                    />
                                  ) : (
                                    <div style={{ position: "relative" }}>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          paddingTop: "10px",
                                        }}
                                      >
                                        {val?.date}
                                      </div>
                                      <div
                                        style={{
                                          position: "absolute",
                                          top: -4,
                                          left: "50%",
                                          transform: "translateX(-50%)",
                                          width: "1px",
                                          height: "5px",
                                          backgroundColor: "black",
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>
                        <div style={{ width: "1.45em" }} />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default JobDetailsRunsMatrix;
