import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';

// comps
import HindiGuideScreen from '../components/HindiGuideScreen';
import BhojpuriGuideScreen from '../components/BhojpuriGuideScreen';
import EnglishGuideScreen from '../components/EnglishGuideScreen';

const GuideScreen = () => {
  const [compName, setCompName] = useState("HindiGuideScreen");

  console.log("Comp Name = ", compName);

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={styles.button}> भाषा चुने : </Text>
        </View>
        <View>
          <ScrollView
            horizontal={true}
          >
            <Text style={styles.button} onPress={() => setCompName("HindiGuideScreen")}> हिन्दी </Text>
            <Text style={styles.button} onPress={() => setCompName("BhojpuriGuideScreen")} > भोजपुरी </Text>
            <Text style={styles.button} onPress={() => setCompName("EnglishGuideScreen")}> English </Text>
          </ScrollView>
        </View>
      </View>


      <View style={{ flexDirection: "column", alignItems: "center", top: '35%' }}>
        {
          compName === "HindiGuideScreen" ? <HindiGuideScreen /> : compName === "BhojpuriGuideScreen" ? <BhojpuriGuideScreen /> : <EnglishGuideScreen />
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10
  }
})

export default GuideScreen;