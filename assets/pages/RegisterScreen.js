import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, StatusBar } from "react-native";
import React, { useState, useCallback, useContext } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthContext } from "../UseAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen() {
	// Getting logging in function
	const { login } = useContext(AuthContext);

	// Setting up variable to handle data in form
	const [form, setform] = useState({ name: "", surname: "", city: "", email: "", password: "", rePassword: "" });

	// Setting up error state
	const [error, setError] = useState(undefined);

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

	// Trying to loggin user
	const handleRegister = async () => {
		if (password === rePassword) {
			const requestOptions = {
				method: "POST",
				body: JSON.stringify({
					mail: form.email,
					password: form.password,
					name: form.name,
					surname: form.surname,
				}),
			};

			const response = await (await fetch("https://hack-heroes-back.herokuapp.com/register", requestOptions)).json();

			if (response.registered) {
				await AsyncStorage.setItem("loggedIn", form.email);
				login();
			} else {
				setError("Istnieje już użytkownik o podanym adresie e-mail");
			}
		}
	};

	return (
		<SafeAreaView style={styles.view}>
			<StatusBar barStyle={"dark-content"} />

			{/* Title */}
			<Text style={styles.title}>Zarejestruj się</Text>
			{/* Register form */}
			<View style={styles.formContainer}>
				{/* Fields */}
				<TextInput value={form.name} onChangeText={(name) => setform({ ...form, name: name })} placeholder="imię..." placeholderTextColor={"#00204750"} style={styles.input} />
				<TextInput value={form.surname} onChangeText={(surname) => setform({ ...form, surname: surname })} placeholder="nazwisko..." placeholderTextColor={"#00204750"} style={styles.input} />
				<TextInput value={form.city} onChangeText={(city) => setform({ ...form, city: city })} placeholder="miasto..." placeholderTextColor={"#00204750"} style={styles.input} />
				<TextInput value={form.email} onChangeText={(email) => setform({ ...form, email: email })} placeholder="email..." placeholderTextColor={"#00204750"} style={styles.input} />
				<TextInput
					value={form.password}
					onChangeText={(password) => {
						setform({ ...form, password: password });
						if (password === form.rePassword) setError(undefined);
					}}
					placeholder="hasło..."
					placeholderTextColor={"#00204750"}
					style={styles.input}
				/>
				<TextInput
					value={form.rePassword}
					onChangeText={(rePassword) => {
						setform({ ...form, rePassword: rePassword });

						// Checking if passwords are the same
						if (form.password !== rePassword) {
							setError("Hasła nie są takie same");
						} else setError(undefined);
					}}
					placeholder="powtórz hasło..."
					placeholderTextColor={"#00204750"}
					style={styles.input}
				/>

				{/* Place to display error */}
				{error ? <Text style={styles.errorText}>{error}</Text> : null}

				{/* Register button */}
				<TouchableOpacity onPress={handleRegister} style={styles.confirmButton}>
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
