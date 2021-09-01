import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'

import Loader from "react-loader-spinner";
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Button } from 'components/Button';
import PixabayAPI from 'services/pixabay-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function ImageGallery({ searchQuery, onOpenModal }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);

  const prevSearchQuery = usePrevious(searchQuery);

  useEffect(() => {
    if(!searchQuery) {
      return;
    }

    setIsLoader(true);

    if(prevSearchQuery !== searchQuery) {
      resetPage();

      PixabayAPI
      .fetchPhotos(searchQuery)
      .then(res => {      
        setStatus(Status.RESOLVED);
        setImages(res.hits);
        setIsLoader(false); 
      })
      .catch(error => {
        setError(error.message);
        setStatus(Status.REJECTED);
      });
      
      return;
    };

    if(page !== 1 && prevSearchQuery === searchQuery) {
      PixabayAPI
      .fetchPhotos(searchQuery, page)
      .then(res => { 
        setStatus(Status.RESOLVED);
        setImages( prevImages => [...prevImages, ...res.hits]);  
        setIsLoader(false);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });

      })        
      .catch(error => {
        setError(error.message);
        setStatus(Status.REJECTED);
      });

    };
    
  }, [page, searchQuery, prevSearchQuery]);

  const handleLoadMoreClick = (e) => setPage(prevPage => prevPage + 1);

  const resetPage = () => {
    setPage(1);
    setStatus(Status.IDLE);
  };
  
  if(status === Status.IDLE) {return null};

  if(status === Status.REJECTED) {return <h1 style={{textAlign: 'center'}}>Помилка запиту: '{error}'</h1>};
  
  if(status === Status.RESOLVED) {
    return images.length !== 0 ? (
      <>
        <ul className="ImageGallery">            
          {images.map( ({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem 
              onOpenModal={onOpenModal} 
              key={id} 
              webformatURL={webformatURL} 
              largeImageURL={largeImageURL}/>
          ))}         
        </ul>

        { isLoader && <Loader className="Loader" type="ThreeDots" color="#3f51b5" />}
        
        { images.length % 12 === 0 && <Button onClick={handleLoadMoreClick} /> }            
      
      </>
        ): (            
          <h2 style={{textAlign: 'center'}}>Немає зображень за запитом '{searchQuery}'</h2>
        )         
  };
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  error: PropTypes.string,
  isLoader: PropTypes.bool,
  page: PropTypes.number,
  status: PropTypes.string,
};