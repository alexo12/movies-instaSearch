/* Disclaimer: this file was not ran in this environment and has not been tested in this directory, 
  the file was included to display the solution of how I fixed the entire Index
*/
import algoliasearch from 'algoliasearch';
import https from 'https';
import urlExist from 'url-exist';
import fs from 'fs';
import axios from 'axios';
const searchClient = algoliasearch(
  'APPLICATION_ID',
  'ADMIN_KEY'
); 
const index = searchClient.initIndex('movies');
const hits = []; // container for repaired movies

// prevents axios timeout from large amounts of requests
axios.defaults.timeout = 60000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });


/* obtain all records from index, run each record through repair movie func then update the index through
  algolia api. also store backup json file
*/
const repairIndex = () => {
  index.browseObjects({
    batch: async batch => {
      for(let i = 0; i < batch.length; i++) {
        const repairedMovie = await repairMovie(batch[i]);
        hits.push(repairedMovie);
      }
    }
  }).then(() => {
      index.partialUpdateObjects(hits).then(() => console.log('index updated'));
      fs.writeFile('./repairedMovies.json',JSON.stringify(hits, null, 2), 'utf-8', (err) => {
        if (err) throw err;
        console.log('JSON file has been writen');
      })
  }).catch(err => console.log(err));
}


/* take record and verify if the movie poster and up to 4 lead actor images are still valid urls
    , if not replace them with updated urls from IMDB api and return obj back
*/
const repairMovie = async obj => {
      const exist = await urlExist(obj.image)
      if (!exist) {
        try {
          // ensure all strings are good to go and have no characters that would break/alter request
          const movieTitle = obj.title.replace(/[^a-zA-Z0-9 ]/g, '');
          const path = encodeURI(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${movieTitle}`)
          const {data} = await axios.get(path);
          const movie = data.results[0];
          const newMovieImg = movie && movie.poster_path ? `http://image.tmdb.org/t/p/w500${movie.poster_path}` : null;
          obj.image = newMovieImg;
        } catch(err) {
          console.log(`error repairing ${obj.title}'s movie poster`, err); // usally only catch an error in the axio calls when a movie in a less-prominent foreign language is queried 
          /* im not throwing err here because if there is an axios error and the request crashes I still want to repair actor images so therefor the func leaves the image as a depricated url. But that is fine 
          because we have second layer handling in react that will display a default movie image as the poster if the image is null
          */ 
        }
      }
      const actorFacets = obj.actor_facets;
      if(actorFacets) {
        const numOfActors = actorFacets.length >= 4 ? 4 : actorFacets.length; // only running test on 4 actors maximum since im only rendering 4 actors max in webapp
        for(let i = 0; i < numOfActors; i++) {
          const actorImageValid = await urlExist(actorFacets[i].split('|')[0])
          if(!actorImageValid) {
            try {
              const path = encodeURI(`https://api.themoviedb.org/3/search/person?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${actorFacets[i].split('|')[1]}`)
              const {data} = await axios.get(path);
              const actor = data.results[0];
              const newActorImg = (actor && actor.profile_path) ? `http://image.tmdb.org/t/p/w500${actor.profile_path}` : null;
              obj.actor_facets[i] = newActorImg;
            } catch(err) {
              console.log(`error repairing ${obj.actor_facets[i].split('|')[1]}'s profile img`, err) 
              // not throwing error here so the iteration for the other actors doesnt stop. In react the failed actor just wont be rendered to the client
            }
          }
        }
      }
      // this will either result to a fully repaired movie or the original movie (or a mixture of new and old assets), either way we are still storing the movie regardless of the outcome because we have the defaultMovieImg fallback for worst case scenarios
      return obj;
}

// repairIndex();