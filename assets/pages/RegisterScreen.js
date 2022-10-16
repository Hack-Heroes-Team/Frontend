import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function RegisterScreen() {
	// Setting up variables to handle data in form
	const [name, setName] = useState("");
	const [surName, setSurname] = useState("");
	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setrePassword] = useState("");

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
			{/* Title */}
			<Text style={styles.title}>Zarejestruj się</Text>

			{/* Register form */}
			<View style={styles.formContainer}>
				{/* Fields */}
				<TextInput value={name} onChangeText={setName} placeholder="imię..." placeholderTextColor={"#00204750"} style={styles.input}></TextInput>
				<TextInput value={surName} onChangeText={setSurname} placeholder="nazwisko..." placeholderTextColor={"#00204750"} style={styles.input}></TextInput>
				<TextInput value={city} onChangeText={setCity} placeholder="miasto..." placeholderTextColor={"#00204750"} style={styles.input}></TextInput>
				<TextInput value={email} onChangeText={setEmail} placeholder="email..." placeholderTextColor={"#00204750"} style={styles.input}></TextInput>
				<TextInput value={password} onChangeText={setPassword} placeholder="hasło..." placeholderTextColor={"#00204750"} style={styles.input}></TextInput>
				<TextInput value={rePassword} onChangeText={setrePassword} placeholder="powtórz hasło..." placeholderTextColor={"#00204750"} style={styles.input}></TextInput>

				{/* Register button */}
				<TouchableOpacity style={styles.confirmButton}>
					<Text style={styles.buttonText}>Zarejestruj się</Text>
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
		justifyContent: "space-evenly",
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
