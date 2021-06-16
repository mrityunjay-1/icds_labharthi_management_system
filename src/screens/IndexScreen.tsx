import React, { useReducer, useContext, useState } from 'react';
import { Text, View, TextInput, FlatList, StyleSheet, Pressable } from 'react-native';
import ContextData from '../components/GlobalContext';

let data = {
  name: "",
  parent_name: "",
  aadhaar: "",
  contact: ""
}

const reducer = (state: any, action: any) => {
  if (action.type === "renew") {
    return data;
  }
  let data2 = { ...state };
  data2[action.type] = action.payload;
  return data2;
}

const IndexScreen = ({ navigation }: any) => {
  let { db_object }: any = useContext(ContextData);

  const [mainData, dispatch] = useReducer(reducer, data);

  function save_data() {
    // data validation
    if (mainData.name == "" || mainData.parent_name == "" || mainData.aadhaar == "" || mainData.contact == "") {
      alert("Please Fill all the inputs ! ");
      return;
    }
    if (mainData.aadhaar.length !== 12) {
      alert("Please check aadhaar number !");
      return;
    }
    if (mainData.contact.length !== 10) {
      alert("Please check contact number !");
      return;
    }

    // performing queries
    db_object.transaction(
      // arg1
      (tx: any) => {
        tx.executeSql(
          `INSERT INTO record VALUES("${mainData.name}", "${mainData.parent_name}", "${mainData.aadhaar}", "${mainData.contact}")`,
          [],
          (dat: any, dat2: any) => { console.log("saved") })
      },
      // arg 2  for Error
      () => { alert("Something Went Wrong, Please Try again!") },
      // arg3 for Success
      () => { alert("Data SuccessFully Saved"); dispatch({ type: "renew" }); }

    )
  }

  return (
    <>
      <FlatList
        data={Object.values(mainData)}
        renderItem={({ item, index }) => {
          let type = Object.keys(data)[index];
          return (
            <View style={{ marginHorizontal: 27, marginVertical: 10 }}>

              <Text style={{ fontSize: 15, color: "grey", paddingBottom: 3 }} >{type} </Text>

              <TextInput
                style={styles.textinputs}
                autoCapitalize="words"
                autoCorrect={false}
                value={item + ""}
                onChangeText={(value) => { dispatch({ type, payload: value }) }}
                keyboardType={type == "aadhaar" || type == "contact" ? "number-pad" : "default"}
                placeholder={`Enter ${type}`}
                maxLength={type == "aadhaar" ? 12 : type == "contact" ? 10 : 150}
              />
            </View>
          );
        }}
      />

      <View style={{ flexDirection: 'row', justifyContent: "space-around", marginBottom: 15 }}>

        <Pressable onPress={() => { navigation.navigate("LabharthiScreen"); }}>
          <Text style={styles.buttons}> Show List </Text>
        </Pressable>


        <Pressable onPress={() => { save_data(); }} >
          <Text style={styles.buttons}> Save </Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textinputs: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    fontSize: 16,
    paddingHorizontal: 8
  },
  buttons: {
    backgroundColor: "indigo",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 3,
    borderWidth: 1,
    elevation: 5,
    color: "white"
  }
});

export default IndexScreen;