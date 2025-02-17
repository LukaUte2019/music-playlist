let songsAPIURL = 'http://lukaserver.ddns.net:81/songs';
const songIdApi = document.getElementById("currentsongs");
songIdApi.innerText = "Current songs in API: " + songsAPIURL;
document.getElementById("userForm").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const userId = document.getElementById("id").value;
    const artistName = document.getElementById("artistname").value;
    const songName = document.getElementById("songname").value;
    const genre = document.getElementById("songgenre").value;
    const songurl = document.getElementById("songlink").value;
  
    const user = {
      userId, 
      artistansongmname: `${artistName} - ${songName}`,
      genre,
      bandinfo: {existentDJinBand: false, singer1: {fulName: artistName, born: "", description: "", wasOnIDJShow: false }, singer2: { fulName: artistName, born: "", description: "", wasOnIDJShow: false }, person3: { fulName: artistName, born: "", description: "", wasOnIDJShow: false}},
      artistName,
      songName,
      songurl,
      addedAt: new Date().toISOString(),
    };
  
  
    try {
      
      if(userId) {
  
      
  
      }
      else {
  
          const response = await fetch(songsAPIURL, {
              method : 'POST',
              headers:  {
              },
              body: JSON.stringify(user)
          })
      }
  
    } catch (error) {
      
    }
  
  
  })




async function populateTable() {
    try {
   
        const response = await fetch(songsAPIURL);
 
        const users = await response.json();

        const tableBody = document.querySelector("#userTable tbody");
        tableBody.innerHTML = '';

        users.forEach(song => {
            const row = document.createElement('tr');

            row.innerHTML = `
              <td><div id="div-song-play-btn-${song.id}" title="Play song '${song.songName}'"><a style="text-decoration: none; color:inherit;" "target="_blank";" href="javascript:playSong('${song.songurl}','${song.id}');">${song.songName}</a></div></td>
              <td><div title="View Artist ${song.artistName} on Google"><a href="https://www.google.com/search?q=${song.artistName}" style="text-decoration: none; color:inherit;";">${song.artistName}</a></td>
               <td><div id="div-song-play-btn-${song.id}" title="Play song '${song.songName}'"><a id="play-btn-${song.id}" style="text-decoration: none;" href="javascript:playSong('${song.songurl}','${song.id}');">Play</a></div></td>
                <td><div title="${song.bandinfo.singer1.description} and ${song.bandinfo.singer2.description}"><a href="https://www.google.com/search?q=${song.bandinfo.singer1.fulName} and ${song.bandinfo.singer2.fulName}" style="text-decoration: none; color:inherit;";">${song.bandinfo.NamesOfSingers}</a></div></td>
                 <td>${song.genre}</td>
                  <td>               
                <button onclick="javascript:playSong('${song.songurl}','${song.id}');">Play</button>   
                <button onclick="editUser(${song.id})">Edit</button>
                <button onclick="deleteUser(${song.id})">Delete</button>
                  </td>
            `;

             tableBody.append(row);
        });



    } catch (error) {
        
    }
    
}
populateTable();


async function populateTableRetroPlay() {
    try {
   
        const response = await fetch('http://lukaserver.ddns.net:81/retrodance');
 
        const users = await response.json();

        const tableBody = document.querySelector("#userTable tbody");
        tableBody.innerHTML = '';

        users.forEach(song => {
            const row = document.createElement('tr');

            row.innerHTML = `
             <td><div id="div-song-play-btn-${song.id}" title="Play song '${song.songName}'"><a style="text-decoration: none; color:inherit;" "target="_blank";" href="javascript:playSong('${song.songurl}','${song.id}');">${song.songName}</a></div></td>
              <td><div title="View Artist ${song.artistName} on Google"><a href="https://www.google.com/search?q=${song.artistName}" style="text-decoration: none; color:inherit;";">${song.artistName}</a></td>
               <td><div id="div-song-play-btn-${song.id}" title="Play song '${song.songName}'"><a id="play-btn-${song.id}" style="text-decoration: none;" href="javascript:playSong('${song.songurl}','${song.id}');">Play</a></div></td>
                <td><div title="${song.bandinfo.singer1.description} and ${song.bandinfo.singer2.description}"><a href="https://www.google.com/search?q=${song.bandinfo.singer1.fulName} and ${song.bandinfo.singer2.fulName}" style="text-decoration: none; color:inherit;";">${song.bandinfo.NamesOfSingers}</a></div></td>
                 <td>${song.genre}</td>
                  <td>               
                <button onclick="javascript:playSong('${song.songurl}','${song.id}');">Play</button>   
                <button onclick="editUser(${song.id})" >Edit</button>
                <button onclick="deleteUser(${song.id})">Delete</button>
                  </td>
            `;

             tableBody.append(row);
        });



    } catch (error) {
        
    }
    
}