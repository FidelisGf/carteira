import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testing app routes', () => {
    beforeEach(() => {
        const currentState = window.history.state
        window.history.replaceState(currentState, '', '/');
    })

    it('Should render Login Page when the path is /', () => {
        window.history.pushState({}, 'Login Page', '/');
      
        render(<App />);
      
        const loginPage = screen.getByTestId('login-page');
      
        expect(loginPage).toBeInTheDocument();
      });
})