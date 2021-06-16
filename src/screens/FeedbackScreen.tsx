import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState("");

  const feedbackFunction = () => {
    if (feedback == "") {
      Alert.alert("Message", "Please write something !");
      return null;
    }

    console.log(" hi = ", feedback);
  }

  return (
    <>
      <Text style={styles.text}> &bull; What do you think about this application ? </Text>
      <Text style={styles.text}> &bull; Feel free to give any suggestion ! </Text>

      <TextInput
        value={feedback}
        onChangeText={(value) => setFeedback(value)}
        style={styles.inputs}
        autoFocus={true}
        autoCorrect={false}
        multiline={true}
        numberOfLines={8}
        textAlignVertical="top"
        placeholder="write your feedback or suggestion here !"
      />

      <LinearGradient
        colors={['#3939ac', 'indigo']}
        style={{ margin: 15, borderRadius: 3 }}
      >
        <Pressable onPress={feedbackFunction}>
          <Text style={styles.pressable} > Submit </Text>
        </Pressable>
      </LinearGradient>

    </>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 15
  },
  inputs: {
    margin: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 3
  },
  pressable: {
    padding: 9,
    textAlign: "center",
    color: "white",
    fontSize: 17
  }
})

export default FeedbackScreen;