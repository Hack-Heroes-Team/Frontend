import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function StartScreen({ navigation }) {
	// Adding fonts
	const [fontsLoaded] = useFonts({
		Ubuntu_Bold: require("../fonts/Ubuntu-Bold.ttf"),
		MavenPro_Bold: require("../fonts/MavenPro-Bold.ttf"),
	});

	// Waiting for fonts to download
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
			<Text style={styles.title}>gdzieTaniej?</Text>

			{/* Buttons container */}
			<View style={styles.buttonsContainer}>
				{/* Login button */}
				<TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate("LoginScreen")}>
					<Text style={styles.buttonsText}>Zaloguj się</Text>
				</TouchableOpacity>

				{/* Register button */}
				<TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate("RegisterScreen")}>
					<Text style={{ ...styles.buttonsText, color: "#fff" }}>Zarejestruj się</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

// Styles
const styles = StyleSheet.create({
	view: {
		backgroundColor: "#002047",
		flex: 1,
		justifyContent: "space-around",
	},
	title: {
		fontSize: 40,
		textAlign: "center",
		color: "#fff",
		fontFamily: "MavenPro_Bold",
	},
	buttonsContainer: {
		bottom: 0,
		flexDirection: "column",
		alignItems: "center",
	},
	buttonLogin: {
		marginVertical: 12,
		backgroundColor: "#fff",
		padding: 20,
		width: "80%",
		borderRadius: 12,
	},
	buttonRegister: {
		marginVertical: 12,
		padding: 17,
		borderColor: "#fff",
		borderWidth: 3,
		width: "80%",
		borderRadius: 12,
	},
	buttonsText: {
		textAlign: "center",
		fontFamily: "Ubuntu_Bold",
		color: "#002047",
		fontSize: 24,
	},
});
