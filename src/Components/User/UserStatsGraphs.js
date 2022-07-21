import React from 'react'
import {VictoryPie, VictoryChart, VictoryBar} from 'victory';
import styles from './UserStatsGraps.module.css';

const UserStatsGraphs = ({ data }) => {
  const [graph, seGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {

    const graphPie = data.map(({title, acessos}) => {
      return {
        x: title,
        y: Number(acessos)
      }
    })

    seGraph(graphPie)

    if(data) setTotal(data.map(({acessos}) => Number(acessos)).reduce((a, b) => a+b))
  }, [data])


  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={styles.total}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie data={graph} innerRadius={50} padding={{top: 20, bottom: 20, left: 80, right: 80}}/>
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment='start' data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  )
}

export default UserStatsGraphs