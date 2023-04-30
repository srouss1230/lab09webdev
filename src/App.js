import './App.css';

function App() {
  const api_key = "fe80472bacff902901720dcdaf98e60c";
  //accesses a list on the TMDB database and returns the director for each film on the list
  const listDirectors = () => {
    let list = 'https:/api.themoviedb.org/3/list/8251168?api_key=' + api_key;
    //fetches the list
    fetch(list)
    .then(response => response.json())
    .then (data => {
      //iterates through the list
      for(let i = 0; i < data.items.length; i++) {
        let movieId = data['items'][i]['id'];
        let credits = 'https:/api.themoviedb.org/3/movie/' + movieId + '/credits' +'?api_key=' + api_key;
        //fetches the credits for each movie on the list
        fetch(credits)
        .then(response => response.json())
        .then(data =>{  
          //iterates through the credits to find the director
          let directorFound = false;
          let j = 0;
          while (!directorFound){
              let job = data['crew'][j]['job'];
              if(job === 'Director'){
                  //stores and logs the director
                  let director =data['crew'][j]['name'];
                  let directorID = data['crew'][j]['id'];
                  console.log(director);
                  directorFound = true;
              }
              j += 1
            }
          
        });
      }
    });

  }
  return (
    <div className="App">
      my app
      <div>
        {/* {tmdbTestData()} */}
        {listDirectors()}
      </div>
    </div>

  
  );
  }
export default App;
