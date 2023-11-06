import styles from '../styles/Home.module.css'

export default function Card({name, id, text} : {name: String; id: String; text: String}) {
  return (
    <div className={styles.card}>
        <div className='id'>ID: {id}</div>
        <div className='name'>Name: {name}</div>
        <div className='text'>{text}</div>
    </div>
  )
}
