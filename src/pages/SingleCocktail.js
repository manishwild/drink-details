import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [cocktail, setCocktail] = useState(null)

  // we can use function inside useEffect instead of creating it outside and acalling inside.
  useEffect(() => {
    setLoading(true)
    async function getDrink() {
      try {
        const response = await fetch(`${url}${id}`)
        const data = await response.json()
        // console.log(data)

        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strMeasure1,
            strMeasure2,
            strMeasure3,
            strMeasure4,
            strMeasure5,
          } = data.drinks[0]

          const ingredient = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]
          const measurement = [
            strMeasure1,
            strMeasure2,
            strMeasure3,
            strMeasure4,
            strMeasure5,
          ]
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredient,
            measurement,
          }
          setCocktail(newCocktail)
        } else {
          setCocktail(null)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getDrink()
  }, [id])
  if (loading) {
    return <Loading />
  }
  if (!cocktail) {
    return <h2 className="section-title">No Drinks to display: </h2>
  }
  const {
    name,
    image,
    info,
    category,
    glass,
    instructions,
    ingredient,
    measurement,
  } = cocktail
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />

        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>{' '}
          <p>
            <span className="drink-data">Info:</span>
            {info}
          </p>{' '}
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>{' '}
          <p>
            <span className="drink-data">Instruction:</span>
            {instructions}
          </p>
          <p className="drink-data">
            Ingredients:
            {ingredient.map((item, index) => {
              const mesurmentContent = measurement[index]
              return item ? (
                <span key={index}>
                  {mesurmentContent}
                  {item},
                </span>
              ) : null
            })}
          </p>
          {/* <p className="drink-data">
            mesurement:
            {measurement.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null
            })}
          </p> */}
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
