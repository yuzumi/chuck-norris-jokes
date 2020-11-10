import React, { useState, useEffect } from 'react';
import { CssBaseline, Typography, Container, Card, CardContent, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [visibleJokes, setVisibleJokes] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    fetch('https://api.icndb.com/jokes')
      .then(response => response.json())
      .then(data => {
        setJokes(data.value);
        setVisibleJokes(data.value.slice(0, 10));
      })
      .catch(console.error);
  }, []);

  const likeJoke = id => {
    console.log('like', id);
  };

  const unlikeJoke = id => {
    console.log('unlike', id);
  };

  return (
    <div className="app">
      <CssBaseline />
      <Container>
        <Typography variant="h2" align="center">
          Chuck Norris Jokes
        </Typography>

        {visibleJokes.map(joke => (
          <Card key={joke.id} className={classes.card}>
            <CardContent className={classes.cardContent}>
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
        ))}
      </Container>
    </div>
  );
};

export default App;
