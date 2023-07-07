import React, { useEffect, useState } from "react";
import GrocerylistAccordion from "../GrocerylistAccordion";

const GroceryLists = function(props) {

  return (
    <article className="grocery-lists">
      <h1>My Grocery Lists</h1>
      <GrocerylistAccordion/>
        
    </article>
  );

};

export default GroceryLists;