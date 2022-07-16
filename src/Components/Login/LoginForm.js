import React from 'react'
import { Link } from 'react-router-dom'
import { TOKEN_POST, USER_GET } from '../../api';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';

const LoginForm = () => {

  const username = useForm('');
  const password = useForm('');

  // SE O TOKEN JÁ ESTIVER NO LOCALSTORAGE APENAS BUSCA O USUÁRIO
  React.useEffect(() => {
    const storageToken = window.localStorage.getItem('token');

    if(storageToken) getUser(storageToken);

  }, []);


  // BUSCA O USUÁRIO DE ACORDO COM O TOKEN
  async function getUser(token) {

    const {url, options} = USER_GET(token);

    const resp = await fetch(url, options);
    const json = await resp.json();

    console.log(json)
  }

  // AUTENTICA USUÁRIO
  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {

      const {url, options} = TOKEN_POST({
        username: username.value,
        password: password.value
      });

      const resp = await fetch(url, options);
      const json = await resp.json();

      window.localStorage.setItem('token', json.token);

      getUser(json.token)
    }

  }

  return (
    <section>LoginForm
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Enviar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  )
}

export default LoginForm