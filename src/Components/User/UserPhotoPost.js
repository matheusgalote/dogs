import React from 'react'
import styles from './UserPhotoPost.module.css';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Error from '../../Helper/Error';
import { PHOTO_POST } from '../../api';
import { useNavigate } from 'react-router-dom';

const UserPhotoPost = () => {

  const nome = useForm();
  const peso = useForm('');
  const idade = useForm('');
  const [img, setImg] = React.useState({});
  const {data, error, loading, request} = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    data && navigate('/conta');
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');
    const {url, options} = PHOTO_POST(token, formData);

    request(url, options);
  }

  function handleImg({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0]
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      {error && <Error error={error} />}
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso}/>
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input className={styles.file} type="file" name="img" id="img"  onChange={handleImg} />
        {loading ? <Button disabled>Enviando...</Button> : <Button>Enviar</Button>}
      </form>
      <div>
        {img.preview && <div className={styles.preview} style={{ backgroundImage: `url('${img.preview}')` }}></div>}
      </div>
    </section>
  )
}

export default UserPhotoPost