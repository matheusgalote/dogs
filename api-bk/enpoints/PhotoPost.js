import React from 'react'

const PhotoPost = () => {

  const [token, setToken] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [peso, setPeso] = React.useState('');
  const [idade, setIdade] = React.useState('');
  const [img, setImg] = React.useState('');


  function submitForm(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('img', img);
    formData.append('nome', nome);
    formData.append('idade', idade);
    formData.append('peso', peso);


    fetch('https://dogsapi.origamid.dev/json/api/photo', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: formData,
    })
      .then(resp => resp.json())
      .then(json => console.log(json))
  }

  return (
    <>
      <h1>Photo</h1>
      <form onSubmit={submitForm}>
        <label htmlFor='token'>token</label>
        <input type='text' value={token} onChange={({ target }) => setToken(target.value)} />
        <label htmlFor='nome'>nome</label>
        <input type='nome' value={nome} onChange={({ target }) => setNome(target.value)} />
        <label>peso</label>
        <input type='text' value={peso} onChange={({ target }) => setPeso(target.value)} />
        <label>idade</label>
        <input type='text' value={idade} onChange={({ target }) => setIdade(target.value)} />
        <label>image</label>
        <input type='file' onChange={({ target }) => setImg(target.files[0])} />
        <button>Enviar</button>
      </form>
    </>
  )
}

export default PhotoPost