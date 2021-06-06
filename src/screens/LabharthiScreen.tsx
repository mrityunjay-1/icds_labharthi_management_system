import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, TextInput, Linking, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
import ContextData from '../components/GlobalContext';
import { MaterialIcons } from '@expo/vector-icons';

// GreetingScreen
import GreetingScreen from '../components/GreetingScreen';

const GetBenificieryCard = ({ bendata, delete_function, moveto_web_page, edit_function }: any) => {
  return (
    <View style={styles.benComp}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{bendata.name} </Text>
      <Text style={{ color: "grey", fontSize: 12, fontWeight: "bold" }} >{bendata.parent_name} </Text>
      <Text
        onPress={() => {
          moveto_web_page(bendata.aadhaar)
        }}
        style={styles.aadhaar}>
        {bendata.aadhaar.slice(0, 4)} {bendata.aadhaar.slice(4, 8)} {bendata.aadhaar.slice(8, 12)}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: "grey" }} onPress={() => Linking.openURL(`tel:${bendata.contact}`)} >No: {bendata.contact}</Text>
        <Text>
          <Text onPress={() => { delete_function(bendata.aadhaar) }}> <MaterialIcons name="delete" size={25} /> </Text>
          <Text onPress={() => { edit_function(bendata) }} > <MaterialIcons name="edit" size={25} color="green" /> </Text>
        </Text>
      </View>
    </View >
  );
}

const LabharthiScreen = ({ navigation }: any) => {

  let { db_object }: any = useContext(ContextData);
  const [labharthiData, setLabharthiData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchBox, setSearchBox] = useState("");

  function get_data() {
    db_object.transaction((tx: any) => {
      tx.executeSql(
        `SELECT * FROM record`,
        [],
        (arg1: any, response: any) => {
          setLabharthiData(response.rows._array);
          setSearchResult(response.rows._array);
        })
    });
  }

  function delete_data(bid: string) {
    db_object.transaction((tx: any) => {
      tx.executeSql(
        `DELETE FROM record WHERE aadhaar="${bid}"`,
        [],
        (arg1: any, response: any) => { alert("Data successfully deleted !") }
      );
    });

    get_data();
  }

  function moveto_web_page(bid: string) {
    navigation.navigate("WebViewScreen", { bid });
  }

  useEffect(() => {
    get_data();
    const unsubscribe = navigation.addListener("focus", () => {
      get_data();
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <GreetingScreen />

      {/* search Box Result */}
      <View>
        <TextInput
          placeholder="search"
          style={styles.searchBox}
          value={searchBox}
          onChangeText={(value) => {
            setSearchBox(value);
            let new_data = labharthiData.filter((item) => {
              return item.name.includes(value) || item.parent_name.includes(value) || item.aadhaar.includes(value);
            });
            setSearchResult(new_data);
          }}
        />
      </View>

      {/* Rendering Labharthi Data */}
      <FlatList
        data={searchBox === "" ? labharthiData : searchResult}
        keyExtractor={(item) => item.aadhaar}
        renderItem={({ item, index }) => {
          return (
            <GetBenificieryCard
              bendata={item}
              delete_function={(bid: string) => delete_data(bid)}
              moveto_web_page={(bid: string) => moveto_web_page(bid)}
              edit_function={(beneData: any) => { navigation.navigate("EditScreen", { beneData }) }}
            />
          );
        }}
      />

      {/* Beneficiery Adding Button */}
      <TouchableWithoutFeedback onPress={() => { navigation.navigate("IndexScreen") }} >
        <Text style={styles.addButton} >
          <MaterialIcons name="add" size={27} />
        </Text>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: "white",
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5
  },
  addButton: {
    fontSize: 30,
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "indigo",
    color: "white",
    margin: 20,
    padding: 16,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  benComp: {
    borderRadius: 5,
    backgroundColor: "white",
    margin: 5,
    marginHorizontal: 10,
    elevation: 20,
    padding: 10,
    paddingHorizontal: 20
  },
  aadhaar: {
    color: "indigo",
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "bold"
  }
});

export default LabharthiScreen;