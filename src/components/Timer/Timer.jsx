import React, { useState, useContext, useRef, useEffect } from "react";
import { TodoContext } from "../../context/TodoContext";
import { WindowSizeContext } from "../../context/WindowSizeContext";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import "./Timer.css";

const Timer = ({ circleWidth }) => {
  const { toDoTime, selectedTask, updateTask, handleSelectedTask } =
    useContext(TodoContext);
  const { windowWidth } = useContext(WindowSizeContext);

  const [isPaused, setIspaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/shortBreak/longBreak
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [pomodoroQtdCount, setPomodoroQtdCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const iconSize = { fontSize: windowWidth === 300 ? "18px" : "1.8rem" };

  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(mode);
  const isPausedRef = useRef(isPaused);
  const cycleRef = useRef(cycle);
  const audio = useRef(new Audio('/sounds/ten-seconds-left.mp3'));

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    audio.current.muted = !audio.current.muted;
  };

  const playSound = () => {
    if (!isMuted && secondsLeftRef.current === 10) {
      audio.current.play().catch((error) => {
        console.error(`Beep sound can't be played: ${error}`);
      });
    }
  };

  const stopSound = () => {
    audio.current.pause();
    audio.current.currentTime = 0;
  }

  const countCycle = () => {
    if (cycleRef.current === 3) {
      cycleRef.current = 0;
      setCycle(cycleRef.current);
      return;
    }

    cycleRef.current++;
    setCycle(cycleRef.current);
  };

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const toggleIsPaused = () => {
    isPausedRef.current = !isPausedRef.current;
    setIspaused(isPausedRef.current);
  };

  const resetPomodoroState = (cleartask) => {
    if (cleartask) {
      handleSelectedTask(null);
    }
    stopSound();

    cycleRef.current = 0;
    setCycle(cycleRef.current);

    isPausedRef.current = true;
    setIspaused(isPausedRef.current);

    modeRef.current = "work";
    setMode(modeRef.current);

    secondsLeftRef.current = toDoTime["work"] * 60;
    setSecondsLeft(secondsLeftRef.current);

    setPomodoroQtdCount(0);
  };

  useEffect(() => {
    if (modeRef.current === "work") return;
    const newCount = pomodoroQtdCount + 1;
    setPomodoroQtdCount(newCount);

    if (Number(selectedTask?.pomodoroQtd) === newCount) {
      updateTask({ ...selectedTask, status: true });
      resetPomodoroState(true);
    }
  }, [mode]);

  useEffect(() => {
    resetPomodoroState(false);
  }, [selectedTask]);

  useEffect(() => {
    const switchMode = () => {
      const nextMode =
        modeRef.current === "work"
          ? cycleRef.current < 3
            ? "shortBreak"
            : "longBreak"
          : "work";
      const nextSeconds = toDoTime[nextMode] * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;

      if (modeRef.current === "work") {
        countCycle();
        toggleIsPaused();
      }
    };

    secondsLeftRef.current = toDoTime.work * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      playSound();

      if (secondsLeftRef.current === 0) return switchMode();
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [toDoTime]);

  const totalSeconds = toDoTime[mode] * 60;
  const percentage = Math.round(100 - (secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  const radius = 85;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <>
      <div className="audio-control">
        {/* Outros botões existentes */}
        <div onClick={toggleMute} className="mute-control">
          {isMuted ? (
            <VolumeOffRoundedIcon
              sx={iconSize}
              className="color-btn control-btn"
            />
          ) : (
            <VolumeUpRoundedIcon
              sx={iconSize}
              className="color-btn control-btn"
            />
          )}
        </div>
      </div>
      <div className={windowWidth === 300 ? "timer width-300" : "timer"}>
        <svg
          width={circleWidth}
          height={circleWidth}
          viewBox={`0 0 ${circleWidth} ${circleWidth}`}
        >
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="var(--yellow-color)" />
              <stop offset="33%" stopColor="var(--dark-yellow-color)" />
              <stop offset="66%" stopColor="var(--yellow-color)" />
              <stop offset="100%" stopColor="var(--dark-yellow-color)" />
            </linearGradient>
          </defs>
          {windowWidth !== 300 && (
            <>
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
            </>
          )}
          <text
            className="timer-text"
            x="50%"
            y="50%"
            dy=".8rem"
            textAnchor="middle"
          >
            {minutes + ":" + seconds}
          </text>
        </svg>
        <div className="controls">
          <RefreshRoundedIcon
            className="color-btn control-btn"
            sx={iconSize}
            onClick={() => resetPomodoroState(true)}
          />
          <PauseRoundedIcon
            className={`color-btn control-btn ${isPaused ? "active" : ""}`}
            onClick={isPaused ? null : () => toggleIsPaused()}
            sx={iconSize}
          />
          <PlayArrowRoundedIcon
            className={`color-btn control-btn ${!isPaused ? "active" : ""}`}
            onClick={!isPaused ? null : () => toggleIsPaused()}
            sx={iconSize}
          />
        </div>
      </div>
      <div
        className={
          windowWidth === 300 ? "selected-task width-300" : "selected-task"
        }
      >
        <h5>{selectedTask ? selectedTask.taskName : "No one task selected"}</h5>
      </div>
    </>
  );
};

export default Timer;
