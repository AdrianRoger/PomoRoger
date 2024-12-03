import React from 'react';

import './PomodoroContainer.css';

const PomodoroContainer = ({children}) => {
    return (
        <div className="pomodoro-container">
            {children}
        </div>
    )
}

export default PomodoroContainer;