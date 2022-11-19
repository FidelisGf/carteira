import { useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  valorTotal: null,
  list : []
}

const slice = createSlice({
  name: 'listReducer',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.list.push(action.payload);
    },
    setValorTotal: (state, action) => {
      state.valorTotal = action.payload
    }
  }
});

export const store = configureStore({
  reducer: {
    wallet: slice.reducer
  }
});

export const { addList, setValorTotal} = slice.actions;

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;