import React from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {

  const [user, setUser] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(async () => {
    setUser(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');

    navigate('/login');

  }, [navigate])

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });
      console.log(url, options)
      const tokenResp = await fetch(url, options);
      const { token } = await tokenResp.json();

      console.log(tokenResp)

      if (!tokenResp.ok) throw new Error(`Error: Usuário inválido`);
      console.log(token)

      window.localStorage.setItem('token', token);

      await getUser(token);
      navigate('/conta');
    }
    catch (error) {
      setError(error.message);
      setLogin(false);
    }
    finally {
      setLoading(false);
    }
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


  React.useEffect(() => {
    async function autoLogin() {
      const storageToken = window.localStorage.getItem('token');

      if (storageToken) {

        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(storageToken);

          const resp = await fetch(url, options);

          if (!resp.ok) {
            throw new Error('Token inválido');
          }

          await getUser(storageToken);
        }
        catch (error) {
          userLogout();
        }
        finally {
          setLoading(false);
        }
      }
    }

    autoLogin();
  }, [userLogout]);



  return (
    <UserContext.Provider value={{ userLogin, userLogout, user, error, loading, login }}>
      {children}
    </UserContext.Provider>
  )
}
