'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// reducers
import authReducer from './features/auth/authSlice';

import createWebStorage from "redux-persist/es/storage/createWebStorage";

export function createPersistStore() {
	const isServer = typeof window === "undefined";
	if (isServer) {
		return {
			getItem() {
				return Promise.resolve(null);
			},
			setItem() {
				return Promise.resolve();
			},
			removeItem() {
				return Promise.resolve();
			},
		};
	}
	return createWebStorage("local");
}
const storage = typeof window !== "undefined"
	? createWebStorage("local")
	: createPersistStore();

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
	auth: authReducer
});

const persistedReducer = persistReducer(
	persistConfig,
	rootReducer
);

export const makeStore = () => {
	return configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}),
	})
}
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})
export const persistor = persistStore(store);

