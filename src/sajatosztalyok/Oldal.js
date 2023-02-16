/* eslint-disable no-unused-vars */
import React,{useState} from 'react';

import {
  StyleSheet,
  Button,
  View,SafeAreaView,
  Text,TouchableOpacity,TextInput,
  Alert,} from 'react-native';
  
  




const App = () =>{

const [masterDataSource,setMasterDataSource] = useState([]);
const [search,setSearch] = useState("");
const [filteredDataSource,setFilteredDataSource]=useState([]);

const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource and update FilteredDataSource
    const newData = masterDataSource.filter(function (item) {
      // Applying filter for the inserted text in search bar
      const itemData = item.orszag_nev
        ? item.orszag_nev.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
    setSearch(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredDataSource(masterDataSource);
    setSearch(text);
    }
};


//-----➣
return(
  
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
       
      </Text>


      <Text style={{marginTop:50, marginLeft:20,marginRight:20}}>Add meg a keresendő szót:</Text>      
      <TextInput
          style={{height: 35, borderColor:"#68BBE3",borderWidth:2, margin:5, padding:5, borderRadius: 20}}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Keress itt"
        />



      <TouchableOpacity
        style={styles.kekgomb}
        onPress={()=>this.keres()}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Keresés</Text>
      </TouchableOpacity>
      
      <Button
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </View>
    
    <View>
      <Text style={styles.title}>
        
      </Text>
      <Button
        title="Press me"
        color="#68BBE3"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
    </View>
  
    <View>
      <Text style={styles.title}>
        All interaction for the component are disabled.
      </Text>
      <Button
        title="Press me"
        disabled
        onPress={() => Alert.alert('Cannot press this one')}
      />
    </View>
    
    <View>
      <Text style={styles.title}>
        This layout strategy lets the title define the width of the button.
      </Text>
      <View style={styles.fixToText}>
        <Button
          title="⇦"
          onPress={() => Alert.alert('Left button pressed')}
        />
        <Button
          title="⇨"
          onPress={() => Alert.alert('Right button pressed')}
        />
      </View>
    </View>
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#68BBE3',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;