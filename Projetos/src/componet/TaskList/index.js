import React from 'react';
import {Text , View , StyleSheet , TouchableOpacity} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
export default function TaskList({data,handleDelete}){

    return(

        <Animatable.View style={style.container}
        animation='bounceIn'
        useNativeDriver
        >
          
            <TouchableOpacity onPress={() => handleDelete(data)}>

                <Ionicons name='md-checkmark-circle' size={30} color="#32ff7e" />

            </TouchableOpacity>
            <View>
                <Text style={style.titulo}>{data.task}</Text>
            </View>
        </Animatable.View>
    )


}

const style = StyleSheet.create({

container:{
flex:1,
margin:8,
flexDirection: 'row',
alignItems:"center",
backgroundColor:'white',
borderRadius:5,
padding:10,
elevation:1.5,
shadowColor:'#000',
shadowOpacity:0.2,
shadowOffset:{
    width:1,
    height:3
}
},
titulo:{
    
    fontSize:20,
    color: '#4b4b4b',
    paddingLeft:10,
    paddingRight:20,
   fontWeight:"bold"
    
}

});