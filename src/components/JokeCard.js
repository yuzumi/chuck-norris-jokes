import React from 'react';
import { 
  Typography,
  Card, 
  CardContent, 
  CardActions, 
  Button 
} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Category from 'components/Category';

const useStyles = makeStyles({
  card: {
    marginBottom: 20
  },
  cardContent: {
    paddingBottom: 4
  },
  cardActions: {
    padding: 16
  }
});

const JokeCard = ({ joke, likeJoke, unlikeJoke }) => {
  const classes = useStyles();

  return (
    <Card key={joke.id} className={classes.card}>
      <CardContent className={classes.cardContent}>
        {joke.categories.length > 0 ? (
          joke.categories.map(category => (
            <Category key={category} label={category} />
          ))
        ) : (
          <Category label="regular" />
        )}
        <Typography>
          {joke.joke}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => likeJoke(joke.id)}
        >
          Like
        </Button>
        <Button 
          variant="contained" 
          color="secondary"
          onClick={() => unlikeJoke(joke.id)}
        >
          Unlike
        </Button>
      </CardActions>
    </Card>
  );
};

export default JokeCard;
