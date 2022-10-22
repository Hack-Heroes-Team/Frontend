import { StyleSheet, TouchableOpacity, Button, Text, View, TextInput, ScrollView } from "react-native";
import React, { useLayoutEffect, useCallback, useState, useEffect, useContext } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Icon from "react-native-vector-icons/Entypo";
import { AuthContext } from "../UseAuth";
import uuid from "react-native-uuid";

export default function AddingReceiptForm({ navigation }) {
	// Setting up form state
	const [form, setForm] = useState({ id: uuid.v4(), receiptName: "", shopName: "", shopAddress: { street: "", number: "" } });

	// Setting up state for data drom db
	const [userReceipts, setUserReceipts] = useState();

	// Getting email from context
	const { email, city } = useContext(AuthContext);

	// Setting up navbar settings
	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => <Button onPress={() => navigation.navigate("Main")} title="Anuluj" color="#fff" />,

			headerStyle: {
				backgroundColor: "#002047",
			},
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerTintColor: "#fff",
			title: "Dodaj nowy pargon",
		});
	});

	// Getting previous receipts from db

	useEffect(() => {
		const getData = async () => {
			const requestOptions = {
				method: "POST",
				body: JSON.stringify({
					owner: email,
				}),
			};

			const userReceipts = await (await fetch("https://hack-heroes-back.herokuapp.com/receiptsForUser", requestOptions)).json();
			setUserReceipts(userReceipts.receipts);
		};
		getData();
	}, []);

	const handleNewReceipt = async () => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify({
				id: form.id,
				owner: email,
				place: form.shopName + " " + form.shopAddress.street + " " + form.shopAddress.number,
				shop: form.shopName,
				name: form.receiptName,
				City: city,
			}),
		};
		// const newReceipe = await (await fetch("https://hack-heroes-back.herokuapp.com/addReceipt", requestOptions)).json();

		navigation.navigate("AddingItems", { id: form.id, shop: form.shopName, place: form.shopName + " " + form.shopAddress.street + " " + form.shopAddress.number });
	};

	const handleDelete = async (id) => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify({
				id: id,
			}),
		};

		const deleteReceipt = await (await fetch("https://hack-heroes-back.herokuapp.com/deleteReceipt", requestOptions)).json();
		getData();
	};

	// Adding fonts
	const [fontsLoaded] = useFonts({
		Ubuntu_Bold: require("../fonts/Ubuntu-Bold.ttf"),
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

	return (
		<View style={{ backgroundColor: "#f9f9ff", flex: 1, paddingHorizontal: "5%" }}>
			<TextInput
				value={form.receiptName}
				onChangeText={(value) => setForm({ ...form, receiptName: value })}
				style={styles.input}
				placeholder="Nazwij rachunek"
				placeholderTextColor={"#00204750"}
			/>

			{/* Subtitle */}
			<Text style={styles.subtitle}>Sklep</Text>

			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				<TextInput value={form.shopName} onChangeText={(value) => setForm({ ...form, shopName: value })} style={styles.input} placeholder="Nazwa sklepu" placeholderTextColor={"#00204750"} />

				<TextInput
					value={form.shopAddress.street}
					onChangeText={(value) => setForm({ ...form, shopAddress: { ...form.shopAddress, street: value } })}
					style={{ ...styles.input, width: "80%" }}
					placeholder="Ulica"
					placeholderTextColor={"#00204750"}
				/>
				<TextInput
					keyboardType="numeric"
					value={form.shopAddress.number}
					onChangeText={(value) => setForm({ ...form, shopAddress: { ...form.shopAddress, number: value } })}
					style={{ ...styles.input, ...styles.inputNumber }}
					placeholder="Nr."
					placeholderTextColor={"#00204750"}
				/>
			</View>

			{/* Subtitle */}
			<Text style={styles.subtitle}>Poprzednie paragony</Text>

			<ScrollView>
				{userReceipts
					? userReceipts.map((receipt) => {
							return (
								<View style={styles.receiptBox} key={receipt.Id}>
									<Text style={styles.receiptName}>
										{receipt.Name}, {receipt.Shop}
									</Text>
									<Text>
										{receipt.Place}, {receipt.City}
									</Text>
									<TouchableOpacity
										onPress={() => navigation.navigate("AddingItems", { id: receipt.Id, items: receipt.Items, place: receipt.Place })}
										style={{ ...styles.receiptIcon, right: 50 }}
									>
										<Icon name="pencil" style={{ color: "#002047" }} size={25} />
									</TouchableOpacity>
									<TouchableOpacity onPress={() => handleDelete(receipt.Id)} style={{ ...styles.receiptIcon, right: 5 }}>
										<Icon name="trash" style={{ color: "#fe2926" }} size={25} />
									</TouchableOpacity>
								</View>
							);
					  })
					: null}
			</ScrollView>

			{/* Go to adding receipt by camera window */}
			<TouchableOpacity onPress={() => navigation.goBack()} style={{ ...styles.icon, left: 10 }}>
				<Icon name="camera" style={{ color: "#fff" }} size={30} />
			</TouchableOpacity>

			{/* Forward icon */}
			<TouchableOpacity onPress={() => handleNewReceipt()} style={{ ...styles.icon, right: 10 }}>
				<Icon name="arrow-right" style={{ color: "#fff" }} size={30} />
			</TouchableOpacity>
		</View>
	);
}

// Style sheet
const styles = StyleSheet.create({
	icon: {
		backgroundColor: "#002047",
		position: "absolute",
		bottom: 37.5,
		padding: 15,
		borderRadius: 50,
	},

	subtitle: {
		fontFamily: "Ubuntu_Bold",
		fontSize: 25,
		marginTop: 25,
		color: "#002047",
	},
	input: {
		width: "100%",
		marginTop: 20,
		padding: 15,
		borderColor: "#002047",
		borderWidth: 2,
		borderRadius: 12,
	},

	inputNumber: {
		width: "17.5%",
		marginStart: "2.5%",
		marginTop: 20,
		padding: 7.5,
		textAlign: "center",
	},

	// Receipts stylying
	receiptBox: {
		marginVertical: 10,
	},
	receiptName: {
		fontSize: 20,
		fontWeight: "600",
	},
	receiptIcon: {
		position: "absolute",
		top: 7.5,
	},
});
