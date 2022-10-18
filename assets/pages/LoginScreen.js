import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, StatusBar } from "react-native";
import React, { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function LoginScreen() {
	// Setting up variables to handle data in form
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
				<TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="email..." placeholderTextColor={"#00204750"}></TextInput>
				<TextInput value={password} onChangeText={setPassword} style={styles.input} placeholder="hasło..." placeholderTextColor={"#00204750"}></TextInput>

				{/* Login button */}
				<TouchableOpacity style={styles.confirmButton}>
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
