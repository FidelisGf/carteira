import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import { store } from '../store';

function renderWithProvider(element) {
    render(
      <Provider store={store}>
        <BrowserRouter>
          { element }
        </BrowserRouter>
      </Provider>
    );
  }

  describe('Test usage of Login page', () => {
    it('Should get email input value', () => {
      renderWithProvider(<Login />);

      const emailInput = screen.getByTestId('email');

      fireEvent.change(emailInput, { target : {
        value: 'test@gmail.com'
      }});

      expect(emailInput).toHaveValue('test@gmail.com')

    });

    it('Should get password input value', () => {
      renderWithProvider(<Login />);

      const passwordInput = screen.getByTestId('password');

      fireEvent.change(passwordInput, { target : {
        value: 'password123'
      }});

      expect(passwordInput).toHaveValue('password123')

    });

    it('Should have both entries when clicking the login button', () => {
      renderWithProvider(<Login />);

      const passwordInput = screen.getByTestId('password');
      const emailInput = screen.getByTestId('email');
      const loginButton = screen.getByTestId('login_btn');

      expect(loginButton).toBeInTheDocument();

      fireEvent.change(emailInput, { target : {
        value: 'test@gmail.com'
      }});

      fireEvent.change(passwordInput, { target : {
        value: 'password123'
      }});

      fireEvent.click(loginButton);

      expect(passwordInput).toHaveValue('password123')
      expect(emailInput).toHaveValue('test@gmail.com')
    });

    it('Should email and password error message appear', () => {
      renderWithProvider(<Login />);

      const passwordInput = screen.getByTestId('password');
      const emailInput = screen.getByTestId('email');
      const loginButton = screen.getByTestId('login_btn');

      expect(loginButton).toBeInTheDocument();

      fireEvent.change(emailInput, { target : {
        value: 'asdfASDFVCXZ.com'
      }});

      fireEvent.change(passwordInput, { target : {
        value: 'pwF4ke'
      }});

      fireEvent.click(loginButton);

      const loginPage = screen.getByTestId('login-page');
  
      expect(loginPage).toBeInTheDocument('Formato de email invalido');

      expect(loginPage).toBeInTheDocument('Senha invalida (deve conter letras maiusculas, minusculas e pelo menos um caracter especial)');

    });
  });