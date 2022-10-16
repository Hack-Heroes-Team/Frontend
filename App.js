import React from "react";
import Main from "./assets/pages/Main";
import Account from "./assets/pages/Account";
import AddingReceipt from "./assets/pages/AddingReceipt";
import AddingReceiptManualy from "./assets/pages/AddingReceiptManualy";
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
								},
								title: "Konto",
								headerTintColor: "#fff",
							}}
						/>
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

						<Stack.Screen
							name="AddingReceipt"
							component={AddingReceipt}
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
						<Stack.Screen
							name="AddingReceiptManualy"
							component={AddingReceiptManualy}
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
