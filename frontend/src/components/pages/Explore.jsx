import React, { useEffect, useState } from "react";
import useApplicationData from "../../hooks/useApplicationData";
import RecipeAccordion from "../RecipeAccordion";
import Loop from "../LoopScroll"

const Explore = function(props) {

  const {
    state,
    getAllRecipes,
  } = useApplicationData();

  useEffect(() => {

      getAllRecipes();

  }, []);

  return (
    <article className="explore">
      <RecipeAccordion recipes={state.recipes}/>
    </article>
  );
};

export default Explore;