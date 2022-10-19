import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";

// Importing screens
import Main from "./pages/Main";
import Settings from "./pages/Settings";
import AddingReceiptCamera from "./pages/AddingReceiptCamera";
import AddingReceiptForm from "./pages/AddingReceiptForm";
import ShopScreen from "./pages/ShopScreen";
import Start from "./pages/Start";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import { AuthContext } from "./UseAuth";

export default function MainApp() {
	const Stack = createNativeStackNavigator();

	// Is loggedIn?
	const { loggedIn } = useContext(AuthContext);

	return (
		<Stack.Navigator>
			{/* Is user logged? */}
			{loggedIn ? (
				// If user is logged in
				<Stack.Group>
					{/* Home screen */}
					<Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />

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
					<Stack.Screen name="AddingReceiptForm" component={AddingReceiptForm} />
				</Stack.Group>
			) : (
				// If user isn't logged in
				<Stack.Group>
					<Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
					<Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
					<Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
				</Stack.Group>
			)}
		</Stack.Navigator>
	);
}
