import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import Title from "./crud/main";
import { store } from "./crud/redux/store";

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Title />
         </Provider>
      );
   }
}

export default App;
