
import './App.css';
import './Fonts.css'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register';
import ProtectedRoutes from './Components/ProtectedRoutes';
import ParentScroll from './Components/ParentScroll';
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
          <Route path = "/feed" element = {<ParentScroll />} />
          <Route element = { <ProtectedRoutes allowedRoles={["ADMIN"]} /> }>
              <Route path = "protected" element = {<Protected />} />
          </Route>
        </Routes>
  
   );
}

export default App;
