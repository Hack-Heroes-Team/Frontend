import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/Entypo";

export default function AddingReceipt({ navigation }) {
	let cameraRef = useRef();
	const [hasCameraPermission, setHasCameraPermission] = useState();
	const [photo, setPhoto] = useState();
	const [screen, setScreen] = useState("camera");

	useEffect(() => {
		(async () => {
			const cameraPermission = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraPermission.status === "granted");
		})();
	}, []);

	if (hasCameraPermission === undefined) {
		return <Text>Requesting permissions...</Text>;
	} else if (!hasCameraPermission) {
		return <Text>Permission for camera not granted. Please change this in settings.</Text>;
	}

	let takePic = async () => {
		if (screen == "camera") {
			let options = {
				quality: 1,
				base64: true,
				exif: false,
			};

			let newPhoto = await cameraRef.current.takePictureAsync(options);
			setPhoto(newPhoto);
			navigation.goBack();
		} else setScreen("camera");
	};

	return (
		<>
			{screen == "camera" ? (
				<Camera flashMode={"auto"} style={styles.container} ref={cameraRef}>
					<TouchableOpacity onPress={() => takePic()} style={styles.camera.icon}>
						<Icon name="camera" style={{ color: "#fff" }} size={40} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setScreen("write")} style={styles.camera.icon2}>
						<Icon name="new-message" style={{ color: "#fff" }} size={25} />
					</TouchableOpacity>
				</Camera>
			) : (
				<View style={{ flex: 1, flexDirection: "column", alignItems: "center", marginTop: 50 }}>
					<TouchableOpacity onPress={() => setScreen("camera")} style={styles.manual.icon}>
						<Icon name="camera" style={{ color: "#fff" }} size={25} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setScreen("write")} style={styles.manual.icon2}>
						<Icon name="check" style={{ color: "#fff" }} size={40} />
					</TouchableOpacity>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	camera: {
		icon: {
			backgroundColor: "#fe2926",
			position: "absolute",
			bottom: 30,
			padding: 15,
			alignSelf: "center",
			borderRadius: 50,
		},
		icon2: {
			backgroundColor: "#002047",
			position: "absolute",
			bottom: 37.5,
			right: 10,
			padding: 15,
			alignSelf: "flex-end",
			borderRadius: 50,
		},
	},
	manual: {
		icon2: {
			backgroundColor: "#fe2926",
			position: "absolute",
			bottom: 30,
			padding: 15,
			alignSelf: "center",
			borderRadius: 50,
		},
		icon: {
			backgroundColor: "#002047",
			position: "absolute",
			bottom: 37.5,
			right: 10,
			padding: 15,
			alignSelf: "flex-end",
			borderRadius: 50,
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
	},
});
