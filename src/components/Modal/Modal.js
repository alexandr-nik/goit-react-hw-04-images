import { Component } from 'react';
import PropTypes from 'prop-types';
import disableScroll from 'disable-scroll';
import './Modal.css';
export class Modal extends Component {
  closeModalWindow = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };
  windowEventListner = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.windowEventListner);
    disableScroll.on();
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.windowEventListner);
    disableScroll.off();
  }
  render() {
    const { alt, src } = this.props;
    return (
      <div className="Overlay" onClick={this.closeModalWindow}>
        <div className="Modal">
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
