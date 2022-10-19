import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, StatusBar } from "react-native";
import React, { useState, useCallback, useContext } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthContext } from "../UseAuth";
export default function LoginScreen() {
	// Getting logging in function
	const { login } = useContext(AuthContext);

	// Setting up variable to handle data in form
	const [form, setForm] = useState({ email: "", password: "" });

	// Setting up error state
	// If logging in failed change to 'true' and show error text
	const [error, setError] = useState(false);

	// Adding fonts
	const [fontsLoaded] = useFonts({
		Ubuntu_Bold: require("../fonts/Ubuntu-Bold.ttf"),
		MavenPro_Bold: require("../fonts/MavenPro-Bold.ttf"),
		MavenPro_Regular: require("../fonts/MavenPro-Regular.ttf"),
	});

	// Waiting for fonts to load
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);
	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaView style={styles.view}>
			<StatusBar barStyle={"dark-content"} />

			{/* Title */}
			<Text style={styles.title}>Zaloguj się</Text>

			{/* Login form */}
			<View style={styles.formContainer}>
				{/* Fields */}
				<TextInput value={form.email} onChangeText={(email) => setForm({ ...form.password, email: email })} style={styles.input} placeholder="email..." placeholderTextColor={"#00204750"}></TextInput>
				<TextInput value={form.password} onChangeText={(password) => setForm({ ...form, password: password })} style={styles.input} placeholder="hasło..." placeholderTextColor={"#00204750"}></TextInput>

				{/* If credentials are wrong */}
				{error ? <Text style={styles.errorText}>Niepoprawny login lub hasło.</Text> : null}

				{/* Login button */}
				<TouchableOpacity onPress={login} style={styles.confirmButton}>
					<Text style={styles.buttonText}>Zaloguj się</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

// Style sheet
const styles = StyleSheet.create({
	view: {
		backgroundColor: "#fff",
		flex: 1,
		justifyContent: "space-around",
	},
	title: {
		fontSize: 40,
		textAlign: "center",
		color: "#002047",
		fontFamily: "MavenPro_Bold",
	},

	// Form styles
	formContainer: {
		bottom: 0,
		flexDirection: "column",
		alignItems: "center",
	},
	input: {
		marginVertical: 10,
		paddingHorizontal: 10,
		paddingBottom: 5,
		borderBottomColor: "#002047",
		borderBottomWidth: 1,
		width: "80%",
		color: "#002047",
		fontSize: 18,
		fontFamily: "MavenPro_Regular",
	},
	errorText: {
		textAlign: "left",
		width: "80%",
		marginTop: 5,
		color: "#fe2926",
	},
	confirmButton: {
		marginVertical: 12,
		padding: 15,
		borderColor: "#002047",
		borderWidth: 2,
		width: "80%",
		borderRadius: 12,
	},
	buttonText: {
		textAlign: "center",
		color: "#002047",
		fontSize: 22,
		fontFamily: "Ubuntu_Bold",
	},
});
