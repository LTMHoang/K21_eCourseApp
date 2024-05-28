import React from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { ActivityIndicator } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";
import MyStyle from "../../styles/MyStyle";
import Item from "../Utils/Item";

const Lesson = ({ route, navigation }) => {
    const [lessons, setLessons] = React.useState(null);
    const courseId = route.params?.courseId;

    const loadLessons = async () => {
        try {
            let res = await APIs.get(endpoints['lessons'](courseId));
            setLessons(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    React.useEffect(() => {
        loadLessons();
    }, [courseId]);

    return (
        <View style={[MyStyle.container, MyStyle.margin]}>
            <Text style={MyStyle.subject}>DANH MỤC BÀI HỌC {courseId}</Text>

            {lessons === null ? <ActivityIndicator /> : <>
                {lessons.map(l => <TouchableOpacity key={l.id} onPress={() => navigation.navigate("LessonDetails", {lessonId: l.id})}> 
                    <Item instance={l} />
                </TouchableOpacity>)}
            </>}
        </View>
    );
}

export default Lesson;