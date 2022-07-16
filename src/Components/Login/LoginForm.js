import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../../Helper/Error';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';

const LoginForm = () => {

  const username = useForm('');
  const password = useForm('');

  const { userLogin, error, loading } = React.useContext(UserContext);

  // AUTENTICA USUÁRIO
  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value)
    }
  }

  return (
    <section className='animeLeft'>
      <h1 className='title'>Login</h1>
      {error && <Error error={error} />}
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? <Button disabled>Carregando...</Button> : <Button>Enviar</Button>}
      </form>
      <Link to="/login/perdeu" className={styles.perdeu}>Perdeu a senha?</Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <Link to="/login/criar" className={styles.perdeu}>Ainda não possui conta? Cadastre-se no site.</Link>
      </div>
    </section>
  )
}

export default LoginForm