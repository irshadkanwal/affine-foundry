import React from "react";
import { useRanger } from "react-ranger";

const RangeSlider = ({ setSliderValue, sliderValue }) => {
  const { getTrackProps, segments, handles } = useRanger({
    min: 0,
    max: 100,
    stepSize: 10,
    values: sliderValue,
    onDrag: setSliderValue,
  });

  return (
    <div style={{ marginTop: "5px" }}>
      <div
        {...getTrackProps({
          style: {
            height: "10px",
            background: "#cacaca",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,.6)",
          },
        })}
      >
        {segments.map(({ getSegmentProps }, i) => (
          <div
            key={i}
            className={`custom-segment segment-${i}`}
            {...getSegmentProps()}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${(sliderValue[i] / 100) * 100}%`,
              right: `${((100 - sliderValue[i + 1]) / 100) * 100}%`,
              background: "#0f62fe",
            }}
          />
        ))}
        {handles.map(({ getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                width: "14px",
                height: "14px",
                outline: "none",
                cursor: "pointer",
                background: "linear-gradient(to bottom, #eee 45%, #ddd 55%)",
                border: "solid 1px #888",
              },
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default RangeSlider;
