import React from 'react'
import { PASSWORD_RESET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../../Helper/Error';
import { useNavigate } from 'react-router-dom';

const LoginPasswordReset = () => {
  const [login, setLogin]  = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm();
  const {error, loading, request} = useFetch();
  const navigate = useNavigate();


  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');

    console.log(params);
    if(key) setKey(key);
    if(login) setLogin(login)

  }, []);

  async function handleSubmit(event) {

    event.preventDefault();

    if(password.validate()) {
      const {url, options} = PASSWORD_RESET({login, key, password});
      const {resp} = await request(url, options);
      
      resp.ok && navigate('./login');
    }


  }

  return (
    <div>
      <h1 className='title'>Resetar senha</h1>
      {error && <Error error={error} />}
      <form onSubmit={handleSubmit}>
        <Input label="Nova Senha" type="password" name="password" {...password}/>
        {loading ? <Button disabled>Resetando...</Button> : <Button>Resetar</Button>}
      </form>
    </div>
  )
}

export default LoginPasswordReset