import styles from './index.module.css'
import React, { useEffect, useState, useCallback } from 'react'
import { Pokemon } from '@api/shared-types'

export function Index({ q, p: initialPokemon}: { q: string, p: Pokemon }) {
  const [ search, setSearch ] = useState(q)
  const [ pokemon, setPokemon ] = useState<Pokemon[]>([])
  
  useEffect(() => {
    fetch(`http://localhost:3333/search?q=${search}`)//, {mode: 'no-cors'})
      //mode no-cors, make the response opaque, i.e. client side code can not access it
      .then(res => res.json())
      .then(data => setPokemon(data))
      
  }, [search])

  const onSetSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), []
  )

  return (
    <div className={styles.page}>
      Search:
      <input
        value={search}
        onChange={onSetSearch}
      />  
      <ul>
        {pokemon.map(
          ({ name: { english }, id }) => <li key={id}>{english}</li>
        )}
      </ul>
    </div>
  )
}

// for SSR server side rendering
export async function getServerSideProps(context) {
  let pokemon = []
  if (context.query.q) {
    const res = await fetch(`http://localhost:3333/search?q=${context.query.q}`)
    pokemon = await res.json()
      
  }
  return {
    props: {
      q: context.query.q ?? '',
      p: pokemon,
    },
  }
}

export default Index
