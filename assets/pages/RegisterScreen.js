import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function RegisterScreen() {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setrePassword] = useState("");

	const [fontsLoaded] = useFonts({
		Ubuntu_Bold: require("../fonts/Ubuntu-Bold.ttf"),
		MavenPro_Bold: require("../fonts/MavenPro-Bold.ttf"),
		MavenPro_Regular: require("../fonts/MavenPro-Regular.ttf"),
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
			<Text style={styles.title}>Zarejestruj się</Text>

			<View style={styles.formContainer}>
				<TextInput value={name} onChangeText={setName} placeholder="imię..." placeholderTextColor={"#00204750"} style={styles.input}></TextInput>
				<TextInput value={surname} onChangeText={setSurname} placeholder="nazwisko..." placeholderTextColor={"#00204750"} style={styles.input}></TextInput>
				<TextInput value={city} onChangeText={setCity} placeholder="miasto..." placeholderTextColor={"#00204750"} style={styles.input}></TextInput>
				<TextInput value={email} onChangeText={setEmail} placeholder="email..." placeholderTextColor={"#00204750"} style={styles.input}></TextInput>
				<TextInput value={password} onChangeText={setPassword} placeholder="hasło..." placeholderTextColor={"#00204750"} style={styles.input}></TextInput>
				<TextInput value={rePassword} onChangeText={setrePassword} placeholder="powtórz hasło..." placeholderTextColor={"#00204750"} style={styles.input}></TextInput>

				<TouchableOpacity style={styles.button}>
					<Text style={styles.text}>Zarejestruj się</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
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
	formContainer: {
		bottom: 0,
		flexDirection: "column",
		alignItems: "center",
	},

	button: {
		marginVertical: 12,
		padding: 15,
		borderColor: "#002047",
		borderWidth: 2,
		width: "80%",
		borderRadius: 12,
	},
	text: {
		textAlign: "center",
		color: "#002047",
		fontSize: 22,
		fontFamily: "Ubuntu_Bold",
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
});
