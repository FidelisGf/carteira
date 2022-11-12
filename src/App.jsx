
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login'
import SideBar from './Pages/Login/SideBar/SideBar';
import Carteira from './Pages/Login/Carteira/Carteira';
function App() {
  return (
    <BrowserRouter>
     
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/carteira' element={<main id="main-conteudo"><SideBar /><Carteira/></main>}/>
         
        </Routes>
      
  
    </BrowserRouter>
  );
}

export default App;
