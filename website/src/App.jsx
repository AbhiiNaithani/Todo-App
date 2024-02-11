

import Todos from './components/Todos.jsx'
import NavBar from './components/NavBar.jsx'
import { useState } from 'react'

function App() {
  const [mode, setMode] = useState("AllTodos");

  function ModeHandler(m){
    setMode((_) => m);
    console.log(mode);
}
  return (
    <div className='main-container'>
    <NavBar 
    activeMode={mode} setActiveMode={ModeHandler}
    />
    <Todos/>
    </div>
  )
}

export default App
