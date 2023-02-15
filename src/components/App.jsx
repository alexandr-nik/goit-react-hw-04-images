import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { AxiosPaxabay } from './ApiPixabay';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { errorMessage } from './message';

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
    setQ(q);
    setPage(1);
    setGalleryList([]);
    setTotalHits(null);
  };

   useEffect(() => {
    if (q === '') {
      return;
    }
    setLoader(true);
    const controller = new AbortController();
    async function getImages() {
      try {
        await AxiosPaxabay(page, q, {
          signal: controller.signal,
        }).then(data => {
          setGalleryList(prev => [...prev, ...data.hits]);
          setTotalHits(data.totalHits);
          if (data.totalHits === 0) errorMessage('Sorry. Image not found :(');          
        });
      } catch (error) {
        errorMessage(error);
      } finally {
         setLoader(false);
      }
    }
    getImages();
    return controller.abort();
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
