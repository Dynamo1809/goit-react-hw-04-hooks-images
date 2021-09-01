import { useState } from 'react';
import PropTypes from 'prop-types';

// Components //
import { ImageGallery } from 'components/ImageGallery';
import { Searchbar } from 'components/Searchbar';
import { Modal } from 'components/Modal';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalImageSrc, setModalImageSrc] = useState('');

  const handleSubmit = newQuery => {
    if(searchQuery === newQuery) {
      toast(`Search name '${newQuery}' already used`)
      return;
    }
    setSearchQuery(newQuery);
  };

  const toggleModal = (src) => setModalImageSrc(src);

    return (
      <div className="App">     
        {modalImageSrc && <Modal src={modalImageSrc} onClose={toggleModal}/>}
        <ToastContainer autoClose={1500}/>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery onOpenModal={toggleModal} searchQuery={searchQuery} />
      </div>
    );
};

export default App;

App.propTypes = {
  searchQuery: PropTypes.string,
  modalImageSrc: PropTypes.string,
};