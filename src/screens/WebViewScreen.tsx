import React, { useState, useRef } from 'react';
import { Modal, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ navigation, route }) => {

  const [animatingAI, setAnimatingAI] = useState(true);
  let data123 = useRef(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      data123.current.reload();
    })

    return unsubscribe;
  }, [])

  return (
    <>
      <Modal
        visible={animatingAI}
        transparent={true}
      >
        <View style={styles.modalView}>
          <ActivityIndicator size={60} color="white" animating={animatingAI} />
          <Text>  </Text>
          <Text style={{ textAlign: "center", color: "white" }}> Loading... </Text>
        </View>
      </Modal>

      <WebView
        style={{ marginTop: 30 }}
        ref={data123}
        source={{ uri: "http://164.100.251.19/AanganPublic/GetToken.aspx" }}
        onLoadStart={() => setAnimatingAI(true)}
        onLoadEnd={() => { setAnimatingAI(false); console.log(route.params.bid) }}
        injectedJavaScript={`document.getElementById("ctl00_MainContent_txtAadhar").value = ${route.params.bid}`}
      />

      <View style={{ width: "100%", position: "absolute", bottom: 0, flexDirection: "row", justifyContent: "flex-end" }}>
        <Text onPress={() => { data123.current.goBack() }} style={styles.buttons} > {"<"} </Text>
        <Text onPress={() => { data123.current.goForward() }} style={styles.buttons} > {">"} </Text>
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginTop: "80%",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "indigo",
    marginHorizontal: 15,
    elevation: 15
  },
  buttons: {
    fontSize: 35,
    fontWeight: "bold",
    backgroundColor: "indigo",
    color: "white",
    margin: 10,
    paddingHorizontal: 5,
    borderRadius: 50
  }
});
export default WebViewScreen;