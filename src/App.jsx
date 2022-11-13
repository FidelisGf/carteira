
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SideBar from './Pages/SideBar/SideBar';
import Carteira from './Pages/Carteira/Carteira';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
const theme = createTheme({
    palette:{
      type: 'dark'
    },
    menuItem: {
      selectedTextColor: 'white',
      
    },
    overrides: {
      MuiSelect: {
          select: {
              "&:focus": {
                  background: "#3A3660"
              },
              color:'white'
          }
      },
   }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
        
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/wallet' element={<main id="main-conteudo"><SideBar /><Carteira/></main>}/>
          
        </Routes>
    

    </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App;
