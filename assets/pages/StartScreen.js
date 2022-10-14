import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useFonts, Ubuntu_700Bold, MavenPro_700Bold } from "@expo-google-fonts/dev";

export default function StartScreen({ navigation }) {
	let [fontsLoaded] = useFonts({ Ubuntu_700Bold, MavenPro_700Bold });

	return (
		<SafeAreaView style={styles.screen}>
			<Text style={{ fontFamily: fontsLoaded ? "MavenPro_700Bold" : "Arial", ...styles.title }}>gdzieTaniej?</Text>

			<View style={styles.buttonsContainer}>
				<TouchableOpacity style={styles.button_1} onPress={() => navigation.navigate("LoginScreen")}>
					<Text style={{ fontFamily: fontsLoaded ? "Ubuntu_700Bold" : "Arial", ...styles.text }}>Zaloguj się</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button_2} onPress={() => navigation.navigate("RegisterScreen")}>
					<Text style={{ fontFamily: fontsLoaded ? "Ubuntu_700Bold" : "Arial", ...styles.text, color: "#fff" }}>Zarejestruj się</Text>
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
		color: "#002047",
		fontSize: 24,
	},
});
