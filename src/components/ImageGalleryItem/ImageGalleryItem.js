import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export class ImageGalleryItem extends Component {
  state = {
    index: null,
  };
  openModal = index => () => {
    this.setState({ index: index });
  };
  closeModal() {
    this.setState({
      index: null,
    });
  }
  render() {
    const { galleryList } = this.props;
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
                  onClick={this.openModal(index)}
                />
                {this.state.index === index && (
                  <Modal
                    alt={item.tags}
                    src={item.largeImageURL}
                    closeModal={() => this.closeModal()}
                  />
                )}
              </li>
            );
          })}
      </>
    );
  }
}
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
