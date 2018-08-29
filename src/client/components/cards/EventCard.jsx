import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';

const styles = {
  card: {
    height: '100%'
  },
  header: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 0
  }
};

function EventCard(props) {
  const { classes, event } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        subheader={`${event.event_date} ${event.event_time}`}
      />
      <CardContent className={classes.content}>
        <Typography variant="headline" component="h3">
          {event.lecture || event.note}
        </Typography>
        <Typography component="p">{event.speaker}</Typography>
        <Typography color="textSecondary">{event.congregation}</Typography>
        <Typography component="p">
          {event.note && event.lecture ? event.note : ''}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <IconButton aria-label="Edytuj">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Usuń">
          <DeleteIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};

export default withStyles(styles)(EventCard);
