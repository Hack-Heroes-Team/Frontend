import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
	loggedIn: false,
});

export const AuthProvider = ({ children }) => {
	const [loggedIn, setloggedIn] = useState(false);

	useEffect(async () => {
		const value = await AsyncStorage.getItem("@loggedIn");
		if (value !== null) {
			setloggedIn(true);
		}
	}, []);

	const login = () => {
		setloggedIn(true);
	};

	// Logout updates the user data to default
	const logout = () => {
		setloggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{
				loggedIn,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
