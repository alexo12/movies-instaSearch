/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import * as React from 'react';
import algoliasearch from 'algoliasearch';
import './App.css';
import Hit from './components/Hit';
import background from './assets/img/trianglify-background3.svg';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  ClearRefinements,
  RefinementList,
  Configure,
  RatingMenu,
  Stats,
} from 'react-instantsearch-dom';
const searchClient = algoliasearch(
  'JRBX2JXPHI',
  '7df769ad16fb515f00e00ae86c2a2222'
);

// Create the App component
const App = () => {
  return (
    <div>
      <header
        className={`p-4 w-100`}
        style={{backgroundImage: `url(${background})`, backgroundPosition: `bottom`}}>
        <div className={`container`}>
          <div className={`row`}>
            <div className={`col-md-6 mx-auto`}>
              <h3 className={`text-white text-center text-uppercase tommy-font`}>
                Movie Database
              </h3>
            </div>
          </div>
        </div>
      </header>
      <div className="ais-InstantSearch container-fluid">
        <InstantSearch indexName="movies" searchClient={searchClient}>
          <div className="left-panel">
            <div className="mt-3">
              <ClearRefinements />
            </div>
            <h4 className="mt-2 mt-md-5 mb-1 whiteThemeText">Genres</h4>
            <RefinementList attribute="genre" />
            <h4 className="mt-2 mt-md-5 mb-1 whiteThemeText">Ratings</h4>
            <RatingMenu attribute="rating" />
            <Configure hitsPerPage={15} />
          </div>
          <div className="right-panel">
            <SearchBox />
            <Stats />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default App;
