import React from 'react'

const TokenPost = () => {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');


  function submitForm(event) {
    event.preventDefault();

    console.log(`
      username: ${username},
      password: ${password}
    `);

    fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(resp => resp.json())
      .then(json => {

        const {token} = json;

        setToken(token);
      })
  }

  return (
    <>
      <h1 style={{ wordBreak: 'break-all' }}>Token: {token && token}</h1>
      <form onSubmit={submitForm}>
        <label htmlFor='username'>Username</label>
        <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
        <label>Password</label>
        <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        <button>Enviar</button>
      </form>
    </>
  )
}

export default TokenPost