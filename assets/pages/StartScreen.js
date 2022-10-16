import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function StartScreen({ navigation }) {
	const [fontsLoaded] = useFonts({
		Ubuntu_Bold: require("../fonts/Ubuntu-Bold.ttf"),
		MavenPro_Bold: require("../fonts/MavenPro-Bold.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaView style={styles.screen}>
			<Text style={styles.title}>gdzieTaniej?</Text>

			<View style={styles.buttonsContainer}>
				<TouchableOpacity style={styles.button_1} onPress={() => navigation.navigate("LoginScreen")}>
					<Text style={styles.text}>Zaloguj się</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button_2} onPress={() => navigation.navigate("RegisterScreen")}>
					<Text style={{ ...styles.text, color: "#fff" }}>Zarejestruj się</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
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
	button_1: {
		marginVertical: 12,
		backgroundColor: "#fff",
		padding: 20,
		width: "80%",
		borderRadius: 12,
	},
	button_2: {
		marginVertical: 12,
		padding: 17,
		borderColor: "#fff",
		borderWidth: 3,
		width: "80%",
		borderRadius: 12,
	},
	text: {
		textAlign: "center",
		fontFamily: "Ubuntu_Bold",
		color: "#002047",
		fontSize: 24,
	},
});
