// Importing React is essential, useEffect is a standard hook
import React, { useEffect } from 'react';
// You can import stylesheets directly rather than through link tags
import "./App.css";
// Include external components from libraries or your own creations
import { CommitteePage } from './pages/CommitteePage';

/*
The App Component acts as the entry point for our code. It is added to the DOM
in the index.js file which we rarely need to touch. 

React websites are actually single-page applications. This is where we update
the body of the document via JavaScript (or TypeScript etc.) instead of loading
new pages completely. As such, we need to do our routing in a slightly different
way to normal. In this component we would usually do the routing but as we only
have a single page in this example there is no need to do so.

On the live website we use react-router-dom to do routing:
https://github.com/Grey-College-Web-Committee/grey-shop/blob/master/frontend/src/App.js
*/
export const App = () => {
  /*
  "Hooks are functions that let you 'hook into' React state and lifecycles from function components"

  useEffect is a specific type of hook: it performs something after render and enables side effects.

  The first argument is the function that is called e.g. loading data or in this case setting the title
  (the bit you see in the tab name). The second argument tells react to call useEffect
  when the objects in the array are changed, these are your dependencies.

  If you have used class-based React components, this is similar to componentDidMount

  References:
  https://reactjs.org/docs/hooks-overview.html
  https://reactjs.org/docs/hooks-intro.html
  https://reactjs.org/docs/hooks-effect.html
  https://beta.reactjs.org/reference/react/useEffect
  https://beta.reactjs.org/reference/react/Component#componentdidmount
  */
  useEffect(() => {
    document.title = "React Workshop: Committees"
  }, []); 

  /*
  The code in the return looks very similar to HTML but it is actually something called
  JSX allowing you to combine logic with the markup. You'll see some of the useful things
  you can do in JSX in other components. In this case we are using a non-standard tag
  'CommitteePage', this is actually a component we have created instead!

  References:
  https://beta.reactjs.org/learn/writing-markup-with-jsx
  */
  return (
    <div>
      <div className="banner">
        <span>React Workshop: Committees</span>
        <a href="https://www.greyjcr.co.uk/" target="_blank" rel="noreferrer">
          <span>Grey JCR</span>
        </a>
      </div>
      <div className="core-container">
        <CommitteePage />
      </div>
    </div>
  )
}

