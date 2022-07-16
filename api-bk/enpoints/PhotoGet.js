import React from 'react'

const PhotoGet = () => {

  const [img, setImg] = React.useState('');

  function handle(event) {
    event.preventDefault();

    fetch('https://dogsapi.origamid.dev/json/api/photo')
      .then(resp => resp.json())
      .then(json => {
        console.log(json);

        setImg(json[0].src);
      });

  }

  return (
    <>
      <h1>Photo get</h1>
      {img && <img style={{ width: '200px' }} src={img} alt="a"/>}
      <form onSubmit={handle}>
        <label>Get</label>
        <input type='text' />
        <button>Get</button>
      </form>
    </>
  )
}

export default PhotoGet