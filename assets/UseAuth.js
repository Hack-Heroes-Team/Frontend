import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
	loggedIn: false,
});

export const AuthProvider = ({ children }) => {
	const [loggedIn, setloggedIn] = useState(false);
	const [email, setEmail] = useState("");

	useEffect(() => {
		const checkIfLoggedIn = async () => {
			const value = await AsyncStorage.getItem("loggedIn");
			setEmail(value);
			if (value !== null) {
				setloggedIn(true);
			}
		};

		checkIfLoggedIn();
	}, []);

	const login = () => {
		setloggedIn(true);
	};

	// Logout updates the user data to default
	const logout = async () => {
		await AsyncStorage.removeItem("loggedIn");
		setloggedIn(false);
	};

	const setCity = (city) => {};

	return (
		<AuthContext.Provider
			value={{
				loggedIn,
				login,
				logout,
				email,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
