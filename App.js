import React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Importing screen
import MainApp from "./assets/MainApp";
import { AuthProvider } from "./assets/UseAuth";

export default function App() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<MainApp />
			</AuthProvider>
		</NavigationContainer>
	);
}
