import { useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  valorTotal: 0,
  list : []
}

const slice = createSlice({
  name: 'listReducer',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.list.push(action.payload);
    },
    removeList:(state, action) => {
      state.list.splice(action.payload.index, 1);
    },
    setValorTotal: (state, action) => {
      state.valorTotal = action.payload.vlFinal
    }
  }
});

export const store = configureStore({
  reducer: {
    wallet: slice.reducer
  }
});

export const { addList, removeList, setValorTotal} = slice.actions;

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;