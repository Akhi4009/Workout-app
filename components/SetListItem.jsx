import { Text,View } from 'react-native'
import {formatDistanceToNow} from "date-fns"



const SetListItem = ({item}) => {

    const timeStamp = parseInt(item._id.substr(0,8), 16) *1000;
    const createdAt = new Date(timeStamp);
  return (
    <View style={{
        backgroundColor:'white',
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
        gap:5
    }}>
    <Text style={{fontWeight: 'bold'}}>
    {item.reps} * {item.weight} {' '} 
    </Text>
    <Text style={{color: 'gray'}}>
    {formatDistanceToNow(createdAt)}
    </Text>
    </View>
  )
}

export default SetListItem