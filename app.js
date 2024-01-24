document.addEventListener('DOMContentLoaded', function () {

  
    const genreFilter = document.getElementById('genre-filter');
    const songListContainer = document.getElementById('songList');
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    const prev=document.getElementById("prev");
    const next=document.getElementById("next");

    const songs = [
        { title: 'Sugar ' , artist: 'Maroon 5', genre: 'pop',id:1 },
        { title: 'STAY', artist: 'justin Bieber', genre: 'pop' ,id:2 },
        { title: 'Sport Rock & Workout | HARD', artist: 'ALex', genre: 'rock' ,id:3 },
        { title: 'Action Rock', artist: 'LESFM', genre: 'rock' ,id:4 },
        { title: 'Meesaiya Muruku', artist: 'Hip Hop Tamizha', genre: 'hip-hop' ,id:5 },
        { title: 'Sakkarakatti', artist: 'Hip Hop Tamizha', genre: 'hip-hop' ,id:6 },

        // Add more songs with different genres
    ];

    let playlists=[];
    let selectedSong=songs[0];

    next.addEventListener("click",function(){
        console.log(selectedSong)
        let x=selectedSong.id;
      
    
            x=(x+1)%(songs.length);
            console.log(x);
            if(x==0){
                selectedSong=songs[x];
            }
            else{
            selectedSong=songs[x-1];
            }
    
        renderSelectedSong(selectedSong);
    })
    

    prev.addEventListener("click",function(){
        let x=selectedSong.id;
        if(x==1){
            return;
        }
        else{
            x--;
            selectedSong=songs[x-1];
        }
        renderSelectedSong(selectedSong);
    })

    themeSwitch.addEventListener('change', function (e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
        }   
    })
    // Sample data for songs
  


    const createPlaylistBtn=document.getElementById("createPlaylistBtn");
    createPlaylistBtn.addEventListener("click",function(){
        const name=document.getElementById("newPlaylistInput").value;
        playlists.push({title:name,songs:[]});
        renderPlaylist();
        renderCurrentPlaylist();
    })

    // Function to render the song list based on the selected genre
    function renderSongList(selectedGenre) {
        const filteredSongs = selectedGenre === 'all' ? songs : songs.filter(song => song.genre === selectedGenre);

        // Clear the existing list
        songListContainer.innerHTML = '';

        // Render the filtered songs
        filteredSongs.forEach((song) => {
            const songItem = document.createElement('li');
            songItem.classList.add('song-item');
            songItem.innerHTML = `
                <h3>${song.title}</h3>
                <p>${song.artist} - ${song.genre}</p>
            `;
            songItem.addEventListener("click",function(){
               selectedSong=songs.find((s)=>s.title===song.title);
               renderSelectedSong(selectedSong);
            })
            songListContainer.appendChild(songItem);
        });
    }

    // Initial render with all genres
    renderSongList('all');

    renderPlaylist();

    // Event listener for genre filter change
    genreFilter.addEventListener('change', function () {
        const selectedGenre = genreFilter.value;
        renderSongList(selectedGenre);
    });


    let selectedPlaylist={title:"",songs:[]};


    function renderPlaylist(){

        const playlistContainer = document.getElementById('playlist-List');
      
        // Clear the existing list
        playlistContainer.innerHTML = '';

        // Render the filtered songs
        playlists.forEach((play) => {
            const playlistItem = document.createElement('li');
            playlistItem.classList.add('playlist-item');
            playlistItem.innerHTML = `
                <h4>${play.title}</h4>
            `;
            // songItem.addEventListener("click",function(){
            //    selectedSong=songs.find((s)=>s.title===song.title);
            //    renderSelectedSong(selectedSong);
            // })
            playlistItem.addEventListener("click",function(){
                selectedPlaylist=play;
                console.log(selectedPlaylist)
                renderCurrentPlaylist();
            })
            playlistContainer.appendChild(playlistItem);
        });
    }


    function renderCurrentPlaylist(){

        const playlistContainer = document.getElementById('current-playlist-List');
      const x=document.createElement("h5");
      x.textContent=selectedPlaylist.title;
        // Clear the existing list
        playlistContainer.innerHTML = '';
        playlistContainer.appendChild(x);

        // Render the filtered songs
        selectedPlaylist.songs.forEach((play) => {
            const songItem = document.createElement('li');
            songItem.classList.add('song-item');
            songItem.innerHTML = `
                <h3>${play.title}</h3>
            `;
            // songItem.addEventListener("click",function(){
            //    selectedSong=songs.find((s)=>s.title===song.title);
            //    renderSelectedSong(selectedSong);
            // })
            // playlistItem.addEventListener("click",function(){
            //     selectedPlaylist=play;
            //     console.log(selectedPlaylist)
            // })
            playlistContainer.appendChild(songItem);
        });
    }

    renderCurrentPlaylist();

    const addToPlaylistbtn=document.getElementById("addToPlaylist");

    addToPlaylistbtn.addEventListener("click",function(){
        selectedPlaylist.songs.push(selectedSong);
        console.log(selectedPlaylist);
        renderCurrentPlaylist();
    })

   
});


function renderSelectedSong(selectedSong){
    const songImg=document.getElementById("song-img");
    songImg.setAttribute("src",`./assets/images/${selectedSong.id}.jpeg`)
    const asrc=document.getElementById("asrc");
    asrc.setAttribute("src",`./assets/songs/${selectedSong.id}.mp3`)



    const title=document.getElementById("song-title");
    title.textContent=selectedSong.title


    const artist=document.getElementById("song-artist");
    artist.textContent=selectedSong.artist
    
}