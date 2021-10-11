import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Friends from './components/Friends/Friends';
import Colleagues from './components/Colleagues/Colleagues';
import './App.css';

function App() {

  const mysql_client = new ApolloClient({
    uri: 'http://localhost:250/graphql',
    cache: new InMemoryCache()
  });

  const mongo_client = new ApolloClient({
    uri: 'http://localhost:250/graphql_0',
    cache: new InMemoryCache()
  });

  return (
    <React.Fragment> 
      <h1>Friends and Colleagues</h1> 
      <div className="Contain">
        <ApolloProvider client={mysql_client}>
          <Friends />
        </ApolloProvider>
        <ApolloProvider client={mongo_client}>
          <Colleagues />
        </ApolloProvider>
      </div>
    </React.Fragment>
  );
}

export default App;
