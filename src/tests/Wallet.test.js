import { fireEvent, getByText, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Carteira from '../Pages/Carteira/Carteira';
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

describe('Tests usage of Carteira page', () => {
  it('Shoud get description input description', async () => {
    renderWithProvider(<Carteira />);

    const insertBtn = screen.getByTestId('insertBtn')

    fireEvent.click(insertBtn);

    const inputDescription = screen.getByTestId('description')
    inputDescription.value = 'combustivel'

    expect(inputDescription).toHaveValue('combustivel');
  });

  it('Shoud get value input value', async () => {
    renderWithProvider(<Carteira />);

    const insertBtn = screen.getByTestId('insertBtn')

    fireEvent.click(insertBtn);

    const inputValue = screen.getByTestId('value')

    inputValue.value = 10

    expect(inputValue).toHaveValue(10);
  });

  it('Shoud get value input coin', async () => {
    renderWithProvider(<Carteira />);

    const insertBtn = screen.getByTestId('insertBtn')

    fireEvent.click(insertBtn);

    const inputCoin = screen.getByTestId('currency')

    inputCoin.value = 'USD'

    expect(inputCoin).toHaveValue('USD');
  });

  it('Shoud get value input payment', () => {
    renderWithProvider(<Carteira />);

    const insertBtn = screen.getByTestId('insertBtn')

    fireEvent.click(insertBtn);

    const inputPayment = screen.getAllByTestId('payment')[0]

    inputPayment.value = 'Dinheiro'

    expect(inputPayment).toHaveValue('Dinheiro');
  });

  it('Shoud get value input tag', async () => {
    renderWithProvider(<Carteira />);

    const insertBtn = screen.getByTestId('insertBtn')

    fireEvent.click(insertBtn);

    const inputTag = screen.getAllByTestId('tag')[0]

    inputTag.value = 'Lazer'

    expect(inputTag).toHaveValue('Lazer');
  });

  it('Should get amount', async () => {
    renderWithProvider(<Carteira />);

    const getAmount = screen.getByTestId('amount');

    expect(getAmount).toBeInTheDocument();
  });
});