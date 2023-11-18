import { createReducer, on } from '@ngrx/store';
import { changeLanguage } from './language.actions';

let language = localStorage.getItem('language');
if (!language) {
  language = navigator.language.includes('pt') ? "pt" : "en";
  localStorage.setItem('language', language);
}

export const initialState = language;

export const languageReducer = createReducer(
  initialState,
  on(changeLanguage, (state, { language }) => language)
);