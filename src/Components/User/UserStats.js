import React from 'react'
import { STATS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Loading from '../../Helper/Loading';
import Error from '../../Helper/Error';
import Head from '../../Helper/Head';

const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();
      await request(url, options);
    }
    getData();

  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />
  if (!data) return null;

  return (
    <React.Suspense fallback={<div></div>}>
      <Head title="Estatisticas" />
      <UserStatsGraphs data={data} />
    </React.Suspense>
  )
}

export default UserStats