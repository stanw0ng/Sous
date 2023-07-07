import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.scss";

const Home = function(props) {

  return (
    <article className="homepage">
      <img src="https://media.cntraveler.com/photos/5a79f229c089be6f3a030ad3/16:9/w_1600,c_limit/Rochelle-ICA__2018_2017_11_02_ROCHELLE_ICA_83182.jpg"/>
      
      <div className="landing-box">
        <h1>Sous</h1>
        <h2>Serving communities, recipe by recipe</h2>

        <div className="control-btns">
          <Link to="/explore">
            <button>Explore New Recipes</button>
          </Link>
          <Link to="/recipes">
            <button>View Your Recipes</button>
          </Link>
        </div>
        
      </div>

    </article>
  );
};

export default Home;