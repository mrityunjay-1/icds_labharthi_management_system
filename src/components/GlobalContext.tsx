import React, { createContext, useReducer, useState } from 'react';
import * as sqlite from 'expo-sqlite';

const ContextData = createContext({});

const ContextProviderFunction = ({ children }: any) => {

  // this db_object is propagated through my entire application's Components
  let db_object = sqlite.openDatabase("labharthi");
  // creating a table if it is not existed
  db_object.transaction((tx) => {
    tx.executeSql("CREATE TABLE record (name varchar(50), parent_name varchar(50), aadhaar varchar(50), contact varchar(50), PRIMARY KEY(aadhaar))");
  });

  return (
    <ContextData.Provider value={{ db_object }}>
      {children}
    </ContextData.Provider>
  );
};

export default ContextData;
export { ContextProviderFunction };