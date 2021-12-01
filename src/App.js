import './firebase/firebase'

import React from 'react';
import {Layout} from 'antd'

import {AuthProvider} from './contexts/AuthContext'


import LoginView from './Login/LoginView';
// import SignupView from './Login/Signup';
import TopMenu from './TopMenu.jsx'

import './App.css';
import 'antd/dist/antd.css';

function App() {

  
  return (
    <AuthProvider>
      <Layout className="App">
        <Layout.Header>
          <TopMenu />
        </Layout.Header>
        <Layout.Content>
          <div>
            <LoginView /> 
          </div>
          
        </Layout.Content>
      </Layout>
    </AuthProvider>
  );
}

export default App;
