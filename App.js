import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importing screen
import MainApp from "./assets/MainApp";
import { AuthProvider } from "./assets/pages/auth/UseAuth";

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<AuthProvider>
				<MainApp />
			</AuthProvider>
		</NavigationContainer>
	);
}
