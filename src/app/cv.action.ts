import { createAction, props } from '@ngrx/store';

export const saveContactId = createAction('[CV] Save Contact ID', props<{ contactId: string }>());
