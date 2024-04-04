import React, {useState} from 'react';
import './App.css';
import Button from '@mui/material/Button';
interface Task {
  taskName: string;
  timeInSeconds?: string;
}

function App() {
  const [currentIntervalId, setCurrentIntervalId] = useState<NodeJS.Timer | null>(null);
  const [time, setTime] = useState(0);
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const formatTime = (seconds: number) => {
    let hours = 0;
    let minutes = 0;
    let secs = 0;

    if (seconds > 3600) {
      hours = Math.floor(seconds / 3600)
    }

    if (seconds - hours * 3600 > 60) {
      minutes = Math.floor((seconds - hours * 3600) / 60);
    }

    secs = seconds - hours * 3600 - minutes * 60;

    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`
  }

  const handleStart = () => {
    if (currentIntervalId) {
      setTasks((prev) => [...prev.slice(0, prev.length - 1), {taskName: prev[prev.length - 1].taskName, timeInSeconds: formatTime(time)}])
      clearInterval(currentIntervalId);
      setCurrentIntervalId(null);
      setTime(0);
    }

    if (inputText) {
      setTasks((prev) => [...prev, {taskName: inputText}]);
      const intervalId = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      setCurrentIntervalId(intervalId);
    }
  }

  return (
    <div className='container'>
      {!!tasks.length && (
        <div className='tasksList'>
          {tasks.map(task => (
            <div className="taskContainer">
              <div>{task.taskName}</div>
              <div>{task.timeInSeconds ? task.timeInSeconds : formatTime(time)}</div>
            </div>
          ))}
        </div>
      )}

      <div className='inputContainer'>
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
        <Button variant="contained" onClick={handleStart}>Start</Button>
      </div>
    </div>

  )
}

export default App;
