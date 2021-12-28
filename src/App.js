import React, { useState, useEffect } from 'react'
import Recipe from './components/Recipe';
import "./App.css"


export default function App() {
  const appId = "89fdef12";
  const appKey = "8af9751f2768a859b6c1b4d51e0cdea6"
  // const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${appId}&app_key=${appKey}`;


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("panner");

  useEffect(() => {
    getRecipes();

  }, [name])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${name}&app_id=${appId}&app_key=${appKey}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  function updateSearch(e) {
    setSearch(e.target.value)
    // console.log(search);
  }

  function updateName(e) {
    e.preventDefault(); 
    setName(search);
    setSearch('');
  }
  return (
    <div className='main-container'>
      <h1 className='heading'>Recipe Spotter</h1>
      <p className='description'>Search Any Recipe By Entering Any Fruit Or Vegetable Name </p>
      <form onSubmit={updateName} className='search-from'>
        <input className='search-bar' type="text" value={search} onChange={updateSearch} />
        <button className='search-button' type='submit' >Search</button>

      </form>
      <div className="recipe">
        {recipes.map(recipe => (  
          <Recipe key={recipe.recipe.label}  
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

// export default App;
