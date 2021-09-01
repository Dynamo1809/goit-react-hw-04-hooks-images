import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onOpenModal }) => (
  <li className="ImageGalleryItem">
    <img 
      onClick={() => onOpenModal(largeImageURL)}
      src={webformatURL} 
      alt="" 
      className="ImageGalleryItem-image" 
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired, 
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
}