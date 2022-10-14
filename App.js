import React from "react";
import Main from "./assets/pages/Main";
import Account from "./assets/pages/Account";
import AddingReceipt from "./assets/pages/AddingReceipt";
import ShopScreen from "./assets/pages/ShopScreen";
import StartScreen from "./assets/pages/StartScreen";
import LoginScreen from "./assets/pages/LoginScreen";
import RegisterScreen from "./assets/pages/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
	const Stack = createNativeStackNavigator();
	const loggedIn = false;
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{loggedIn ? (
					<>
						<Stack.Group>
							<Stack.Screen name="Home" component={Main} options={{ headerShown: false }} />
							<Stack.Screen
								name="Account"
								component={Account}
								options={{
									headerStyle: {
										backgroundColor: "#002047",
									},
									headerTitleStyle: {
										fontWeight: "bold",
										color: "#fff",
									},
									title: "Konto",
								}}
							/>
							<Stack.Screen name="ShopScreen" component={ShopScreen} />
						</Stack.Group>
						<Stack.Group screenOptions={{ presentation: "modal" }}>
							<Stack.Screen
								name="AddingReceipt"
								component={AddingReceipt}
								options={{
									headerStyle: {
										backgroundColor: "#002047",
									},
									headerTitleStyle: {
										fontWeight: "bold",
										color: "#fff",
									},
									title: "Dodaj nowy pargon",
								}}
							/>
						</Stack.Group>
					</>
				) : (
					<>
						<Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
						<Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
						<Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
