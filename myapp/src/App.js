
import './App.css';
import './Fonts.css'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register';
import ProtectedRoutes from './Components/ProtectedRoutes';
const Protected = () =>{
  return (<>
  <h2>
    Hey
  </h2>
  </>)
}

function App() {
  console.log(1)
  return (
    
    
        <Routes>
          <Route path='/login' element = {<Login/>} />
          <Route path = '/register' element = {<Register/>} />
          <Route path = '/unauthorized' element = {<>
            <h2> unauthorized </h2>
          </> } />
          <Route element = { <ProtectedRoutes allowedRoles={[1984]} /> }>
              <Route path = "protected" element = {<Protected />} />
          </Route>
        </Routes>
  
   );
}

export default App;
