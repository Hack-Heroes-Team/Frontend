import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importing screens
import MainScreen from "./assets/pages/MainScreen";
import Settings from "./assets/pages/Settings";
import AddingReceiptCamera from "./assets/pages/AddingReceiptCamera";
import AddingReceiptForm from "./assets/pages/AddingReceiptForm";
import ShopScreen from "./assets/pages/ShopScreen";
import StartScreen from "./assets/pages/StartScreen";
import LoginScreen from "./assets/pages/LoginScreen";
import RegisterScreen from "./assets/pages/RegisterScreen";

export default function App() {
	const Stack = createNativeStackNavigator();

	// Is loggedIn?
	const loggedIn = true;

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{/* Is user logged? */}
				{loggedIn ? (
					// If user is logged in
					<Stack.Group>
						{/* Home screen */}
						<Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />

						{/* Settings screen */}
						<Stack.Screen
							name="Settings"
							component={Settings}
							options={{
								headerStyle: {
									backgroundColor: "#002047",
								},
								headerTitleStyle: {
									fontWeight: "bold",
								},
								title: "Konto",
								headerTintColor: "#fff",
							}}
						/>

						{/* Screen of one shop */}
						<Stack.Screen
							name="ShopScreen"
							component={ShopScreen}
							options={{
								headerTintColor: "#fff",
								headerTitleStyle: {
									fontWeight: "bold",
								},
							}}
						/>

						{/* Adding receipe with camera */}
						<Stack.Screen
							name="AddingReceiptCamera"
							component={AddingReceiptCamera}
							options={{
								headerShown: false,
							}}
						/>

						{/* Adding receipe with form */}
						<Stack.Screen
							name="AddingReceiptForm"
							component={AddingReceiptForm}
							options={{
								headerStyle: {
									backgroundColor: "#002047",
								},
								headerTitleStyle: {
									fontWeight: "bold",
								},
								headerTintColor: "#fff",
								title: "Dodaj nowy pargon",
							}}
						/>
					</Stack.Group>
				) : (
					// If user isn't logged in
					<Stack.Group>
						<Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
						<Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
						<Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
					</Stack.Group>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
