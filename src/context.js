import React, { createContext, useCallback, useContext, useState } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('a')
  const [cocktails, setCocktails] = useState([])

  const fetchDrinks = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()
      const { drinks } = data
      if (drinks) {
        const newDrinks = drinks.map((drink) => {
          const { idDrink, strDrinkThumb, strDrink, strAlcoholic, strGlass } =
            drink
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            infi: strAlcoholic,
            glass: strGlass,
          }
        })
        setCocktails(newDrinks)
      } else {
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  },[searchTerm])

  React.useEffect(() => {
    fetchDrinks()
  }, [searchTerm,fetchDrinks])

  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
