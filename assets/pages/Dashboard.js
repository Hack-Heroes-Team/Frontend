import { ScrollView, View, Text, StyleSheet } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthContext } from "../UseAuth";

export default function Dashboard() {
	// Getting email from context
	const { email, city } = useContext(AuthContext);

	const [dashboard, setDashboard] = useState({ avgReceiptPriceNearby: "--.--", avgReceiptPrice: "--.--", lastReceipt: "--.--" });

	useEffect(() => {
		const getData = async () => {
			const requestOptions = {
				method: "POST",
				body: JSON.stringify({
					owner: email,
					city: city,
				}),
			};

			const avgReceiptPrice = await fetch("https://hack-heroes-back.herokuapp.com/avgReceiptPrice", requestOptions);
			const lastReceipt = await fetch("https://hack-heroes-back.herokuapp.com/lastReceipt", requestOptions);
			const avgReceiptPriceNearby = await fetch("https://hack-heroes-back.herokuapp.com/avgReceiptPriceNearby", requestOptions);
			const data = [await avgReceiptPrice.json(), await lastReceipt.json(), await avgReceiptPriceNearby.json()];

			setDashboard({ avgReceiptPrice: data[0].Avg.toFixed(2) + "zł", lastReceipt: data[1].receipt.Price.toFixed(2) + "zł", avgReceiptPriceNearby: data[2].Avg.toFixed(2) + "zł" });
		};

		getData();
	}, []);

	// Adding fonts
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

				{/* Price of last receipt  */}
				<View style={styles.box}>
					<Text style={styles.boxTitle}>Cena ostatnich zakupów</Text>
					<Text style={styles.boxPrice}>{dashboard.lastReceipt}</Text>
				</View>

				{/* User avg prices  */}
				<View style={styles.box}>
					<Text style={styles.boxTitle}>Średnia cena zakupów</Text>
					<Text style={styles.boxPrice}> {dashboard.avgReceiptPrice}</Text>
				</View>

				{/* Avg prices nearby */}
				<View style={styles.box}>
					<Text style={styles.boxTitle}>Cena zakupów w okolicy</Text>
					<Text style={styles.boxPrice}>{dashboard.avgReceiptPriceNearby}</Text>
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
		borderRadius: 7.5,
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
