import React, { useEffect, useState } from 'react';
import { Button, MenuItem, Modal, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TaskAPI } from '../api/task.api';
import { TaskDTO, TaskStatus } from '../api/dto/task.dto';

interface Props {
  open: boolean;
  handleClose: () => void;
  onTaskEdited: (task: TaskDTO) => void;
  oldTask: TaskDTO | undefined;
}


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const EditTaskModal = ({ oldTask, onTaskEdited, open, handleClose }: Props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<undefined | string>(undefined);
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.Created)

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  useEffect(() => {
    if (oldTask) {
      setTitle(oldTask.title);
      setDescription(oldTask.description);
      setStatus(oldTask.status);
    }
  }, [oldTask]);

  const editTask = async () => {
    if (oldTask) {
      const resp = await TaskAPI.editOne(oldTask.id, {
        description, title, status
      });

      onTaskEdited(resp);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit New Task</h2>
      <TextField placeholder="Title" variant="filled" style={{ width: '100%' }}
                 onChange={e => setTitle(e.target.value)}
                 value={title} />
      <TextField placeholder="Description" variant="filled" style={{ width: '100%' }}
                 onChange={e => setDescription(e.target.value)}
                 value={description} />
      <Select
        label="Statu"
        value={status}
        onChange={e=> setStatus(e.target.value as TaskStatus)}
      >
        <MenuItem value={TaskStatus.Created}>Created</MenuItem>
        <MenuItem value={TaskStatus.InProgress}>In Progress</MenuItem>
        <MenuItem value={TaskStatus.Done}>Done</MenuItem>
      </Select>
      <Button color="primary" variant="contained" onClick={editTask}> Edit </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default EditTaskModal;
