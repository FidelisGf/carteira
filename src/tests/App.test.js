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
      
        const page = screen.getByTestId('login-page');
      
        expect(page).toBeInTheDocument();
    });

    it('Should render Wallet Page when the path is /wallet', () => {
        window.history.pushState({}, 'Wallet Page', '/wallet');
      
        render(<App />);
      
        const page = screen.getByTestId('wallet-page');
      
        expect(page).toBeInTheDocument();
    });
})