export const Login = () => {


    return (
        <div className="login"> 
            <h1>Lyrics for Spotify</h1>
            <p className="subtitle">Get lyrics that you can sing along to. Begin playing something in Spotify and get realtime lyrics.</p>
            <p className="sublogin">All you need to do is login using the button below!</p>
            <a href={`${process.env.REACT_APP_API}/auth/spotify`} className="spotify-login">Login with Spotify</a>        
        </div>
    )

}