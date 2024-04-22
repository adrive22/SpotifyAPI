import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from "spotify-web-api-js"

import React, {useState, useEffect} from "react"

const spotifyApi = new SpotifyWebApi

const getTokenFromURL = () => {
  return window.location.hash
  .substring(1)
  .split("&")
  .reduce ((initial, item) => {
    let parts = item.split("=");
    initial [parts[0]] = decodeURIComponent(parts[1]);
    return initial
  },{});
}



function App() {
  const [spotifyToken, setSpotifyToken] =useState("");
  const [nowPlaying, setNowPlaying] = useState ({});
  const [loggedIn, setLoggedIn] = useState(false)


 
    useEffect(() => {
      if (loggedIn===false){
    console.log("This is what we dericed from the URL: " , getTokenFromURL())
    const spotifyToken = getTokenFromURL().access_token
    console.log("This is our spotify token", spotifyToken);
      
    if (spotifyToken) {
      setSpotifyToken(spotifyToken)
      spotifyApi.setAccessToken(spotifyToken)
      spotifyApi.getMe().then((user) => {
        console.log(user)
      })
      setLoggedIn(true)
     
    }
  }


  },[]);

const getNowPlaying = () => {
  spotifyApi.getMyTopTracks().then((response) => {
    console.log(response);
   
    })
  }



  return (
    <div className="App">
     {!loggedIn && <a href="http://localhost:8888">Login to Spotify</a>}
    {loggedIn &&(
      <>
      <div>NowPlaying:{nowPlaying.name}
      <div>
        <img src={nowPlaying.albumArt} style={{height:150}}/>
       </div>
       </div>
       </>
    )}
    {loggedIn && (
      <button onClick={()=>getNowPlaying()}>Check Now Playing</button>
    )
      
    }
     </div>
  );
}

export default App;
