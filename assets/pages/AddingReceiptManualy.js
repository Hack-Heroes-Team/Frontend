import { StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

import Icon from "react-native-vector-icons/Entypo";

export default function AddingReceiptManualy({ navigation }) {
	return (
		<>
			<TouchableOpacity onPress={() => navigation.navigate("AddingReceipt")} style={styles.iconBackward}>
				<Icon name="camera" style={{ color: "#fff" }} size={25} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation} style={styles.iconForward}>
				<Icon name="arrow-right" style={{ color: "#fff" }} size={25} />
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	iconBackward: {
		backgroundColor: "#002047",
		position: "absolute",
		bottom: 37.5,
		left: 10,
		padding: 15,
		borderRadius: 50,
	},
	iconForward: {
		backgroundColor: "#002047",
		position: "absolute",
		bottom: 37.5,
		right: 10,
		padding: 15,
		borderRadius: 50,
	},
});
