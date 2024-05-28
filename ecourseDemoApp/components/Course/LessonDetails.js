import MyStyle from "../../styles/MyStyle";
import React from "react";
import APIs, { endpoints } from "../../configs/APIs";
import { ActivityIndicator, Card, List } from "react-native-paper";
import { Image, ScrollView, Text, View, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import { isCloseToBottom } from "../Utils/Utils";
import moment from "moment";

const LessonDetails = ({ route }) => {
    const [lesson, setLesson] = React.useState(null);
    const [comments, setComments] = React.useState(null);
    const lessonId = route.params?.lessonId;
    const { width } = useWindowDimensions();

    const loadLesson = async () => {
        try {
            let res = await APIs.get(endpoints['lesson-details'](lessonId));
            setLesson(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadComments = async () => {
        try {
            let res = await APIs.get(endpoints['comments'](lessonId));
            setComments(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    React.useEffect(() => {
        loadLesson();
    }, [lessonId]);

    const loadMoreInfo = ({nativeEvent}) => {
        if (!comments && isCloseToBottom(nativeEvent)) {
            loadComments();
        }
    }

    return (
        <View style={[MyStyle.container, MyStyle.margin]}>
            <ScrollView onScroll={loadMoreInfo}>
                {lesson === null ? <ActivityIndicator/> : <>
            
                <Card>
                    <Card.Title titleStyle={[MyStyle.subject]} title={lesson.subject} subtitle="Card Subtitle" />
                    
                    <Card.Cover source={{ uri: lesson.image }} />

                    <Card.Content>
                        <RenderHTML contentWidth={width} source={{ html: lesson.content }} />
                    </Card.Content>

                    {comments === null ? <ActivityIndicator/> : <>
                        {comments.map(c => <List.Item 
                            title={c.content} 
                            description={moment(c.created_date).fromNow()} 
                            left={() => <Image style={MyStyle.avatar} source={{uri: c.user.avatar}} />} />)}
                    </>}
                </Card>

                </>}
            </ScrollView>
        </View>
    );
}

export default LessonDetails;