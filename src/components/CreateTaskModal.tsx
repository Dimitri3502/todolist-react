import React, { useState } from 'react';
import { Button, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TaskAPI } from '../api/task.api';
import { TaskDTO } from '../api/dto/task.dto';

interface Props {
  open: boolean;
  handleClose: () => void;
  onTaskCreated: (task: TaskDTO) => void;
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


const CreateTaskModal = (props: Props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<undefined | string>(undefined);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const createTask = async () => {
    const resp = await TaskAPI.createOne({
      description, title,
    });

    props.onTaskCreated(resp);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create New Task</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <TextField placeholder="Title" variant="filled" style={{ width: '100%' }}
                 onChange={e => setTitle(e.target.value)} />
      <TextField placeholder="Description" variant="filled" style={{ width: '100%' }}
                 onChange={e => setDescription(e.target.value)} />
      <Button color="primary" variant="contained" onClick={createTask}> Create </Button>
    </div>
  );
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default CreateTaskModal;
