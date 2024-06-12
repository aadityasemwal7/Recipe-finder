import "./App.css"
import React, {useState, useEffect} from "react"
import axios from "axios"
import BrandLogo from "./assets/logo.png"

const App = () => {
  const [recipes, setRecipes] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    console.log(recipes)
  }, [recipes])

  const fetchRecipe = async(query) => {
    const app_id = '0ec083b9'
    const app_key = "1edf422a4e8ed0c50f3dcc1c9c2b1bf6"
    const url = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`
    if(query.trim().length !== 0){
      try{
        const response = await axios.get(url)
        setRecipes(response.data.hits.map(hit => hit.recipe))
        
      }catch(err){
        console.log("error during fetching the data!")
      }
    }
    
    
    
  }

  return (
    <div className='w-full bg-white h-24'>
      <nav>
        <ul className='flex items-center'>
          <li className='mx-2'><img width={80} src={BrandLogo}></img></li>
          <li className='ml-auto'>
            <input value={query} onChange={(e) => setQuery(e.target.value)} className='px-3 py-1 rounded-lg w-72 bg-gray-300' placeholder="search for recipes" />
            </li>
          <li><button onClick={() => fetchRecipe(query)} className='ml-1 mr-5 px-3 py-1' type="button">Find</button></li>
        </ul>
      </nav>
      <main className="recipe-grid flex flex-wrap justify-center">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card w-full md:w-1/3 lg:w-1/4 rounded overflow-hidden shadow-lg m-4">
            <img className="recipe-image" src={recipe.image} alt={recipe.label} width={150} />
            <div className="recipe-info px-6 py-4">
              <div className="recipe-title font-bold text-xl mb-2">{recipe.label}</div>
              
            </div>
            <div className="recipe-actions px-6 pt-4 pb-2 flex justify-start">
        
              <a className="text-center" href={recipe.url}><button className="view-recipe bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                View Recipe
              </button>
              </a>
            </div>
          </div>
        ))}
      </main>
      
    </div>
    
  )
}

export default App