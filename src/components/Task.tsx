import React from 'react';
import {Card, CardContent, Typography, CardActions, Button} from "@material-ui/core";
import {TaskDTO} from "../api/dto/task.dto";

interface Props {
  data: TaskDTO;
}

function Task({data}: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {data.title}
        </Typography>
        <Typography variant="body2" component="p">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          EDIT</Button>
        <Button size="small" color="secondary">
          DELETE</Button>
      </CardActions>
    </Card>
  );
}

export default Task;
