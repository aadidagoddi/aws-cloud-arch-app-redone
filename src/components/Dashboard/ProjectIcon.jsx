import React from "react";
import { PROJECT_STATUS } from "../../store/projectStore";

function ProjectIcon({ status, icon }) {
  // Empty cloud for new projects
  const renderNewCloud = () => (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
      <path
        d="M30 50C30 41.7157 36.7157 35 45 35C45 26.7157 51.7157 20 60 20C68.2843 20 75 26.7157 75 35C83.2843 35 90 41.7157 90 50C90 58.2843 83.2843 65 75 65H45C36.7157 65 30 58.2843 30 50Z"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="4 4"
        fill="none"
      />
    </svg>
  );

  // Cloud with construction elements
  const renderInProgressCloud = () => (
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
      {/* Cloud outline */}
      <path
        d="M30 50C30 41.7157 36.7157 35 45 35C45 26.7157 51.7157 20 60 20C68.2843 20 75 26.7157 75 35C83.2843 35 90 41.7157 90 50C90 58.2843 83.2843 65 75 65H45C36.7157 65 30 58.2843 30 50Z"
        stroke="#f59e0b"
        strokeWidth="2"
        fill="none"
      />

      {/* Crane */}
      <g transform="translate(70, 30)">
        <line x1="0" y1="0" x2="0" y2="30" stroke="#f59e0b" strokeWidth="2" />
        <line x1="0" y1="0" x2="20" y2="0" stroke="#f59e0b" strokeWidth="2" />
        <line x1="20" y1="0" x2="20" y2="10" stroke="#f59e0b" strokeWidth="1" />
        <rect x="18" y="10" width="4" height="4" fill="#f59e0b" />
      </g>

      {/* Scaffolding */}
      <g transform="translate(35, 40)">
        <rect
          x="0"
          y="0"
          width="25"
          height="20"
          stroke="#f59e0b"
          strokeWidth="1.5"
          fill="none"
        />
        <line x1="8" y1="0" x2="8" y2="20" stroke="#f59e0b" strokeWidth="1" />
        <line x1="17" y1="0" x2="17" y2="20" stroke="#f59e0b" strokeWidth="1" />
        <line x1="0" y1="7" x2="25" y2="7" stroke="#f59e0b" strokeWidth="1" />
        <line x1="0" y1="14" x2="25" y2="14" stroke="#f59e0b" strokeWidth="1" />
      </g>
    </svg>
  );

  // Partially colored cloud (based on icon data)
  const renderMVPCloud = () => {
    const colors = icon?.colors || ["#3b82f6", "#06b6d4", "#0ea5e9"];

    return (
      <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
        {/* Cloud with gradient */}
        <defs>
          <linearGradient
            id="cloudGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            {colors.map((color, i) => (
              <stop
                key={i}
                offset={`${(i / colors.length) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>

        <path
          d="M30 50C30 41.7157 36.7157 35 45 35C45 26.7157 51.7157 20 60 20C68.2843 20 75 26.7157 75 35C83.2843 35 90 41.7157 90 50C90 58.2843 83.2843 65 75 65H45C36.7157 65 30 58.2843 30 50Z"
          fill="url(#cloudGradient)"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Pipes coming in and out */}
        <g>
          {/* Input pipes */}
          <line
            x1="10"
            y1="45"
            x2="30"
            y2="45"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          <line
            x1="15"
            y1="55"
            x2="30"
            y2="55"
            stroke="#3b82f6"
            strokeWidth="3"
          />

          {/* Output pipes */}
          <line
            x1="90"
            y1="45"
            x2="110"
            y2="45"
            stroke="#10b981"
            strokeWidth="3"
          />
          <line
            x1="90"
            y1="55"
            x2="105"
            y2="55"
            stroke="#10b981"
            strokeWidth="3"
          />

          {/* Pipe endpoints */}
          <circle cx="10" cy="45" r="3" fill="#3b82f6" />
          <circle cx="15" cy="55" r="3" fill="#3b82f6" />
          <circle cx="110" cy="45" r="3" fill="#10b981" />
          <circle cx="105" cy="55" r="3" fill="#10b981" />
        </g>
      </svg>
    );
  };

  // Full colored cloud with active pipes
  const renderRunningCloud = () => {
    const colors = icon?.colors || ["#10b981", "#059669", "#047857"];

    return (
      <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
        <defs>
          <linearGradient
            id="runningGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            {colors.map((color, i) => (
              <stop
                key={i}
                offset={`${(i / colors.length) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>

          {/* Animated dash for flowing pipes */}
          <style>
            {`
              @keyframes dash {
                to {
                  stroke-dashoffset: -20;
                }
              }
              .flow-line {
                animation: dash 1s linear infinite;
              }
            `}
          </style>
        </defs>

        <path
          d="M30 50C30 41.7157 36.7157 35 45 35C45 26.7157 51.7157 20 60 20C68.2843 20 75 26.7157 75 35C83.2843 35 90 41.7157 90 50C90 58.2843 83.2843 65 75 65H45C36.7157 65 30 58.2843 30 50Z"
          fill="url(#runningGradient)"
          stroke="#10b981"
          strokeWidth="2"
        />

        {/* Active pipes with flow animation */}
        <g>
          <line
            x1="10"
            y1="45"
            x2="30"
            y2="45"
            stroke="#3b82f6"
            strokeWidth="3"
            className="flow-line"
            strokeDasharray="10 5"
          />
          <line
            x1="15"
            y1="55"
            x2="30"
            y2="55"
            stroke="#3b82f6"
            strokeWidth="3"
            className="flow-line"
            strokeDasharray="10 5"
          />
          <line
            x1="90"
            y1="45"
            x2="110"
            y2="45"
            stroke="#10b981"
            strokeWidth="3"
            className="flow-line"
            strokeDasharray="10 5"
          />
          <line
            x1="90"
            y1="55"
            x2="105"
            y2="55"
            stroke="#10b981"
            strokeWidth="3"
            className="flow-line"
            strokeDasharray="10 5"
          />

          <circle cx="10" cy="45" r="3" fill="#3b82f6" />
          <circle cx="15" cy="55" r="3" fill="#3b82f6" />
          <circle cx="110" cy="45" r="3" fill="#10b981" />
          <circle cx="105" cy="55" r="3" fill="#10b981" />
        </g>

        {/* Activity indicator */}
        <circle cx="60" cy="45" r="4" fill="#fbbf24">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    );
  };

  const renderIcon = () => {
    switch (status) {
      case PROJECT_STATUS.NEW:
        return renderNewCloud();
      case PROJECT_STATUS.IN_PROGRESS:
        return renderInProgressCloud();
      case PROJECT_STATUS.MVP:
        return renderMVPCloud();
      case PROJECT_STATUS.RUNNING:
        return renderRunningCloud();
      default:
        return renderNewCloud();
    }
  };

  return <div className="relative">{renderIcon()}</div>;
}

export default ProjectIcon;
