import { StyleSheet, TouchableOpacity, Button, Text, View, TextInput, ScrollView } from "react-native";
import React, { useLayoutEffect, useCallback, useState, useEffect, useContext } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Icon from "react-native-vector-icons/Entypo";
import { AuthContext } from "../UseAuth";

export default function AddingReceiptForm({ navigation }) {
	// Setting up form state
	const [form, setForm] = useState({ receiptName: "", shopName: "", shopAddress: { street: "", number: "" } });

	// Setting up state for data drom db
	const [userReceipts, setUserReceipts] = useState();

	// Getting email from context
	const { email, city } = useContext(AuthContext);

	const [error, setError] = useState();

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
	const getData = async () => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify({
				owner: email,
			}),
		};
		const userReceipts = await fetch("https://hack-heroes-back.herokuapp.com/receiptsForUser", requestOptions);
		const data = await userReceipts.json();
		data.receipts.reverse();
		setUserReceipts(data.receipts);
	};
	useEffect(() => {
		getData();
	}, []);

	// Function handling adding new receipt
	const handleNewReceipt = async () => {
		if (form.shopAddress.street && form.receiptName && form.shopName && form.shopAddress.number) {
			setError(undefined);

			const requestOptions = {
				method: "POST",
				body: JSON.stringify({
					owner: email,
					place: form.shopName + " " + form.shopAddress.street + " " + form.shopAddress.number,
					shop: form.shopName,
					name: form.receiptName,
					city: city,
					id: Math.floor(Math.random() * (1000000 - 1) + 1),
				}),
			};
			const newReceipe = await fetch("https://hack-heroes-back.herokuapp.com/addReceipt", requestOptions);
			const data = newReceipe.json();
			navigation.navigate("AddingItems", { id: data.id, shop: form.shopName, place: form.shopName + " " + form.shopAddress.street + " " + form.shopAddress.number });
		} else setError("Uzupełnij wszystkie pola!");
	};

	// Function handling deleting receipt
	const handleDelete = async (id) => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify({
				id: id,
			}),
		};

		const deleteReceipt = await fetch("https://hack-heroes-back.herokuapp.com/deleteReceipt", requestOptions);

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
			{/* Receipt name */}
			<TextInput
				value={form.receiptName}
				onChangeText={(value) => setForm({ ...form, receiptName: value })}
				style={styles.input}
				placeholder="Nazwij rachunek"
				placeholderTextColor={"#00204750"}
			/>

			{/* Subtitle */}
			<Text style={styles.subtitle}>Sklep</Text>

			{/* Form */}
			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				{/* Shop name */}
				<TextInput value={form.shopName} onChangeText={(value) => setForm({ ...form, shopName: value })} style={styles.input} placeholder="Nazwa sklepu" placeholderTextColor={"#00204750"} />

				{/* Street */}
				<TextInput
					value={form.shopAddress.street}
					onChangeText={(value) => setForm({ ...form, shopAddress: { ...form.shopAddress, street: value } })}
					style={{ ...styles.input, width: "80%" }}
					placeholder="Ulica"
					placeholderTextColor={"#00204750"}
				/>
				{/* Number */}
				<TextInput
					keyboardType="numeric"
					value={form.shopAddress.number}
					onChangeText={(value) => setForm({ ...form, shopAddress: { ...form.shopAddress, number: value } })}
					style={{ ...styles.input, ...styles.inputNumber }}
					placeholder="Nr."
					placeholderTextColor={"#00204750"}
				/>
			</View>
			{error ? <Text style={styles.errorText}>Uzupełnij wszystkie pola</Text> : null}

			{/* Subtitle */}
			<Text style={styles.subtitle}>Poprzednie paragony</Text>

			{/* Receipts which are already in db */}
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
										onPress={() => navigation.navigate("AddingItems", { id: receipt.Id, place: receipt.Place, shop: receipt.Shop })}
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
	errorText: {
		textAlign: "left",
		width: "80%",
		marginTop: 5,
		color: "#fe2926",
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
