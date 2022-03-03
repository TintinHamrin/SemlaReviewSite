import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import User from '../../models/User';

export default function UserProfile() {
  return (
    <Card sx={{ minWidth: 275 }} className="user-profile">
      <CardContent>
        <Typography variant="h5" component="div">
          user
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          likes coockies
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2">reviews:</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add as cookie friend</Button>
      </CardActions>
    </Card>
  );
}
