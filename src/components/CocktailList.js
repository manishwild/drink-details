import React from 'react'
import { useGlobalContext } from './../context'
import Loading from './Loading'
import Cocktail from './Cocktail';

const CocktailList = () => {
  const { cocktails, loading } = useGlobalContext()
  if (loading) {
    return <Loading />
  }
  if (cocktails.length < 1) {
    return (
      <h2 className="section-title">
        No cocktails matched your search criteria
      </h2>
    )
  }
  return (
    <section className='section'>
      <h2 className='section-title'>Cocktails</h2>
     <div className='cocktails-center' >{cocktails.map((drink)=> {
      return <Cocktail key={drink.id} {...drink}/>
     })}</div>
    </section>
  )
}

export default CocktailList
