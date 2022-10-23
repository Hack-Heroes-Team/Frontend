import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, StatusBar, Keyboard } from "react-native";
import React, { useState, useCallback, useContext, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthContext } from "../UseAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
	// Getting logging in function
	const { login } = useContext(AuthContext);

	// Setting up variable to handle data in form
	const [form, setForm] = useState({ email: "", password: "" });

	// Setting up error state
	// If logging in failed change to 'true' and show error text
	const [error, setError] = useState(false);

	// Setting fields refs
	const secondInputForDaysInterestTextInputRef = React.useRef();

	// Adding fonts
	const [fontsLoaded] = useFonts({
		Ubuntu_Bold: require("../fonts/Ubuntu-Bold.ttf"),
		MavenPro_Bold: require("../fonts/MavenPro-Bold.ttf"),
		MavenPro_Regular: require("../fonts/MavenPro-Regular.ttf"),
	});

	// Keyboard state
	const [keyboardShift, setShift] = useState(false);

	// On load
	useEffect(() => {
		// Change keyboard state
		const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
			setShift(true);
		});
		const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
			setShift(false);
		});

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	// Waiting for fonts to load
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);
	if (!fontsLoaded) {
		return null;
	}

	// Trying to loggin user
	const handleLogin = async () => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify({ mail: form.email, password: form.password }),
		};
		const response = await fetch("https://hack-heroes-back.herokuapp.com/login", requestOptions);
		const data = await response.json();

		// Check if logged in
		if (data.city) {
			await AsyncStorage.setItem("email", form.email);
			await AsyncStorage.setItem("city", data.city);
			login();
		} else {
			setError(true);
		}
	};

	return (
		<SafeAreaView style={styles.view}>
			<StatusBar barStyle={"dark-content"} />

			{/* Title */}
			<Text style={{ ...styles.title, transform: keyboardShift ? [{ translateY: -50 }] : [] }}>Zaloguj się</Text>

			{/* Login form */}
			<View style={{ ...styles.formContainer, transform: keyboardShift ? [{ translateY: -175 }] : [] }}>
				{/* Fields */}
				<TextInput
					returnKeyType={"next"}
					autoCapitalize={"none"}
					value={form.email}
					onChangeText={(email) => setForm({ ...form.password, email: email })}
					style={styles.input}
					placeholder="email..."
					keyboardType={"email-address"}
					placeholderTextColor={"#00204750"}
					onSubmitEditing={() => secondInputForDaysInterestTextInputRef.current?.focus()}
				/>
				<TextInput
					ref={secondInputForDaysInterestTextInputRef}
					returnKeyType={"done"}
					secureTextEntry={true}
					autoCapitalize={"none"}
					value={form.password}
					onChangeText={(password) => setForm({ ...form, password: password })}
					style={styles.input}
					placeholder="hasło..."
					placeholderTextColor={"#00204750"}
				/>

				{/* If credentials are wrong */}
				{error ? <Text style={styles.errorText}>Niepoprawny login lub hasło.</Text> : null}

				{/* Login button */}
				<TouchableOpacity onPress={() => handleLogin()} style={styles.confirmButton}>
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
