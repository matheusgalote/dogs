import React from 'react';
import { useContext } from 'react'
import { UserContext } from '../../UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';
import styles from './PhotoComments.module.css';

const PhotoComments = (props) => {

  const { login } = useContext(UserContext)
  const commentsSection = React.useRef(null);
  const [comments, setComments] = React.useState(() => props.comments);

  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments])

  return (
    <>
      <ul ref={commentsSection} className={styles.comments}>
        {
          comments.map(comment => <li key={comment.id}><b>{comment.comment_author}</b>: <span>{comment.comment_content}</span></li>)
        }
      </ul>
      {login && <PhotoCommentsForm id={props.id} setComments={setComments}  />}
    </>
  )
}

export default PhotoComments