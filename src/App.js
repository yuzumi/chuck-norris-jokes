import React, { useState, useEffect } from 'react';
import { 
  CssBaseline,
  AppBar,
  Tabs,
  Tab,
  Typography, 
  Container
} from '@material-ui/core';

import JokeCard from 'components/JokeCard';

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [likedJokes, setLikedJokes] = useState([]);
  const [visibleJokes, setVisibleJokes] = useState([]);

  const [currentTab, setCurrentTab] = useState(0)

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

  const renderJoke = joke => (
    <JokeCard 
      key={joke.id}
      joke={joke}
      likeJoke={likeJoke}
      unlikeJoke={unlikeJoke}
    />
  );

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
          {visibleJokes.map(renderJoke)}
        </div>

        <div role="tabpanel" hidden={currentTab !== 1}>
          {likedJokes.map(renderJoke)}
        </div>
      </Container>
    </div>
  );
};

export default App;
