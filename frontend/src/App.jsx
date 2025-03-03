import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

{/*Providers*/}
import { UnreadMessagesProvider } from './hooks/providers/UnreadMessagesProvider';
import RecipeEditModeProvider  from './hooks/providers/recipeEditMode';

{/*Page Components*/ }

import Home from './components/pages/Home';

import Login from './components/pages/Login';
import Register from './components/pages/Register';

import RecipesList from './components/pages/RecipesList';
import Recipe from './components/pages/Recipe';
import NewRecipe from './components/pages/NewRecipe';
import EditRecipe from './components/pages/EditRecipe';

import Books from './components/pages/Books';
import NewBook from './components/pages/NewBook';
import BookRecipes from './components/pages/BookRecipes';

import Explore from './components/pages/Explore';
import Search from './components/pages/Search';

import GroceryLists from './components/pages/GroceryLists';
import GroceryList from './components/pages/GroceryList';

import Profile from './components/pages/Profile';

import Inbox from './components/pages/Inbox';

{/*Single Components*/}
import Template from './components/Template';

const App = function() {


  return (

    <div className="App">
      <Router>
        <UnreadMessagesProvider>
          <Template>

            <Routes>

              <Route path='/' element={<Home/>} />

              <Route path='/recipes'>
                <Route index element={<RecipesList />}/>
                <Route path=':id' element={<Recipe/>}/>
                <Route path='new' element={<NewRecipe/>}/>
                <Route path='edit/:id' element={
                  <RecipeEditModeProvider>
                    <EditRecipe/>
                  </RecipeEditModeProvider>
                }/>
              </Route>
              
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>

              <Route path='/explore' element={<Explore/>}/>
              <Route path='/search' element={<Search/>}/>

              <Route path='/books'>
                <Route index element={<Books/>}/>
                <Route path=':id' element={<BookRecipes />}/>
                <Route path='new' element={<NewBook/>}/>
              </Route>

              <Route path='/grocerylists'>
                <Route index element={<GroceryLists/>}/>
                <Route path=':id' element={<GroceryList/>}/>
              </Route>
              
              <Route path='/profile'>
                <Route path=':id' element={<Profile/>}/>
              </Route>

              <Route path='/inbox'>
                <Route index element={<Inbox/>}/>
              </Route>

            </Routes>

          </Template>
        </UnreadMessagesProvider>
      </Router>

    </div>
  );

};

export default App;
