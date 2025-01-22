import { Platform } from "react-native";

let baseUrl = "";

{
    Platform.OS == "android"
        ? (baseUrl = "http://192.168.1.137:6002")
        : (baseUrl = "http://192.168.23.103:6002")

}

export default baseUrl;