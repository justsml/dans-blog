import React from "react";
import "./LineChangeIndicator.css";

export const LineChangeIndicator = ({
  additions,
  deletions,
}: {
  additions?: number;
  deletions?: number;
}) => {
  return (
    <div className="line-change-indicator">
      <div
        className="gh-activity added"
        data-additions={additions}
      >
        <span className="activity-line added">
          {additions != null && additions > 0 ? `+${additions}` : ""}
        </span>
        {/* <aside className="activity-box added" /> */}
      </div>
      <div
        className="gh-activity removed"
        data-deletions={deletions}
        style={{
          "--activity-bg-color": "#f85149",
        }}
      >
        {/* <aside className="activity-box removed" /> */}
        <span className="activity-line removed">{`${deletions != null && deletions > 0 ? ` -${deletions}` : ""}`}</span>
      </div>
    </div>
  );
};

// interface LineChangeIndicatorProps {
//   addedLines: number;
//   removedLines: number;
//   maxBars?: number;
// }

// const LineChangeIndicator: FC<LineChangeIndicatorProps> = ({
//   addedLines,
//   removedLines,
//   maxBars = 5
// }) => {
//   const total = addedLines + removedLines;
//   const addedCount = Math.round((addedLines / (total || 1)) * maxBars);
//   const removedCount = Math.round((removedLines / (total || 1)) * maxBars);

//   const addedBars = Array(addedCount).fill('green');
//   const removedBars = Array(removedCount).fill('red');

//   return (
//     <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'sans-serif', color: '#ccc' }}>
//       <span style={{ marginRight: '8px' }}>
//         {`+${addedLines}${removedLines > 0 ? ` -${removedLines}` : ''}`}
//       </span>
//       {addedBars.map((color, i) => (
//         <div
//           key={`added-${i}`}
//           style={{
//             width: '10px',
//             height: '10px',
//             backgroundColor: color,
//             marginRight: '2px',
//             borderRadius: '2px'
//           }}
//         />
//       ))}
//       {removedBars.map((color, i) => (
//         <div
//           key={`removed-${i}`}
//           style={{
//             width: '10px',
//             height: '10px',
//             backgroundColor: color,
//             marginRight: '2px',
//             borderRadius: '2px'
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default LineChangeIndicator;
