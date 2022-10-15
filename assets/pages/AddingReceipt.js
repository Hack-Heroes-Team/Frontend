import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/Entypo";

export default function AddingReceipt({ navigation }) {
	let cameraRef = useRef();
	const [hasCameraPermission, setHasCameraPermission] = useState();
	const [photo, setPhoto] = useState();

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
		let options = {
			quality: 1,
			base64: true,
			exif: false,
		};

		let newPhoto = await cameraRef.current.takePictureAsync(options);
		setPhoto(newPhoto);
		navigation.goBack();
	};

	return (
		<Camera flashMode={"auto"} style={styles.container} ref={cameraRef}>
			<TouchableOpacity onPress={() => takePic()} style={styles.icon}>
				<Icon name="camera" style={{ color: "#fff" }} size={40} />
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					navigation.goBack();
					navigation.push("AddingReceiptManualy");
				}}
				style={styles.icon2}
			>
				<Icon name="new-message" style={{ color: "#fff" }} size={25} />
			</TouchableOpacity>
		</Camera>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

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
		borderRadius: 50,
	},
});
