import React from "react";
import { Button, Loading, Modal } from "@carbon/react";
import {
  CheckmarkFilled,
  ErrorFilled,
  PauseOutlineFilled,
  SendFilled,
  ValueVariable,
  ProgressBarRound,
} from "@carbon/react/icons";
import { capitalizeFirstLetter } from "utils/capitalizeFirstLetter";
function JobRunDetailsModal({
  isJobRunDetailOpen,
  setIsJobRunDetailOpen,
  jobById,
}) {
  return (
    <Modal
      open={isJobRunDetailOpen}
      modalHeading="Job Run Details"
      passiveModal
      size="sm"
      onRequestClose={() => setIsJobRunDetailOpen(false)}
    >
      <div style={{ fontWeight: "bold" }}>
        <div style={{ paddingBottom: "20px" }}>
          <p style={{ paddingBottom: "5px" }}>Job Name</p>
          <p style={{ fontWeight: "bold" }}>{jobById?.name}</p>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <p style={{ paddingBottom: "5px" }}>Started</p>
          <p style={{ fontWeight: "bold" }}>
            {jobById?.createdAt ? jobById?.createdAt : "- -"}
          </p>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <p style={{ paddingBottom: "5px" }}>Ended</p>
          <p style={{ fontWeight: "bold" }}>
            {jobById?.finishedAt ? jobById?.finishedAt : "- -"}
          </p>
        </div>
        <div style={{ paddingBottom: "20px" }}>
          <p style={{ paddingBottom: "5px" }}>Duration</p>
          <p style={{ fontWeight: "bold" }}>
            {jobById?.duration ? jobById?.duration : "- -"}
          </p>
        </div>
        <div>
          <p style={{ marginBottom: "10px" }}>Status</p>
          <div>
            {jobById.lastRunStatus === "error" ? (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <PauseOutlineFilled color={"orange"} />
                {capitalizeFirstLetter(jobById.lastRunStatus)}
              </div>
            ) : jobById.lastRunStatus === "running" ? (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <div className="display_flex">
                  <Loading
                    description="Active loading indicator"
                    withOverlay={false}
                    small
                  />
                  {capitalizeFirstLetter(jobById.lastRunStatus)}
                  <Button kind="ghost">Cancel</Button>
                </div>
              </div>
            ) : jobById.lastRunStatus === "success" ? (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <CheckmarkFilled color={"green"} />
                {capitalizeFirstLetter(jobById.lastRunStatus)}
              </div>
            ) : jobById.lastRunStatus === "starting" ? (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <ProgressBarRound color={"dodgerblue"} />

                {capitalizeFirstLetter(jobById.lastRunStatus)}
              </div>
            ) : jobById.lastRunStatus === "fail" ? (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <ErrorFilled color={"red"} />
                {capitalizeFirstLetter(jobById.lastRunStatus)}
              </div>
            ) : jobById.lastRunStatus === "submitted" ? (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <SendFilled color={"blue"} />
                {capitalizeFirstLetter(jobById.lastRunStatus)}
              </div>
            ) : jobById.lastRunStatus === "dead" ? (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <ValueVariable color={"maroon"} />
                {capitalizeFirstLetter(jobById.lastRunStatus)}
              </div>
            ) : (
              <span>- -</span>
            )}
          </div>
          {/* <div className="display_flex">
            <Loading
            description="Active loading indicator"
            withOverlay={false}
            small
            />
            <p style={{ fontWeight: "bold", paddingLeft: "15px" }}>Running</p>
            <Button kind="ghost">Cancel</Button>
          </div> */}
        </div>
      </div>
    </Modal>
  );
}

export default JobRunDetailsModal;
