import { Text, View } from "react-native";
import MyStyle from "../../styles/MyStyle";

const Register = () => {
    return (
        <View style={[MyStyle.container, MyStyle.margin]}>
            <Text style={[MyStyle.subject]} > ĐĂNG KÝ NGƯỜI DÙNG </Text>
        </View>
    );
}

export default Register;