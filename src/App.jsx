
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SideBar from './Pages/SideBar/SideBar';
import Carteira from './Pages/Carteira/Carteira';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { store } from './store.js';
import { Provider } from 'react-redux';
import axios from "axios";

const theme = createTheme({
    palette:{
      type: 'dark'
    },
    overrides: {
      MuiInput: {
        input: {
          "&::placeholder": {
            color: "white"
          },
          color: "white", // if you also want to change the color of the input, this is the prop you'd use
        }
      }
    }
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/wallet' element={<main id="main-conteudo"><SideBar /><Carteira/></main>}/>
        </Routes>
      
      </BrowserRouter>
    </Provider>  
    </ThemeProvider>
    
  );
}

export default App;
