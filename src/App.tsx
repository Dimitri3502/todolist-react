import React, { useEffect, useState } from 'react';
import './App.css';
import { TaskAPI } from './api/task.api';
import { TaskDTO } from './api/dto/task.dto';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import Task from './components/Task';
import CreateTaskModal from './components/CreateTaskModal';
import EditTaskModal from './components/EditTaskModal';

function App() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [oldTask, setOldTask] = useState<TaskDTO | undefined>(undefined);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [updateTaskModalOpen, setUpdateTaskModalOpen] = useState(false);

  const addTask = (taskDto: TaskDTO) => {
    setTasks([...tasks, taskDto]);
  };
  const editTask = (taskDto: TaskDTO) => {
    const foundIndex = tasks.findIndex(x => x.id === taskDto.id);
    tasks[foundIndex] = taskDto;
    setTasks(tasks);
  };
  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  useEffect(() => {
    async function fetchAll() {
      const tasks = await TaskAPI.getAll();
      setTasks(tasks);
    }

    fetchAll();
  });

  return (
    <div className="App"><AppBar position="static">
      <CreateTaskModal
        onTaskCreated={addTask} open={createTaskModalOpen}
        handleClose={() => setCreateTaskModalOpen(false)} />
      <EditTaskModal
        onTaskEdited={editTask} open={updateTaskModalOpen}
        handleClose={() => setUpdateTaskModalOpen(false)} oldTask={oldTask} />
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Tasks
        </Typography>
        <Button color="inherit" variant="contained" onClick={() => setCreateTaskModalOpen(true)}>Create Task</Button>
      </Toolbar>
    </AppBar>
      <Grid container spacing={1} style={{ padding: 10 }}>
        {
          tasks.map(task => {
            return <Grid item key={task.id}> <Task onTaskDeleted={removeTask} onTaskEdited={() => {
              setOldTask(task);
              setUpdateTaskModalOpen(true);
            }} data={task} /></Grid>;
          })
        }
      </Grid>
    </div>
  );
}

export default App;
