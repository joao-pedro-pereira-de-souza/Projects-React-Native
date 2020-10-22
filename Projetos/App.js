
import React ,{useState,useCallback, useEffect} from 'react';

import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity , 
  Image, 
  StatusBar ,
  FlatList,
  Modal,
  TextInput,
  AsyncStorage

}  
from 'react-native';

import {Ionicons} from '@expo/vector-icons';

import TaskList from './src/componet/TaskList';

import * as Animatable from 'react-native-animatable';

const AnimationBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  // Variáveis
  const [task , setTask] = useState([]);

  const [open , setOpen] = useState(false)

  const [input , setInput] = useState('')
  //

  function handeAdd(){
    if(input == '')return;

    const data = {
      key: input,
      task:input
      
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('')
  }

  // carregando a lista quando o app abrir.

 useEffect(()=>{

  async function loadTask(){
    const taskStorage = await AsyncStorage.getItem('@task')

    if(taskStorage){
      setTask(JSON.parse(taskStorage));
    }
  }

  loadTask();

 }, []);
//

 // Salvando lista
 useEffect(() => {

  async function saveTask(){
    await AsyncStorage.setItem('@task' , JSON.stringify(task));
  }

  saveTask();

 }, [task]);
 //

 const handleDelete =  useCallback((data) =>{

   const find = task.filter(r => r.key != data.key);

   setTask(find);

   
 })

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>Lista de agenda</Text>

      
      <FlatList 
      
      style={styles.containerList}
      marginHorizontal={10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={(item) => String(item.key)}
      renderItem={ ({item}) => <TaskList data = {item} handleDelete={handleDelete}/>}
      />

      <Modal animationType="slide" transparent={false} visible={open}>

        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>

            <TouchableOpacity onPress={()=> setOpen(false)}>

            <Ionicons style={{marginLeft:5,marginRight:5}} name='md-arrow-back' size={40} color="#32ff7e"/>

            </TouchableOpacity>

            <Text style={styles.modalTitle}>Nova tarefa</Text>
           
          </View>

          <Animatable.View style={styles.modalBody}
          animation="fadeInUp" useNativeDriver
          duration={150}
          >

            <TextInput placeholder="Escreva uma tarefa" 
            style={styles.input} multiline={true}
            placeholderTextColor="#4b4b4b"
            autoCorrect={false}
            value={input}
            onChangeText={(texto)=> setInput(texto)}
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handeAdd}>
              <Text style={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>

      </Modal>

      <AnimationBtn style={styles.fab}
      useNativeDriver
      animation='bounceInUp'
      duration={1500}
      
      onPress ={() => setOpen(true)}
      >

      <Ionicons name='ios-add' size={30} color='white'/>

      </AnimationBtn>

      <SafeAreaView style={styles.contentIlus} >

      <Text style={styles.paragrafo}>Adicione mais uma agenda na lista</Text>
        
      </SafeAreaView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7d5fff',
     
  },

  titulo:{
    textAlign:"center",
    marginTop:60,
    marginBottom:10,
    color:'white',
    fontWeight:"bold",
    fontSize:25,
  },

  paragrafo:{
    textAlign:"center",
    marginTop:28,
    marginLeft:30,
    color:'white',
    fontWeight:"bold",
    fontSize:14,
  },
  containerList:{
    
    marginTop:20,
    

  },
// Button cicle
  fab:{
    alignItems:"center",
    justifyContent:"center",
    width:60,
    height:60,
    backgroundColor:'#3ae374',
    borderRadius:30,

    position:"absolute",
    bottom: 20,
    right:10,
    elevation:9,
    zIndex:9,
    shadowColor:'black',
    shadowOpacity:0.2,
     
  },
//
  contentIlus:{
    
    backgroundColor:'#32ff7e',
    position:"absolute",
    right:0,
    bottom:0,

    borderTopLeftRadius: 100,
    height: 200,
    width:200,
    

  },

 modal:{
   flex:1,
   backgroundColor:'#7d5fff',
   
 },
 modalHeader:{
   marginTop:10,
   marginLeft:10,
   marginRight:20,
   flexDirection:'row',
   alignItems:"center"
 },
 modalTitle:{
   color:'white',
   fontSize:20,
   fontWeight:"bold",
   marginLeft:25
   
 },
 modalBody:{
   marginTop:15,
 },
 input:{
   fontSize:15,
   marginLeft:10,
   marginRight:10,
   marginTop:30,
   backgroundColor:'white',
   padding:10,
   borderRadius:4,
   height:80,
   textAlignVertical:"top"
 },

 handleAdd:{

   backgroundColor:"#32ff7e",
   alignItems:"center",
   justifyContent:"center",
   margin:10,
   height:50,
   elevation:6,
   borderRadius:4,

   shadowColor:'black',
   shadowOpacity:0.2,

 },
 handleAddText:{
   color:'white',
   fontSize:18,
   fontWeight:"bold"
 }


});
