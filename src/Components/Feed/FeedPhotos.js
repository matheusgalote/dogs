import React from 'react'
import FeedPhotosItem from './FeedPhotosItem'
import useFetch from '../../Hooks/useFetch';
import Error from '../../Helper/Error';
import Loading from '../../Helper/Loading';
import { PHOTOS_GET } from '../../api';
import styles from './FeedPhotos.module.css'

const FeedPhotos = ( {setModalPhoto} ) => {

  const { data, loading, error, request } = useFetch();


  React.useEffect(() => {

    const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 9062 })

    const fetchPhotos = async () => {
      const { resp, json } = await request(url, options);
    }

    fetchPhotos()

  }, [request]);

  if (error) return <Error error={error} />
  if (loading) return <Loading />;

  if (data)
    return (
      <ul className={styles.feed}>
        {
          data.map(photo => <FeedPhotosItem key={photo.id} photo={photo} setModalPhoto={setModalPhoto} />)
        }
      </ul>
    );
  else return null;
}

export default FeedPhotos