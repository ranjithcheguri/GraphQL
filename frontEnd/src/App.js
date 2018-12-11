import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';

/* REDUX STORE */
import { Provider } from 'react-redux';
import store from './store';
/* REDUX STORE */

/* GRAPHQL */
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: `http://localhost:3002/graphql`
})
/* GRAPHQL */


class App extends Component {
  constructor(props) {
    super(props);
    console.log("Inside App");
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Menu />
            </div>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}
export default App;
