import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Player } from './Pages/Player';
import { getCookie } from './util/cookies';

export const APIClient = new QueryClient();

function App() {

  const isLoggedIn = getCookie("loggedIn") !== "";
  return (
    <QueryClientProvider client={APIClient}>
      <div className="app">
          { !isLoggedIn ? <a href="http://localhost:8000/auth/spotify">Login</a> : <Player />}

        <small className="legal">This website is in no way affiliated or assosiated with Spotify.</small>
      </div>
    </QueryClientProvider>
  );
}

export default App;
