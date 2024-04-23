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


//getting a list of tracks from the playlist
const getNowPlaying = () => {
  spotifyApi.getPlaylist("37i9dQZF1DX4dyzvuaRJ0n?si=967acf10164e49d4").then((response) => {
    //listing out the tracks
    var tracks = response.tracks.items;
    console.log(tracks)

    
    
    //creating an array to house the track id's
    let trackIds = [];
   
    //looping through the tracks and pushing the track id info into the trackIds array
    for(let i=0; i < tracks.length;i++){
      //console.log(tracks[i].track.id)
      var trackid=[tracks[i].track.id];
      trackIds.push(trackid);
    }
    console.log("trackIds:" + trackIds);

   
    for(let i=0; i < tracks.length;i++){
      var trackartist = tracks[i].track.artists
      console.log(trackartist)
      ///////PICK UP HERE/////////
      //loop through trackartists to get artist name
    }
    
   
    
//creating an array for audio features of each trackId 
    let trackFeatures = [];
//inputing the track id's into the audio features function to get features for each song id
    trackIds.forEach(item => 
    spotifyApi.getAudioFeaturesForTrack(item).then((response) => {
      console.log(response)
      trackFeatures.push(response)
    }
   
  )
  
)

console.log(trackFeatures)


//creating an array of objects to house the specific track info and featuers that I want to save















  
    
    
    
    
    
    

    //spotifyApi.getAudioFeaturesForTracks(response.tracks.items.)
   
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
