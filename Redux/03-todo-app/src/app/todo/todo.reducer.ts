import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear } from './todo.actions';

export const initialState: Todo[] = [];

// Crear
// retorna un nuevo arreglo, un nuevo estado, esto para evitar la mutación del estado
// Por eso no hacemos push sino que retornamos un nuevo arreglo con una nueva instancia

const _todoReducer = createReducer(
  initialState,
  on(crear, (state, { text }) => [...state, new Todo(text)]),
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}