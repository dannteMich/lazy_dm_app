import './firebase/firebase'
import React from 'react';

import {Layout} from 'antd'
import {Routes, Route} from 'react-router-dom'

import {AuthProvider} from './contexts/AuthContext'


import LoginView from './Login/LoginView';
// import SignupView from './Login/Signup';
import TopMenu from './TopMenu.jsx'

import './App.css';
import 'antd/dist/antd.css';
import SignupView from './Login/Signup';

function App() {

  
  return (
    <AuthProvider>
      <Layout className="App">
        <Layout.Header>
          <TopMenu />
        </Layout.Header>
        <Layout.Content>
          
          <Routes>
            
            <Route path="/login" element={<LoginView />} />  
            <Route path="/signup" element={<SignupView />} />          
          
          </Routes>
          
        </Layout.Content>
      </Layout>
    </AuthProvider>
  );
}

export default App;
