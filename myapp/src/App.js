
import './App.css';
import './Fonts.css'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register';
import { useAuth } from './Components/AuthContext';
const PrivateRoute = ({children}) => {
  const {authenticated} = useAuth()
  console.log(authenticated)
  return(
    authenticated ? (children):<Navigate to = "/login"/>
  )
}

const Protected = () =>{
  return (
    <h2>
      protected
    </h2>
  )
}

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path='/login' element = {<Login/>} />
        <Route path = '/register' element = {<Register/>} />
        <Route path = '/protected' element = {<PrivateRoute/>} >
          <Route element = {<Protected/>} />
        </Route>
      </Routes>
    </Router>
  
   );
}

export default App;
