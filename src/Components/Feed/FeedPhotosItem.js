import React from 'react'
import styles from './FeedPhotosItem.module.css'


const FeedPhotosItem = ({photo}) => {

  console.log(photo);
  return (
    <li className={styles.photo}>
      <span>{photo.acessos}</span>
      <img src={photo.src} alt={photo.title} />
    </li>
  )
}

export default FeedPhotosItem