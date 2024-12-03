import React, { useState, useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import "./Timer.css";

const Timer = ({ circleWidth, progress = 59 }) => {
  const radius = 85;
  const { toDoTime, selectedTask } = useContext(TodoContext);
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * progress) / 100;
  return (
    <div className="timer">
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stop-color="#ecc30b" />
            <stop offset="33%" stop-color="#97761b" />
            <stop offset="66%" stop-color="#ecc30b" />
            <stop offset="100%" stop-color="#97761b" />
          </linearGradient>
        </defs>
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="6px"
          r={radius}
          className="circle-background"
        />

        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="10px"
          r={radius}
          className="circle-progress"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
          stroke="url(#gradient)"
        />
        <text
          className="timer-text"
          x="50%"
          y="50%"
          dy=".8rem"
          textAnchor="middle"
        >
          59:00
        </text>
      </svg>
    </div>
  );
};

export default Timer;
