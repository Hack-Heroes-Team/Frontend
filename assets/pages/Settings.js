import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useContext } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthContext } from "../UseAuth";

export default function Settings() {
	// Setting up logout function
	const { logout } = useContext(AuthContext);

	// Adding fonts
	const [fontsLoaded] = useFonts({
		Ubuntu_Bold: require("../fonts/Ubuntu-Bold.ttf"),
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
		<View style={styles.view}>
			<TouchableOpacity onPress={null} style={styles.confirmButton}>
				<Text style={styles.buttonText}>Historia paragonów</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={logout()} style={styles.confirmButton}>
				<Text style={styles.buttonText}>Wyloguj się</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={null} style={styles.confirmButton}>
				<Text style={{ ...styles.buttonText, color: "#fe2926" }}>Usuń konto</Text>
			</TouchableOpacity>
		</View>
	);
}

// Style sheet
const styles = StyleSheet.create({
	view: { flex: 1, alignItems: "center" },
	confirmButton: {
		padding: 20,
		borderBottomColor: "#002047",
		borderBottomWidth: 1,
		width: "100%",
	},
	buttonText: {
		textAlign: "center",
		color: "#002047",
		fontSize: 20,
		fontFamily: "Ubuntu_Bold",
	},
});
