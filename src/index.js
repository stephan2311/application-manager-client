import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from './theme'
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from './context/auth.context';


ReactDOM.render(
  <ChakraProvider>
    <Router>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </Router>
  </ChakraProvider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
