import { PureComponent } from 'react';
import { ToastContainer } from 'react-toastify';
import { AxiosPaxabay } from './ApiPixabay';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { errorMessage, infoMessage } from './message';

export class App extends PureComponent {
  state = {
    page: 1,
    q: '',
    galleryList: [],
    totalHits: null,
    loader: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.q !== this.state.q) {
      this.getImage();
    }
    if (this.state.totalHits === 0) {
      errorMessage('Sorry. Image not found:(');
    }
    if (
      this.state.totalHits > 0 &&
      this.state.totalHits !== prevState.totalHits
    ) {
      infoMessage(`We found ${this.state.totalHits} images`);
    }
  }
  async getImage() {
    const { page, q } = this.state;
    this.setState({ loader: true });
    await AxiosPaxabay(page, q)
      .then(data => {
        this.setState(prevState => ({
          galleryList: [...prevState.galleryList, ...data.hits],
          totalHits: data.totalHits,
        }));
      })
      .finally(() => this.setState({ loader: false }));
  }
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  searchImages = q => {
    this.setState({
      q,
      page: 1,
      galleryList: [],
      totalHits: null,
    });
  };
  render() {
    const { galleryList, totalHits, page, loader } = this.state;
    return (
      <>
        <Searchbar getFindName={this.searchImages} />
        <ImageGallery>
          <ImageGalleryItem galleryList={galleryList} />
          {Math.ceil(totalHits / 12) > page && !loader && (
            <Button loadMore={this.loadMore} />
          )}
          {loader && <Loader />}
        </ImageGallery>
        <ToastContainer />
      </>
    );
  }
}
