import React from 'react'
import { COMMENT_POST } from '../../api';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';
import Error from '../../Helper/Error';

const PhotoCommentsForm = ({ id, setComments }) => {

  const {request, error} = useFetch();
  const [comment, setComment] = React.useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const token = window.localStorage.getItem('token');

    const {url, options} = COMMENT_POST(id, token, {comment});
    const {resp, json} = await request(url, options);

    if(resp.ok) {
      setComment('');
      setComments(comments => [...comments, json])
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <textarea placeholder="comente..." id="comment" name="comment" value={comment} onChange={({target}) => setComment(target.value)} />
      <button><Enviar /></button>
      <Error error={error} />
    </form>
  );
}

export default PhotoCommentsForm