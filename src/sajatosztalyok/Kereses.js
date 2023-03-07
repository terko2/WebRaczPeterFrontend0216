import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput } from 'react-native-web';

const IP=require('./Ipcim')

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      szo:"",
      dataSource:[]

    }
  }

  szavazat=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

//-----Információs Gomb
    //Gomb
  /*gombok=(gomb)=>{
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
  }*/
//--------
  fetch(IP.ipcim + "szavazatfelvitel", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }


  componentDidMount(){
    return fetch(IP.ipcim +  'auto')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  keres=()=>{
    //alert("hello")
    var bemenet={
      bevitel1:this.state.szo

    }
    alert(this.state.szo)

  fetch(IP.ipcim + "keres", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.json())
  .then(y => {
    alert(JSON.stringify(y))
    this.setState({ dataSource   :  y   })
  }
  );
  }


  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
{/*-----------------------------------------------------------Keresés  */}

        <Text style={{marginTop:50, marginLeft:490,marginRight:20,fontWeight:"bold"}}>Add meg a keresendő szót:</Text>
        <TextInput
        style={{height: 30,  marginLeft:10,marginRight:10, marginBottom:10,textAlign:"center"}}
        placeholder=""
        onChangeText={(beirtszoveg)=>this.setState({szo:beirtszoveg})}
        value={this.state.szo}
      />
      
      <TouchableOpacity
        style={styles.kekgomb}
        onPress={()=>this.keres()}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Keresés</Text>
      </TouchableOpacity>
      
{/*--------------------------------------------------------- Találatok */}    
  
        <FlatList
          data={this.state.dataSource}
          keyExtractor={({ auto_id }, index) => auto_id}
          renderItem={({item}) => 

          <View >
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.film_cim} </Text>
          <Image  source={{uri: IP.ipcim + item.auto_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />  
          <Text style={{fontSize:20,color:'black',textAlign:'center'}}>
                {item.auto_nev}
                </Text>
          <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.szavazat(item.auto_id)}
      >
        
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Foglalás</Text>
      </TouchableOpacity>
          </View>
        
        }

        
          
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "#68BBE3",
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
  },
  button_i: {
    flex:1,
    textAlign:"center",
    alignItems: "center",
    backgroundColor: "#68BBE3",
    padding: 10,
    width:25,
    borderRadius:10,
    marginLeft:1080,
    marginRight:0

  },
});