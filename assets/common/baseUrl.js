import { Platform } from "react-native";

let baseUrl = "";

{
    Platform.OS == "android"
        ? (baseUrl = "http://192.168.240.226:6002")
        : (baseUrl = "http://172.20.10.7:6002");
}

export default baseUrl;