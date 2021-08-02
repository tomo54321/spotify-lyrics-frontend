import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Player } from './Pages/Player';
import { getCookie } from './util/cookies';
import SpotifyLogo from './assets/spotify-logo.png';
import { Login } from './Pages/Login';

export const APIClient = new QueryClient();

function App() {

	const isLoggedIn = getCookie("loggedIn") !== "";
	return (
		<QueryClientProvider client={APIClient}>
			<div className="app">
				{!isLoggedIn ? <Login /> : <Player />}

				<footer>
					<small className="legal">This website is in no way affiliated or assosiated with Spotify.</small>
					<a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
						<img src={SpotifyLogo} alt="Spotify" className="spotify-logo"/>
					</a>
				</footer>
			</div>
		</QueryClientProvider>
	);
}

export default App;
