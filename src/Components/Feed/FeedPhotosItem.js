import React from 'react'
import styles from './FeedPhotosItem.module.css'


const FeedPhotosItem = ({photo, setModalPhoto}) => {

  function handleClick() {
    setModalPhoto(photo)
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
      <span>{photo.acessos}</span>
      <img src={photo.src} alt={photo.title} />
    </li>
  )
}

export default FeedPhotosItem