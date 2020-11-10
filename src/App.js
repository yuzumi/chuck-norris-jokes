import React, { useState, useEffect } from 'react';
import { CssBaseline, Typography, Container, Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    marginBottom: 20
  },
  cardContent: {
    padding: 24
  }
});

const App = () => {
  const [jokes, setJokes] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    fetch('https://api.icndb.com/jokes')
      .then(response => response.json())
      .then(data => setJokes(data.value))
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <CssBaseline />
      <Container>
        <Typography variant="h2" align="center">
          Chuck Norris Jokes
        </Typography>

        {jokes.map(joke => (
          <Card key={joke.id} className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography>
                {joke.joke}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default App;
