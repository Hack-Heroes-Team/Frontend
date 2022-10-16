import { ScrollView, View, Text, StyleSheet } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

export default function Dashboard() {
	const [fontsLoaded] = useFonts({
		Lato_Black: require("../fonts/Lato-Black.ttf"),
	});

	return (
		<>
			<Text style={styles.title}>Statystyki</Text>
			<ScrollView horizontal="true" showsHorizontalScrollIndicator="false" style={styles.container} contentContainerStyle={{ flexDirection: "row" }}>
				<View style={styles.box}></View>
				<View style={styles.box}></View>
				<View style={styles.box}></View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		flexDirection: "row",
	},
	title: {
		marginLeft: 20,
		marginTop: 20,
		marginBottom: -5,
		fontSize: 30,
		fontFamily: "Lato_Black",
		color: "#fff",
	},
	box: {
		backgroundColor: "#fff",
		borderRadius: 5,
		width: 150,
		height: 75,
		margin: 7.5,
	},
});
