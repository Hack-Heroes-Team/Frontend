import { ScrollView, View, Text, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Icon from "react-native-vector-icons/Entypo";

export default function Dashboard() {
	// Adding font
	const [fontsLoaded] = useFonts({
		Lato_Black: require("../fonts/Lato-Bold.ttf"),
		Montserrat_Bold: require("../fonts/Montserrat-Bold.ttf"),
	});

	// Waiting for font to load
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);
	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			{/* Title */}
			<Text style={styles.title}>Statystyki</Text>

			{/* Container for data */}
			<ScrollView horizontal="true" contentOffset={{ x: -15, y: 0 }} showsHorizontalScrollIndicator="false" style={styles.container} contentContainerStyle={{ flexDirection: "row" }}>
				{/* Data */}

				{/* Price of last receipe  */}
				<View style={styles.box}>
					<Text style={styles.boxTitle}>Cena ostatnich zakupów</Text>
					<Text style={styles.boxPrice}>
						50,32zł
						<Icon name="triangle-down" style={{ color: "#4FE3B4" }} size={35} />
					</Text>
				</View>

				{/* User avg prices  */}
				<View style={styles.box}>
					<Text style={styles.boxTitle}>Średnia cena zakupów</Text>
					<Text style={styles.boxPrice}>92,59zł</Text>
				</View>

				{/* Avg prices nearby */}
				<View style={styles.box}>
					<Text style={styles.boxTitle}>Cena zakupów w okolicy</Text>
					<Text style={styles.boxPrice}>75,19zł</Text>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	title: {
		marginLeft: 20,
		marginTop: 20,
		marginBottom: -5,
		fontSize: 30,
		fontFamily: "Lato_Black",
		color: "#fff",
	},
	container: {
		flexDirection: "row",
		paddingVertical: 15,
	},

	// Box styling
	box: {
		backgroundColor: "#fff",
		borderRadius: 5,
		width: 200,
		height: 85,
		margin: 7.5,
		padding: 12.5,
		alignItems: "center",
		justifyContent: "space-between",
	},
	boxTitle: {
		fontWeight: "700",
		color: "#002047",
	},
	boxPrice: {
		fontFamily: "Montserrat_Bold",
		color: "#fe2926",
		fontSize: 30,
	},
	boxTriangleIcon: {
		lineHeight: 50,
		position: "absolute",
	},
});
