import React from 'react'
import { TOKEN_POST, USER_GET } from './api';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {

  const [user, setUser] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function userLogin(username, password) {
    const {url, options} = TOKEN_POST({username, password});
    console.log(url, options)
    const tokenResp = await fetch(url, options);
    const {token} = await tokenResp.json();

    console.log(token)

    window.localStorage.setItem('token', token);

    getUser(token);
  }

  async function getUser(token) {

    if (token) {
      const { url, options } = USER_GET(token)

      const resp = await fetch(url, options);
      const json = await resp.json()

      setUser(json);
      setLogin(true);
    }
  }

  return (
    <UserContext.Provider value={{ userLogin, user }}>
      {children}
    </UserContext.Provider>
  )
}
