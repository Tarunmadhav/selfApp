import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
  Image,Linking,Platform,
  Button} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class Location extends Component{
    constructor(){
        super();
        this.state={
            longitude:"",
            lattitude:"",
            weather:"",
            contact:"",
            userId:firebase.auth().currentUser.email,
        }
    }

   
    

getLocation=()=>{
    var lattitude
    navigator.geolocation.getCurrentPosition((position)=>{
        this.setState({
            lattitude:position.coords.latitude,
            longitude:position.coords.longitude,
        })
    })
}
componentDidMount(){
    this.getLocation()
}

Weather=async()=>{
    var url="https://fcc-weather-api.glitch.me/api/current?lat="+this.state.lattitude+"&lon="+this.state.longitude
    return fetch(url)
    .then(response=>response.json())
    .then(responseJson=>{
      this.setState({
        weather:responseJson
      })
    })
    .catch(
      error=>{
        console.error(error)
      }
    )
  }

  addNotification=()=>{
      db.collection("relatives").where("senderEmail" ,"==",this.state.userId).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
        var data = doc.data()
        this.setState({
            contact:data.contact
        })
        var msg = ""
        db.collection("notifications").add({
            msg:"Help Me,I am in Location"+this.state.weather.name,
            notificationStatus:"Unread",
            date:firebase.firestore.FieldValue.serverTimestamp(),
            targetedUserId:data.email_id,
            senderId:data.senderEmail
        })
        });
      })
  }
  makeCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${{this.state.contact}}';
    } else {
      phoneNumber = 'telprompt:${{this.state.contact}}';
    }

    Linking.openURL(phoneNumber);
  };
render(){
    return(
        <View style={{marginTop:100}}>
           <Button 
           title="Location"
           onPress={()=>{
               this.Weather(),
                this.addNotification()
            }}
           />
           
           <Button
           title="Make a Call"
           onPress={()=>{
               this.makeCall()
           }}
           />

<Text>
    {this.state.lattitude}
</Text>
           <Text>
               {this.state.longitude}
           </Text>
           <Text>
               {this.state.weather.name}
           </Text>
        </View>
    )
}

}
