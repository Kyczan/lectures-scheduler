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
  header: {
    paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
  }
};

function PlannerCard(props) {
  const { classes } = props;

  return (
    <Card>
      <CardHeader
        className={classes.header}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        subheader="2018-08-29 10:00"
      />
      <CardContent className={classes.content}>
        <Typography variant="headline" component="h3">
         192. Lorem ipsum dolor set amet
        </Typography>
        <Typography component="p">
          Imię nazwisko
        </Typography>
        <Typography color="textSecondary">
          Wrocław-Leśnica
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

PlannerCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlannerCard);
