import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, StatusBar, Keyboard } from "react-native";
import React, { useState, useCallback, useContext, useEffect } from "react";
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

	// Keyboard state
	const [keyboardShift, setShift] = useState(false);

	// Setting fields refs
	const InputForDaysInterestTextInputRef2 = React.useRef();
	const InputForDaysInterestTextInputRef3 = React.useRef();
	const InputForDaysInterestTextInputRef4 = React.useRef();
	const InputForDaysInterestTextInputRef5 = React.useRef();
	const InputForDaysInterestTextInputRef6 = React.useRef();

	//On load
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

	// Validate Email
	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	};

	// Trying to loggin user
	const handleRegister = async () => {
		// Checking if all field contents data
		if (form.name && form.city && form.email && form.surname && form.password && form.rePassword) {
			// Checking if email is correct
			if (validateEmail(form.email)) {
				// Checking if passwords match
				if (form.password === form.rePassword) {
					const requestOptions = {
						method: "POST",
						body: JSON.stringify({
							mail: form.email,
							password: form.rePassword,
							name: form.name,
							surname: form.surname,
							city: form.city,
						}),
					};

					const response = await fetch("https://hack-heroes-back.herokuapp.com/register", requestOptions);
					const data = await response.json();

					// Checking if registered
					if (data.registered) {
						await AsyncStorage.setItem("email", form.email);
						await AsyncStorage.setItem("city", form.city);
						login();
					} else {
						// If not setting error
						setError("Istnieje już użytkownik o podanym adresie e-mail");
					}
				}
			}
		} else setError("Uzupełnij wszystkie pola"); // Setting error if some field are empty
	};

	return (
		<SafeAreaView style={styles.view}>
			<StatusBar barStyle={"dark-content"} />

			{/* Title */}
			<Text style={{ ...styles.title, transform: keyboardShift ? [{ translateY: -75 }] : [] }}>Zarejestruj się</Text>
			{/* Register form */}
			<View style={{ ...styles.formContainer, transform: keyboardShift ? [{ translateY: -150 }] : [] }}>
				{/* Fields */}
				<TextInput
					value={form.name}
					onChangeText={(name) => setform({ ...form, name: name })}
					placeholder="imię..."
					placeholderTextColor={"#00204750"}
					style={styles.input}
					returnKeyType={"next"}
					onSubmitEditing={() => InputForDaysInterestTextInputRef2.current?.focus()}
				/>
				<TextInput
					ref={InputForDaysInterestTextInputRef2}
					onSubmitEditing={() => InputForDaysInterestTextInputRef3.current?.focus()}
					value={form.surname}
					onChangeText={(surname) => setform({ ...form, surname: surname })}
					placeholder="nazwisko..."
					placeholderTextColor={"#00204750"}
					style={styles.input}
					returnKeyType={"next"}
				/>
				<TextInput
					ref={InputForDaysInterestTextInputRef3}
					onSubmitEditing={() => InputForDaysInterestTextInputRef4.current?.focus()}
					value={form.city}
					onChangeText={(city) => setform({ ...form, city: city })}
					placeholder="miasto..."
					placeholderTextColor={"#00204750"}
					style={styles.input}
					returnKeyType={"next"}
				/>
				<TextInput
					ref={InputForDaysInterestTextInputRef4}
					onSubmitEditing={() => InputForDaysInterestTextInputRef5.current?.focus()}
					autoCapitalize={"none"}
					value={form.email}
					onChangeText={(email) => {
						setform({ ...form, email: email });

						if (!validateEmail(email)) {
							setError("Podaj prawidłowy adres email");
						} else setError(undefined);
					}}
					placeholder="email..."
					placeholderTextColor={"#00204750"}
					style={styles.input}
					returnKeyType={"next"}
					keyboardType={"email-address"}
				/>
				<TextInput
					ref={InputForDaysInterestTextInputRef5}
					onSubmitEditing={() => InputForDaysInterestTextInputRef6.current?.focus()}
					autoCapitalize={"none"}
					secureTextEntry={true}
					value={form.password}
					onChangeText={(password) => {
						setform({ ...form, password: password });
						if (password === form.rePassword) setError(undefined);
					}}
					placeholder="hasło..."
					placeholderTextColor={"#00204750"}
					style={styles.input}
					returnKeyType={"next"}
				/>
				<TextInput
					ref={InputForDaysInterestTextInputRef6}
					autoCapitalize={"none"}
					secureTextEntry={true}
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
					returnKeyType={"done"}
				/>

				{/* Place to display error */}
				{error ? <Text style={styles.errorText}>{error}</Text> : null}

				{/* Register button */}
				<TouchableOpacity onPress={() => handleRegister()} style={styles.confirmButton}>
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
