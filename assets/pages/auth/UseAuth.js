import React, { createContext, useState } from "react";

export const AuthContext = createContext({
	loggedIn: false,
});

export const AuthProvider = ({ children }) => {
	const [loggedIn, setloggedIn] = useState(false);

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
