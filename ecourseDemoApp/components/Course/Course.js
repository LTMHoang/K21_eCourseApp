import React from "react";
import { View, Text, ScrollView, Image, RefreshControl, Touchable, TouchableOpacity } from "react-native"
import { ActivityIndicator, Chip, List, Searchbar } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";
import MyStyle from "../../styles/MyStyle"
import moment from "moment";
import 'moment/locale/vi'
import Item from "../Utils/Item";
import { isCloseToBottom } from "../Utils/Utils";

const Course = ({ navigation }) => {
    const [categories, setCategories] = React.useState(null);
    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [q, setQ] = React.useState("");
    const [cateId, setCateId] = React.useState("");
    const [page, setPage] = React.useState(1);

    const loadCates = async () => {
        try {
            let res = await APIs.get(endpoints['categories']);
            setCategories(res.data);
        } catch (ex) {
            console.error(ex)
        }
    }

    const loadCourses = async () => {
        if (page > 0) {
            let url = `${endpoints['courses']}?q=${q}&category_id=${cateId}&page=${page}`;

            try {
                setLoading(true);
                let res = await APIs.get(url);
                if (page === 1)
                    setCourses(res.data.results);
                else if (page > 1)
                    setCourses(current => {
                        return[...current, ...res.data.results]
                    })
                if (res.data.next === null)
                    setPage(0);
            } catch (ex) {
                console.error(ex)
            } finally {
                setLoading(false);
            }
        }
    }

    // const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    //     const paddingToBottom = 20;
    //     return layoutMeasurement.height + contentOffset.y >=
    //       contentSize.height - paddingToBottom;
    // };

    const loadMore = ({nativeEvent}) => {
        if (loading === false && isCloseToBottom(nativeEvent)) {
            setPage(page + 1);
        }
    }

    const search = (value, callback) => {
        setPage(1);
        callback(value);
    }

    React.useEffect(() => {
        loadCates();
    }, []);

    React.useEffect(() => {
        loadCourses();
    }, [q, cateId, page]);

    return (
        <View style={[MyStyle.container, MyStyle.margin]}>
            <Text style={MyStyle.subject}>DANH MỤC KHÓA HỌC</Text>
            <View style={MyStyle.row}>
                <Chip mode={!cateId?"outlined":"flat"} onPress={() => search("", setCateId)} style={MyStyle.margin} icon="shape-outline">Tất cả</Chip>
                {categories === null?<ActivityIndicator />:<>
                {categories.map(c => <Chip mode={cateId === c.id?"outlined":"flat"} onPress={() => search(c.id, setCateId)} style={MyStyle.margin} key={c.id} icon="shape-outline">{c.name}</Chip>)}
            </>}
            </View>

            <Searchbar placeholder="Tìm kiếm khóa học..." value={q} onChangeText={t => search(t, setQ)}/>

            <ScrollView onScroll={loadMore}>
                <RefreshControl onRefresh={() => loadCourses()}/>
                {loading && <ActivityIndicator/>}
                {courses.map(c => <TouchableOpacity key={c.id} onPress={() => navigation.navigate('Lesson', {'courseId': c.id})}>

                    {/* <List.Item 
                    title={c.subject} 
                    description={moment(c.created_date).fromNow()} 
                    left={() => <Image style={MyStyle.avatar} 
                    source={{uri: c.image}}/>}/> */}

                    <Item instance={c} />
                </TouchableOpacity>)}
                {loading && page > 1 && <ActivityIndicator/>}
            </ScrollView>
        </View>
    )
}

export default Course;