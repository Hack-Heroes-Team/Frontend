import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
	loggedIn: false,
});

export const AuthProvider = ({ children }) => {
	const [loggedIn, setloggedIn] = useState(false);
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("");

	useEffect(() => {
		const checkIfLoggedIn = async () => {
			const email = await AsyncStorage.getItem("email");
			setEmail(email);
			setCity(await AsyncStorage.getItem("city"));

			if (email !== null) {
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

	return (
		<AuthContext.Provider
			value={{
				loggedIn,
				login,
				logout,
				email,
				city,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
