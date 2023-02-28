
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
      const response = await fetch(IP.ipcim+'auto');
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

  //-------------Feltöltés------------------
  feltoltes=(szam)=>{
    //alert(szam)
    var adatok={
      bevitel1:szam
    }
    alert(adatok.bevitel1)
    const response = fetch('http://192.168.6.7:3000/feltoltes',{
      method: "POST",
      body: JSON.stringify(adatok),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
      const text =  response.text();
      console.log(text)
  }

  torles=(szam)=>{
    //alert(szam)
    var adatok={
      bevitel1:szam
    }
    alert(adatok.bevitel1)
    const response = fetch(IP.ipcim+'autoktorles',{
      method: "DELETE",
      body: JSON.stringify(adatok),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });
      
      console.log(response)
  }

  
  componentDidMount() {
    this.getMovies();
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

 


atalakit=(parameter)=>{
  var kecske=parameter.split('T')
  return (kecske[0])
}
  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 1 , marginTop:40}}>
        
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ auto_id }, index) => auto_id}
            renderItem={({ item }) => (

              <View style={{backgroundColor:'black',marginBottom:5}}>


                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
              <Text style={{fontSize:20,color:'black',textAlign:'center'}}>
                {item.auto_nev}
                </Text>
                <TouchableOpacity
          style={styles.button}
          onPress={async ()=>this.feltoltes(item.auto_neve)}
        >
          <Text style={{fontStyle:"italic",color:'white',fontSize:20,}}>⇑ </Text>
          
          
        </TouchableOpacity>   
        <Text style={{fontStyle:"italic",color:'black',fontSize:20,textAlign:'center'}}>Feltöltés</Text>

                

  
                

               
               

              <Image   source={{uri: IP.ipcim + item.auto_kep}} style={{width:230,height:170,alignSelf:'center',transform:[{rotate:'328deg'}]}}   />
              
              
              <Text style={{fontSize:18,color:'black',textAlign:'center'}}>
                {item.auto_ar}
                </Text>
                { item.auto_akcio===''    ? 
              null
              :   <View>
              <Text style={{fontSize:15,backgroundColor:'#FFBF00',textAlign:'center',}}>Akciós ár :</Text>
                <Text style={{fontSize:20,backgroundColor:'#FFBF00',textAlign:'center'}}>{item.auto_akcios_ar}</Text>
                </View>
              }
              
                <Text style={{fontSize:20,color:'black',textAlign:'right'}}>
                {item.auto_akcios_ar}
                </Text>

              
              
              <TouchableOpacity
          style={styles.button}
          onPress={async ()=>this.torles(item.auto_id)}
        >
          <Text style={{fontStyle:"italic",color:'white',fontSize:20,}}>Törlés</Text>
          
          
        </TouchableOpacity>   

        
     
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
    marginLeft:50,
    marginRight:50
  },


  button_i: {
    flex:1,
    textAlign:"center",
    alignItems: "center",
    backgroundColor: "#68BBE3",
    padding: 0,
    width:15,
    borderRadius:10,
    marginLeft:1080,
    marginRight:0

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
