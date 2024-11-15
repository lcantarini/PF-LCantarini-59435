import { createReducer, on } from "@ngrx/store";
import { User } from "../../features/dashboard/users/models";
import { AuthActions } from "../actions/auth.actions";

export interface AuthState {
    authenticatedUser: User | null;
}

export const authFeatureName = 'auth';

const initialState: AuthState = {
    authenticatedUser: null,
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.setAuthenticatedUser, (state, action) => {
        return {
            ...state,
            authenticatedUser: action.user
        }
    }),

    on(AuthActions.unsetAuthenticatedUser, (state) => {
        return {
            ...state,
            authenticatedUser: null,
        }
    })

);