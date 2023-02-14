import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export const ImageGalleryItem = ({ galleryList } ) => {
  const [activeIndex, setActiveIndex] = useState(null);
 const openModal = index => () => {
  setActiveIndex(index)
  };
  const closeModal = () =>{
    setActiveIndex(null)}
  return (
    <>
      {galleryList.length >= 1 &&
        galleryList.map((item, index) => {
          return (
            <li key={item.id} className="ImageGalleryItem">
              <img
                alt={item.tags}
                src={item.webformatURL}
                className="ImageGalleryItem-image"
                onClick={openModal(index)}
              />
              {activeIndex === index && (
                <Modal
                  alt={item.tags}
                  src={item.largeImageURL}
                  closeModal={() => closeModal()}
                />
              )}
            </li>
          );
        })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  galleryList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
