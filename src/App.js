import React, { useState, useEffect } from 'react';
import { 
  CssBaseline,
  AppBar,
  Tabs,
  Tab,
  Typography, 
  Container, 
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

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [likedJokes, setLikedJokes] = useState([]);
  const [visibleJokes, setVisibleJokes] = useState([]);

  const [currentTab, setCurrentTab] = useState(0)

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
    if (likedJokes.find(joke => joke.id === id)) return;

    const likedJoke = jokes.find(joke => joke.id === id);
    const newLikedJokes = [likedJoke, ...likedJokes];

    setLikedJokes(newLikedJokes);
  };

  const unlikeJoke = id => {
    const newLikedJokes = likedJokes.filter(joke => joke.id !== id);

    setLikedJokes(newLikedJokes);
  };

  const changeTab = (_event, value) => {
    setCurrentTab(value);
  };

  return (
    <div className="app">
      <CssBaseline />
      <Container>
        <Typography variant="h2" align="center">
          Chuck Norris Jokes
        </Typography>

        <AppBar style={{ marginBottom: 20 }} position="sticky">
          <Tabs value={currentTab} onChange={changeTab} centered>
            <Tab id="home-tab" label="Home" aria-controls="home-panel" />
            <Tab id="like-tab" label="Likes" aria-controls="like-panel" />
          </Tabs>
        </AppBar>

        <div role="tabpanel" hidden={currentTab !== 0}>
          {visibleJokes.map(joke => (
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
          ))}
        </div>

        <div role="tabpanel" hidden={currentTab !== 1}>
          {likedJokes.map(joke => (
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
            ))}
        </div>
      </Container>
    </div>
  );
};

export default App;
