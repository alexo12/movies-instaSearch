/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import * as React from 'react';
import defaultMovieImg from '../assets/img/movieIcon-150x150.png';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import urlExist from 'url-exist';
import PropTypes from 'prop-types';
const { useState, useEffect } = React;

const Hit = props => {
  let {image, actor_facets, title, year, genre, rating, score, color} = props.hit;
  const [movieImgSrc, setMovieImgSrc] = useState(image);
  const [validateActorImgs, setValidateActorImgs] = useState(false);
  const [actors, setActors] = useState(null);
  const [open, setOpen] = useState(false);
  const toggleModal = () => open ? setOpen(false) : setOpen(true);

  const validate = async () => {
    const movieImg = await urlExist(image)
    if (!movieImg) image = defaultMovieImg
    const actorsArr = [];
    for(let i = 0; i < 4; i++) {
      if(actor_facets[i]) {
        const actorImg = actor_facets[i].split('|')[0];
        const actorName = actor_facets[i].split('|')[1];
        const actorImgExist = await urlExist(actorImg);
        if(actorImgExist) {
          actorsArr.push(
            <div className="col-6 col-md-3 text-center" key={actorName}>
              <img src={actorImg} alt={actorName} className="actorImg" />
              <p className="actor-name">{actorName}</p>
            </div>
          )
        }
      }
    }
    if(actorsArr.length) setActors(actorsArr);
  }
  useEffect(() => {
    // image urls in the movie dataset provided in the github url were out of date/no good
    // replaced any image that wasnt resolving anymore with a fresh image from the movieDB api
    validate();
  }, []);

  return (
    <div className={`row movie-item`} onClick={toggleModal}>
      <div className={'col-12'}>
        <img src={movieImgSrc} onError={defaultMovieImg} className="movieImg" alt="" />
        <div className="hit-name pt-2">
          <span>{title}</span>
        </div>
        <div className="hit-description whiteThemeText hit-year">
          {year}
        </div>
      </div>
      <Modal open={open} onClose={toggleModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box className="movieModal rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x d-flex"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          <div className="row">
            <img src={movieImgSrc} className="modalMovieImg mx-auto d-none d-md-block" alt="" />
            <div className='col-12 text-center'>
                <div className="hit-name pt-2">
                  <h2>{title}</h2>
                </div>
                <div className='genres'>{genre.map(genre => <span className="badge m-1 genre">{genre}</span>)}</div>
              <div>
                <p className="score">Audience Score: {`${score.toFixed(1).replace('.', '')}%`}</p>            
                <span>
                  {Array(Math.floor(rating)).fill(<i className="fa fa-star"></i>)}
                  {(rating) - Math.floor(rating) === 0 ? ('') : (<i className="fa fa-star-half"></i>)}
                </span>
              </div>
            </div>
            <div className='col-12 mt-3'>
              {actors &&
                <><h3 className={"whiteThemeText"}>Lead Roles</h3>
                <div className={'row d-flex justify-content-center'}>{actors}</div></> 
              }
            </div>
          </div>
        </Box>
      </Modal>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`col-3 feather feather-info d-none`}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    </div>
  );
};

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default Hit;
