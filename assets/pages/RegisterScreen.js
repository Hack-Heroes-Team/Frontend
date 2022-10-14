import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { useFonts, Ubuntu_700Bold, MavenPro_700Bold, MavenPro_300Light } from "@expo-google-fonts/dev";

export default function RegisterScreen() {
	let [fontsLoaded] = useFonts({ Ubuntu_700Bold, MavenPro_700Bold, MavenPro_300Light });
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setrePassword] = useState("");

	return (
		<SafeAreaView style={styles.screen}>
			<Text style={{ fontFamily: fontsLoaded ? "MavenPro_700Bold" : "Arial", ...styles.title }}>Zarejestruj się</Text>

			<View style={styles.formContainer}>
				<TextInput value={name} onChangeText={setName} style={{ fontFamily: fontsLoaded ? "MavenPro_300Light" : "Arial", ...styles.input }} placeholder="imię..." placeholderTextColor={"#00204750"}></TextInput>
				<TextInput value={surname} onChangeText={setSurname} style={{ fontFamily: fontsLoaded ? "MavenPro_300Light" : "Arial", ...styles.input }} placeholder="nazwisko..." placeholderTextColor={"#00204750"}></TextInput>
				<TextInput value={city} onChangeText={setCity} style={{ fontFamily: fontsLoaded ? "MavenPro_300Light" : "Arial", ...styles.input }} placeholder="miasto..." placeholderTextColor={"#00204750"}></TextInput>
				<TextInput value={email} onChangeText={setEmail} style={{ fontFamily: fontsLoaded ? "MavenPro_300Light" : "Arial", ...styles.input }} placeholder="email..." placeholderTextColor={"#00204750"}></TextInput>
				<TextInput value={password} onChangeText={setPassword} style={{ fontFamily: fontsLoaded ? "MavenPro_300Light" : "Arial", ...styles.input }} placeholder="hasło..." placeholderTextColor={"#00204750"}></TextInput>
				<TextInput value={rePassword} onChangeText={setrePassword} style={{ fontFamily: fontsLoaded ? "MavenPro_300Light" : "Arial", ...styles.input }} placeholder="powtórz hasło..." placeholderTextColor={"#00204750"}></TextInput>

				<TouchableOpacity style={styles.button}>
					<Text style={{ fontFamily: fontsLoaded ? "Ubuntu_700Bold" : "Arial", ...styles.text }}>Zarejestruj się</Text>
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
	},
});
