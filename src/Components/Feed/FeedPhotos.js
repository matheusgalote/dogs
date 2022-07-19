import React from 'react'
import FeedPhotosItem from './FeedPhotosItem'
import useFetch from '../../Hooks/useFetch';
import Error from '../../Helper/Error';
import Loading from '../../Helper/Loading';
import { PHOTOS_GET } from '../../api';
import styles from './FeedPhotos.module.css'

const FeedPhotos = ( { page, user, setModalPhoto, setInfinite } ) => {

  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {

    const fetchPhotos = async () => {
      const total = 3;
      const { url, options } = PHOTOS_GET({ page: page, total: 3, user: user })
      const { resp, json } = await request(url, options);

      if(resp && resp.ok && json.length < total) {
        setInfinite(false);
      }
    }

    fetchPhotos()

  }, [request, user, setInfinite, page]);

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