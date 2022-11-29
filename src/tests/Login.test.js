import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import { store } from "../store";
import App from "../App";

function renderWithProvider(element) {
  render(
    <Provider store={store}>
      <BrowserRouter>{element}</BrowserRouter>
    </Provider>
  );
}

describe("Test usage of Login page", () => {
  it("Should get email input value", () => {
    renderWithProvider(<Login />);

    const emailInput = screen.getByTestId("email");

    fireEvent.change(emailInput, {
      target: {
        value: "test@gmail.com",
      },
    });

    expect(emailInput).toHaveValue("test@gmail.com");
  });

  it("Should get password input value", () => {
    renderWithProvider(<Login />);

    const passwordInput = screen.getByTestId("password");

    fireEvent.change(passwordInput, {
      target: {
        value: "password123",
      },
    });

    expect(passwordInput).toHaveValue("password123");
  });

  it("Should have both entries when clicking the login button", () => {
    renderWithProvider(<Login />);

    const passwordInput = screen.getByTestId("password");
    const emailInput = screen.getByTestId("email");
    const loginButton = screen.getByTestId("login_btn");

    expect(loginButton).toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: {
        value: "test@gmail.com",
      },
    });

    fireEvent.change(passwordInput, {
      target: {
        value: "password123",
      },
    });

    fireEvent.click(loginButton);

    expect(passwordInput).toHaveValue("password123");
    expect(emailInput).toHaveValue("test@gmail.com");
  });

  it("Should email error message appear", () => {
    renderWithProvider(<Login />);

    const passwordInput = screen.getByTestId("password");
    const emailInput = screen.getByTestId("email");
    const loginButton = screen.getByTestId("login_btn");    

    expect(loginButton).toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: {
        value: "asdfASDFVCXZ.com",
      },
    });

    fireEvent.change(passwordInput, {
      target: {
        value: "pwF4ke#123",
      },
    });     
    
    expect(passwordInput).toHaveValue("pwF4ke#123");
    expect(emailInput).toHaveValue("asdfASDFVCXZ.com");  
 
    fireEvent.click(loginButton); 
    const emailErrorSpan = screen.getByTestId("emailError-id");     
    expect(emailErrorSpan.innerText).toBe('Formato de email invalido');
  });
  it("Should password error message appear", () => {
    renderWithProvider(<Login />);

    const passwordInput = screen.getByTestId("password");
    const emailInput = screen.getByTestId("email");
    const loginButton = screen.getByTestId("login_btn");

    expect(loginButton).toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: {
        value: "teste@outlook.com",
      },
    });

    fireEvent.change(passwordInput, {
      target: {
        value: "pwF4ke",
      },
    });

    fireEvent.click(loginButton);    
    const passwordErrorSpan = screen.getByTestId("passwordError-id");     
    expect(passwordErrorSpan.innerText).toBe('Senha invalida (deve conter letras maiusculas, minusculas e pelo menos um caracter especial)');     
  });  
  it("Should enter when login and password is valid", () => {
    renderWithProvider(<Login />);

    const passwordInput = screen.getByTestId("password");
    const emailInput = screen.getByTestId("email");
    const loginButton = screen.getByTestId("login_btn");

    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: {
        value: "teste@outlook.com",
      },
    });

    fireEvent.change(passwordInput, {
      target: {
        value: "pwF4ke#123",
      },
    });

    fireEvent.click(loginButton);   
    const passwordErrorSpan = screen.getByTestId("passwordError-id");     
    expect(passwordErrorSpan.innerText).toBe(undefined);     
    const emailErrorSpan = screen.getByTestId("emailError-id");     
    expect(emailErrorSpan.innerText).toBe(undefined); 
  });
});
