import React from 'react'

const UserPost = () => {

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  function submitForm(event) {
    event.preventDefault();

    console.log(`
      username: ${username},
      email: ${email},
      password: ${password}
    `);

    fetch('https://dogsapi.origamid.dev/json/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
      .then(resp => resp.json())
      .then(json => console.log(json))
  }

  return (
    <>
      <h1>User</h1>
      <form onSubmit={submitForm}>
        <label htmlFor='username'>Username</label>
        <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
        <label htmlFor='email'>Email</label>
        <input type='email' value={email} onChange={({ target }) => setEmail(target.value)} />
        <label>Password</label>
        <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        <button>Enviar</button>
      </form>
    </>
  )
}

export default UserPost