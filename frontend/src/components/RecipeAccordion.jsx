/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/recipe_accordion.scss";
import SendLinkForm from "./SendLinkForm";
import Popup from "./Popup";
import AddRecipeForm from "./AddRecipeForm";
import Loop from "./LoopScroll";
import UserInfo from "./UserInfo";

const RecipeAccordion = ({ recipes, userId, deleteRecipe, createMessage, userBooks, addRecipe }) => {
  const [selected, setSelected] = useState([]);
  const [recipesState, setRecipesState] = useState(recipes);
  const [showSendPopup, setShowSendPopup] = useState(false);
  const [selectedRecipeForPopup, setSelectedRecipeForPopup] = useState(null);

  useEffect(() => {
    setRecipesState(recipes);
  }, [recipes]);

  const handleSendRecipeLink = (id, subjectType, event) => {
    event.stopPropagation();
    setShowSendPopup(true);
    setSelectedRecipeForPopup({ id, subjectType });
  };

  const closePopup = () => {
    setShowSendPopup(false);
    setSelectedRecipeForPopup(null);
  };

  const toggle = (i, event) => {
    event.stopPropagation();
    const selectedRecipeId = recipes[i].id;
    if (selected.includes(selectedRecipeId)) {
      setSelected(selected.filter((id) => id !== selectedRecipeId));
    } else {
      setSelected([...selected, selectedRecipeId]);
    }
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    await deleteRecipe(id);
    setRecipesState(recipesState.filter((recipe) => recipe.id !== id));
  };

  const dataReady = recipes.length > 0; // Check if the books data is available
  const parentHeight = document.querySelector('.recipe-accordions-wrapper')?.offsetHeight;

  return (
    <article className="recipe-accordions-wrapper">
    {/* <h1>Explore New Recipes</h1> */}
    {/* <Loop dataReady={dataReady} parentHeight={parentHeight}> */}

      {showSendPopup && (
        <div className="popup-overlay">
          <div className="popup-form">
            <SendLinkForm
              subjectType={selectedRecipeForPopup.subjectType}
              subjectId={selectedRecipeForPopup.id}
              onClose={closePopup}
              createMessage={createMessage}
            />
          </div>
        </div>
      )}

      {recipesState.map((item, i) => (
        <div
          className={selected.includes(item.id) ? 'recipe-accordion selected' : 'recipe-accordion'}
          key={item.id}
          onClick={(event) => toggle(i, event)}
        >
          <div className="banner">
            <div className="banner-left">
              <Link to={`/recipes/${item.id}`}>
                <h1>{item.name}</h1>
              </Link>
              <h2>by: <UserInfo userId={item.user_id}/></h2>
            </div>
            <div className="banner-right">
              <h2 className="toggle">{selected.includes(item.id) ? '-' : '+'}</h2>
              <img className="banner-image" src={item.image} alt="Recipe" />
            </div>
          </div>
          <div className={selected.includes(item.id) ? 'content show' : 'content'}>
            <h2>Cooktime: {item.cooktime_minutes} min</h2>
            <h2>Description: <p>{item.description}</p></h2>

            <div className="bottom-content">
              <div className="categories">
                <h2>Categories:</h2>
                  <div className="tags">
                    {item.is_vegan && <span className="category">Vegan</span>}
                    {item.is_vegetarian && <span className="category">Vegetarian</span>}
                    {item.is_nutfree && <span className="category">Nut-free</span>}
                    {item.is_lowcarb && <span className="category">Low-Carb</span>}
                    {item.is_glutenfree && <span className="category">Gluten-free</span>}
                    {item.is_lactosefree && <span className="category">Lactose-free</span>}
                  </div>
              </div>
              {userId && (
                <div className="control-buttons">
                  <button onClick={(event) => handleDelete(item.id, event)}>Delete Recipe</button>
                  <Link to={`/recipes/edit/${item.id}`}>
                    <button>Edit Recipe</button>
                  </Link>
                  <button onClick={(event) => handleSendRecipeLink(item.id, "Recipe", event)}> Send Recipe </button>

                  <Popup popupMessage={'Add to Book'} userBooks={userBooks} item={item} addRecipe={addRecipe}>
                    <AddRecipeForm />
                  </Popup>
                </div>
              )}
            </div>
          </div>
            
        </div>
      ))}
      {/* </Loop> */}
    </article>
  );
};

export default RecipeAccordion;
