import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
import Card from './Card'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getServerSideProps() {
  const cards = await prisma.list.findMany()
  return {
    props: {cards}
  }
}

export default function Home({cards}: any) {

  interface card {
    name: string;
    id: string;
    text: string;
  }

  const [card, setcard] = useState({
    name: "",
    id: "",
    text: ""
  })

  const handleChange = (e: any) => {
    const input = e.target

    if(input.name == "name") {
      setcard({name: input.value, id: card.id, text: card.text})

    } else if(input.name == "id" && !isNaN(Number(input.value))) {
      setcard({name: card.name, id: input.value, text: card.text})

    } else if(input.name == "text") {
      setcard({name: card.name, id: card.id, text: input.value})
    }
  }

  const updatecards = async () => {
    const data = await fetch('/api/UpdateCards', {
      method: 'GET'
    }).then(res => res.text())
    cards = data
  }

  const handleAdd = async () => {
    const res = await fetch('/api/AddCard', {
      method:'POST',
      body: JSON.stringify({name: card.name, text: card.text})
    })
    updatecards()
  }

  const handleDelete = async () => {
    const res = await fetch('/api/DeleteCard', {
      method: 'DELETE',
      body: JSON.stringify({id: Number(card.id)})
    })
  }

  const handleSearch = async () => {
    console.log(cards)
  }

  return (

    <div className={styles.container}>

      <Head>
        <title>Database practice</title>
        <meta name="description" content="A test for learn backend development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>

          <div className={styles.inputs}>
            <label>Name: <input name="name" type="text" value={card.name} onChange={handleChange}/></label>
            <label>ID: <input name="id" type="text" value={card.id} onChange={handleChange}/></label>
            <label>Text: <textarea name='text' onChange={handleChange} value={card.text}></textarea></label>
          </div>

          <div className={styles.buttons}>
            <button onClick={handleAdd} className={styles.AddButton}>Add</button>
            <button onClick={handleDelete} className={styles.DeleteButton}>Delete</button>
            <button onClick={handleSearch} className={styles.SearchButton}>Search</button>
          </div>

        </div>


        <div className={styles.cards}>
          {cards.map((card: card) => <Card name={card.name} id={card.id} text={card.text} />)}
        </div>
      </main>
    </div>
  )
}
