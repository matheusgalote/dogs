import React from 'react';
import { useContext } from 'react'
import { UserContext } from '../../UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';
import styles from './PhotoComments.module.css';

const PhotoComments = (props) => {

  const { login } = useContext(UserContext)
  const [comments, setComments] = React.useState(() => props.comments);

  return (
    <div>
      <ul>
        {
          comments.map(comment => <li key={comment.id}><b>{comment.comment_author}</b>: <span>{comment.comment_content}</span></li>)
        }
      </ul>
      {login && <PhotoCommentsForm id={props.id} setComments={setComments}  />}
    </div>
  )
}

export default PhotoComments