import { List } from "react-native-paper";
import MyStyle from "../../styles/MyStyle";
import moment from "moment";
import { Image } from "react-native";

const Item = ({instance}) => {
    return (
        <List.Item 
            title={instance.subject} 
            description={instance.created_date?moment(instance.created_date).fromNow():""} 
            left={() => <Image style={MyStyle.avatar} 
            source={{uri: instance.image}}/>}/>
    );
}

export default Item;