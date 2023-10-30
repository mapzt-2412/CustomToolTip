import React, { memo } from "react";
// tooltip.js
const GraphTooltip = ({ data, position, visibility }) => {
  return (
    <div
      className={`absolute px-4 py-3.5 rounded-lg shadow-lg bg-chart-label-gradient text-white overflow-hidden transition-all duration-300 hover:!visible
      ${visibility ? "visible" : "invisible"}
        `}
      style={{
        position: "absolute",
        top: position?.top,
        left: position?.left,
      }}
    >
      {data && (
        <>
          <h5 className="w-full mb-1.5 block text-[12px] uppercase">
            {data.title}
          </h5>

          <ul className="divide-y divide-gray-100/60">
            {data.dataPoints.map((val, index) => {
              return (
                <li
                  key={index}
                  className="m-0 py-1.5 text-base font-rubik font-medium text-left capitalize last:pb-0"
                >
                  {val?.dataset.label}
                  {":"} {val?.raw}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default memo(GraphTooltip);