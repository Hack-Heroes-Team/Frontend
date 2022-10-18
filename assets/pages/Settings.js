import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "./auth/UseAuth";

export default function Settings() {
	const { logout } = useContext(AuthContext);

	return (
		<View style={styles.view}>
			<TouchableOpacity onPress={logout} style={styles.confirmButton}>
				<Text style={styles.buttonText}>Wyloguj się</Text>
			</TouchableOpacity>
		</View>
	);
}

// Style sheet
const styles = StyleSheet.create({
	view: { flex: 1 },
	confirmButton: {
		marginVertical: 12,
		padding: 15,
		borderColor: "#002047",

		width: "100%",
		borderRadius: 12,
	},
	buttonText: {
		textAlign: "center",
		color: "#002047",
		fontSize: 22,
		fontFamily: "Ubuntu_Bold",
	},
});
