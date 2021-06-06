import React, { useReducer, useState, useContext } from 'react';
import { Text, View, FlatList, TextInput, StyleSheet, Pressable } from 'react-native';
import ContextData from '../components/GlobalContext';

const reducer = (state: any, action: any) => {
  let data = { ...state };
  data[action.type] = action.payload;
  return data;
}

const EditScreen = ({ route }: any) => {
  const { db_object }: any = useContext(ContextData);
  const [beneData, dispatch] = useReducer(reducer, route.params.beneData);

  // saving Edited Data
  function saveEditedData() {
    db_object.transaction((tx: any) => {
      tx.executeSql(
        `UPDATE record SET name='${beneData.name}', parent_name='${beneData.parent_name}', aadhaar='${beneData.aadhaar}', contact='${beneData.contact}' WHERE aadhaar='${beneData.aadhaar}' `,
        [],
        (arg1: any, response: any) => { alert("Data successfully updated !") }
      )
    },
      (err) => console.log(err));
  }


  return (
    <>
      <FlatList
        data={Object.values(beneData)}
        renderItem={({ item, index }) => {
          let type = Object.keys(beneData)[index];
          return (
            <View style={{ margin: 10, marginHorizontal: 25 }}>
              <Text style={{ color: "grey" }}>{type} </Text>
              <TextInput value={item} onChangeText={(value) => { dispatch({ type, payload: value }) }} style={styles.inputs} />
            </View>
          );
        }}
      />

      <Pressable onPress={saveEditedData} >
        <Text style={styles.save}> Save </Text>
      </Pressable>

    </>
  );
};

const styles = StyleSheet.create({
  inputs: {
    borderRadius: 2,
    borderColor: "grey",
    padding: 5,
    borderWidth: 1
  },
  save: {
    margin: 25,
    textAlign: "center",
    backgroundColor: "indigo",
    color: "white",
    borderRadius: 3,
    padding: 8,
    fontSize: 20
  }
});

export default EditScreen;