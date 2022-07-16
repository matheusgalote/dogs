import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Dogs } from '../Assets/dogs.svg';
import { UserContext } from '../UserContext';


const Header = () => {

  const { user, userLogout } = React.useContext(UserContext);

  console.log(user)

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label='Dogs - Home'><Dogs /></Link>
        <Link className={styles.login} to={user ? '/conta' : '/login'}>{user ? user.username : 'Login / Criar'}</Link>
        {user && <button onClick={userLogout}>Sair</button>}
      </nav>
    </header>
  )
}

export default Header