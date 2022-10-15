import { useFonts, Lato_900Black } from "@expo-google-fonts/dev";
import React from "react";
import Icon from "react-native-vector-icons/Entypo";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

export default function ShopsContainer({ navigation }) {
	let [fontsLoaded] = useFonts({ Lato_900Black });

	return (
		<View style={{ padding: 25, backgroundColor: "#f9f9ff" }}>
			<View style={styles.mainBox}>
				<Text style={styles.title}>Najniższe ceny w okolicy:</Text>

				<TouchableWithoutFeedback onPress={() => navigation.navigate("ShopScreen", { name: "Biedronka" })}>
					<View style={styles.shopBox}>
						<Text style={{ color: "#fe2926", fontSize: 40, fontFamily: fontsLoaded ? "Lato_900Black" : "Arial" }}>1.</Text>
						<View style={{ marginRight: 30 }}>
							<Text style={styles.shopName}>Biedronka</Text>
							<Text style={styles.shopAddress}>Warszawska 62, Kraków</Text>
						</View>
						<Icon name="triangle-down" style={{ color: "#EF094A", position: "absolute", right: 0 }} size={40} />
					</View>
				</TouchableWithoutFeedback>

				<TouchableWithoutFeedback onPress={() => navigation.navigate("ShopScreen", { name: "Lidl" })}>
					<View style={styles.shopBox}>
						<Text style={{ color: "#fe2926", fontSize: 40, fontFamily: fontsLoaded ? "Lato_900Black" : "Arial" }}>2.</Text>
						<View style={{ marginRight: 30 }}>
							<Text style={styles.shopName}>Lidl</Text>
							<Text style={styles.shopAddress}>Długa 20, Kraków</Text>
						</View>
						<Icon name="triangle-up" style={{ color: "#4FE3B4", position: "absolute", right: 0 }} size={40} />
					</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainBox: {
		paddingHorizontal: 15,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.25,
		shadowRadius: 2,
		borderRadius: 15,
		elevation: 5,
	},
	title: {
		marginVertical: 25,
		color: "#002047",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 25,
	},
	shopBox: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		borderTopWidth: 1,
		padding: 15,
		borderTopColor: "#002047",
	},
	shopName: {
		textAlign: "right",
		fontWeight: "bold",
		fontSize: 20,
	},
	shopAddress: {
		textAlign: "right",
		fontWeight: "200",
		fontSize: 15,
	},
});
