import React from 'react'
import FeedModal from './FeedModal'
import FeedPhotos from './FeedPhotos'

const Feed = ({ user }) => {

  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1, 2]);
  const [infinite, setInfinite] = React.useState(true);

  console.log(infinite)

  React.useEffect(() => {

    let wait = false;
    function infiteScrool() {

      if(infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;

        if(scroll > height * .75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);

          wait = true;

          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }

      window.addEventListener('wheel', infiteScrool);
      window.addEventListener('scroll', infiteScrool);
    }

    return () => {
      window.removeEventListener('wheel', infiteScrool);
      window.removeEventListener('scroll', infiteScrool);
    }
  }, [infinite]);

  return (
    <div>
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />}
      {
        pages.map(page => (
          <FeedPhotos key={page} page={page} user={user} setModalPhoto={setModalPhoto} setInfinite={setInfinite} />
        ))
      }
    </div>
  )
}

export default Feed