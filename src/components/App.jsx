import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { AxiosPaxabay } from './ApiPixabay';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { errorMessage, infoMessage } from './message';

export function App() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [galleryList, setGalleryList] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [loader, setLoader] = useState(false);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const searchImages = q => {
    setQ('');
    setPage(1);
    setGalleryList([]);
    setTotalHits(null);
  };

  useEffect(() => {
    if (q === '') {
      return;
    }
    try {
      setLoader(true);
      const { data, totalHits } = AxiosPaxabay(page, q);
      if (totalHits === 0) {
        errorMessage('Sorry. Image not found:(');
        return;
      } else {
        infoMessage(`We found ${totalHits} images`);
      }
      data.then(data => setGalleryList(prev => [...prev, ...data.hits]));
    } catch (error) {
      errorMessage(error);
    } finally {
      setLoader(false);
    }
  }, [page, q]);

  return (
    <>
      <Searchbar getFindName={searchImages} />
      <ImageGallery>
        <ImageGalleryItem galleryList={galleryList} />
        {Math.ceil(totalHits / 12) > page && !loader && (
          <Button loadMore={loadMore} />
        )}
        {loader && <Loader />}
      </ImageGallery>
      <ToastContainer />
    </>
  );
}

//  class App extends PureComponent {
//   state = {
//     page: 1,
//     q: '',
//     galleryList: [],
//     totalHits: null,
//     loader: false,
//   };
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.page !== this.state.page || prevState.q !== this.state.q) {
//       this.getImage();
//     }
//     if (this.state.totalHits === 0) {
//       errorMessage('Sorry. Image not found:(');
//     }
//     if (
//       this.state.totalHits > 0 &&
//       this.state.totalHits !== prevState.totalHits
//     ) {
//       infoMessage(`We found ${this.state.totalHits} images`);
//     }
//   }
//   async getImage() {
//     const { page, q } = this.state;
//     this.setState({ loader: true });
//     await AxiosPaxabay(page, q)
//       .then(data => {
//         this.setState(prevState => ({
//           galleryList: [...prevState.galleryList, ...data.hits],
//           totalHits: data.totalHits,
//         }));
//       })
//       .finally(() => this.setState({ loader: false }));
//   }
//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };
//   searchImages = q => {
//     this.setState({
//       q,
//       page: 1,
//       galleryList: [],
//       totalHits: null,
//     });
//   };
//   render() {
//     const { galleryList, totalHits, page, loader } = this.state;
//     return (
//       <>
//         <Searchbar getFindName={this.searchImages} />
//         <ImageGallery>
//           <ImageGalleryItem galleryList={galleryList} />
//           {Math.ceil(totalHits / 12) > page && !loader && (
//             <Button loadMore={this.loadMore} />
//           )}
//           {loader && <Loader />}
//         </ImageGallery>
//         <ToastContainer />
//       </>
//     );
//   }
// }

// async componentDidUpdate(_, prevState) {
//   const { query, page } = this.state;

//   if (query !== prevState.query || page !== prevState.page) {
//     try {
//       this.setState({ isLoading: true });
//       const { photos, total_results } = await ImageService.getImages(
//         query,
//         page
//       );
//       if (!photos.length) {
//         this.setState({ isEmpty: true });
//         return;
//       }
//       this.setState(prevState => ({
//         photos: [...prevState.photos, ...photos],
//         showBtn: page < Math.ceil(total_results / 15),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   }
// }
