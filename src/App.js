import './firebase/firebase'
import React from 'react';

import {Layout} from 'antd'
import {Routes, Route} from 'react-router-dom'

import {AuthProvider} from './contexts/AuthContext'


import LoginView from './AuthComponents/LoginView';
import TopMenu from './TopMenu.jsx'
import MyCampaignsView from './Campaigns/MyCampaignsView';

import './App.css';
import 'antd/dist/antd.css';
import SignupView from './AuthComponents/Signup';
import ProtctedPath from './AuthComponents/ProtectedPath';

function App() {

  
  return (
    <AuthProvider>
      <Layout className="App">
        <Layout.Header>
          <TopMenu />
        </Layout.Header>
        <Layout.Content style={{minHeight: "93vh"}}>
          
          <Routes>
            
            <Route path="/login" element={<LoginView />} />  
            <Route path="/signup" element={<SignupView />} />          
            <Route path="/campaigns" element={
              <ProtctedPath>
                <MyCampaignsView />
              </ProtctedPath>  
            }/>
          
            <Route path="/" element={<div>This is the main Page</div>} />
          </Routes>
          
        </Layout.Content>
      </Layout>
    </AuthProvider>
  );
}

export default App;
