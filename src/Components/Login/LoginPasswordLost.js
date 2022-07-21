import React from 'react'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../api';
import Error from '../../Helper/Error';

const LoginPasswordLost = () => {
  const login = useForm();
  const {data, loading, error, request} = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    if(login.validate()) {
      const {url, options} = PASSWORD_LOST({login: login.value, url: window.location.href.replace('perdeu', 'resetar')});

      const {json, resp} = await request(url, options);

      console.log(json, resp)
    }
  }

  if(data) return <p>Email Enviado!</p>
  return (
    <section className='animeLeft'>
      <h1 className='title'>Perdeu senha?</h1>
      <Error error={error} />
      <form onSubmit={handleSubmit}>
        <Input label="Email / Usuário" type="text" name="email" {...login} />
        {loading ? <Button disabled>Enviando...</Button> : <Button>Enviar Email</Button>}
      </form>
    </section>
  )
}

export default LoginPasswordLost