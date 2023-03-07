import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity,ImageBackground } from 'react-native-web';

//const ipcim="192.168.6.7:3000";

const IP = require('./Ipcim');
const image = {uri: 'https://media.istockphoto.com/id/1297855347/photo/white-plane-on-the-blue-runway-top-view-and-white-background-minimal-idea-concept-aircraft.jpg?b=1&s=170667a&w=0&k=20&c=nfSPqWMIMk_nhNDgz7Lk3uorrOAdGwQ4K2sBHYpXsxA='};

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      isLoading: true,
      datum:"",
      nap:""
    };
  }



  async getMovies() {
    try {
      const response = await fetch(IP.ipcim+'elerhetoseg');
      const json = await response.json();
      //alert(JSON.stringify(json))
      console.log(json)
      this.setState({ data: json });

    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  
  componentDidMount() {
    this.getMovies();
  }

  szavazat=(szam)=>{
    //alert(szam)
    var adatok={
      bevitel1:szam
    }
    alert(adatok.bevitel1)
    const response = fetch(IP.ipcim+'szavazat',{
      method: "POST",
      body: JSON.stringify(adatok),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
      const text =  response.text();
      console.log(text)
  }

//Gomb
  gombok=(gomb)=>{
    //alert(szam)
    var adatok={
      button_i:gomb
    }
    alert(adatok.button_i)
    const response = fetch(IP.ipcim+'auto_adatok',{
      method: "POST",
      body: JSON.stringify(adatok),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
      const text =  response.text();
      console.log(text)
  }

 



  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 1 , marginTop:40}}>
        
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ el_id }, index) => el_id}
            renderItem={({ item }) => (

              <View style={{backgroundColor:'black',marginBottom:5}}>


                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
              <Text style={{fontSize:20,color:'#68BBE3',textAlign:'left'}}>
                {item.el_nev}
                </Text>
                <TouchableOpacity
          style={styles.button_i_2}
          onPress={async ()=>this.szavazat(item.auto_adatok)}
        >
          <Text style={{color:'black',fontSize:20}}>ⓘ</Text>
          
        </TouchableOpacity>   
                
              

  
               


               
               

              <Image   source={{uri: IP.ipcim + item.auto_kep}} style={{width:230,height:170,alignSelf:'left',transform:[{rotate:'328deg'}]}}   />
              
              
              
              
                

              <Text style={{fontSize:15,color:'black',textAlign:'left'}}>
               Elérhetőségi telefonszáma: +36{item.eler_szam}
              </Text>


            



              

        
     
    </ImageBackground>
                

                
              </View>
            )}
          />
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
    justifyContent: "center",
    alignContent:"center",
    paddingHorizontal: 20,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
      marginRight:1,
      padding:16,
      
    }
  },

  
  button: {
    alignItems: "center",
    backgroundColor: "#68BBE3",
    padding: 10,
    marginLeft:200,
    marginRight:200
  },


  button_i: {
    flex:1,
    textAlign:"center",
    alignItems: "center",
    backgroundColor: "#68BBE3",
    padding: 10,
    width:25,
    borderRadius:10,
  

  },

  button_i_2:{
    flex:1,
    textAlign:"center",
    alignItems: "center",
    marginRight:500,
  },

  countContainer: {
    alignItems: "center",
    padding: 10
  },


  image: {
    flex: 1,
    justifyContent: 'center',
    
    
  },

  
  text: {
    color: 'white',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
    
  },
});