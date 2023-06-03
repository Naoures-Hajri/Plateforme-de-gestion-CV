import { createReducer, on } from '@ngrx/store';
import { saveContactId } from './cv.action';

export interface CVState {
  contactId: string | null;
}

export const initialState: CVState = {
  contactId: null,
};

export const cvReducer = createReducer(
  initialState,
  on(saveContactId, (state, { contactId }) => ({ ...state, contactId }))
);
