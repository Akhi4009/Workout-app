import { StyleSheet,View,Text } from "react-native";

function ExerciseListItem({item}){
    return(
      <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.exerciseSubTitle}>
       {item.muscle} {' '} {item.equipment}</Text>
      </View>
    )
};


const styles = StyleSheet.create({
    
    exerciseContainer: {
      backgroundColor:'#fff',
      padding: 10,
      borderRadius:10,
      gap: 5,
      marginHorizontal: 2,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
    },
    exerciseName: {
      fontSize: 20,
      fontWeight: '500'
    },
    exerciseSubTitle: {
      color: 'dimgray',
      textTransform: 'uppercase'
    }
  });
export default ExerciseListItem;