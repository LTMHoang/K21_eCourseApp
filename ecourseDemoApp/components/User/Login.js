import { Text, View } from "react-native";
import MyStyle from "../../styles/MyStyle";

const Login = () => {
    return (
        <View style={[MyStyle.container, MyStyle.margin]}>
            <Text style={[MyStyle.subject]} > ĐĂNG NHẬP NGƯỜI DÙNG </Text>
        </View>
    );
}

export default Login;