import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { TaskDTO } from '../api/dto/task.dto';
import { TaskAPI } from '../api/task.api';

interface Props {
  data: TaskDTO;
  onTaskDeleted: (taskId: number) => void;
  onTaskEdited: (taskDto: TaskDTO) => void;
}


function Task({ data, onTaskDeleted, onTaskEdited }: Props) {

  const onDelete = async () => {
    await TaskAPI.deleteOne(data.id);

    onTaskDeleted(data.id);

  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {data.title}
        </Typography>
        <Typography variant="body2" component="p">
          {data.description}
        </Typography>
        <Typography variant="body2" component="p">
          {data.description}
        </Typography>
        <Typography variant="body2" component="p">
          {data.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => onTaskEdited(data)} size="small" color="primary">
          EDIT</Button>
        <Button onClick={onDelete} size="small" color="secondary">
          DELETE</Button>
      </CardActions>
    </Card>
  );
}

export default Task;
