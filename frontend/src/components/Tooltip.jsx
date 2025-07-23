// Tooltip.jsx
import React, { useState } from 'react';
import "./dash.css";

function Tooltip({ children, tooltipText }) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      {children}
      {isTooltipVisible && (
        <div className="tooltip">
          {tooltipText}
        </div>
      )}
    </div>
  );
}

export default Tooltip;