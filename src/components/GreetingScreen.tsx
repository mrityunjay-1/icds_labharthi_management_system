import React from 'react';
import { Text, View } from 'react-native';

const GreetingScreen = () => {
  let greeting_word = "Welcome !";

  const hours = new Date().getHours();

  if (hours >= 0 && hours < 12) {
    greeting_word = "Good Morning !";
  } else if (hours >= 12 && hours < 16) {
    greeting_word = "Good Afternoon !";
  } else if (hours >= 16 && hours < 20) {
    greeting_word = "Good Evening !";
  } else {
    greeting_word = "Good Night !";
  }

  return (
    <>
      <View style={{ backgroundColor: "indigo", height: 45, flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
        {/* View 1 */}
        <View >
          <Text style={{ color: "white", fontSize: 18, padding: 10 }} > {greeting_word} </Text>
        </View>
      </View>
    </>
  );
}

export default GreetingScreen;