import './firebase/firebase'
import React from 'react';

import {Layout, ConfigProvider} from 'antd'
import {Routes, Route} from 'react-router-dom'

import {AuthProvider} from './contexts/AuthContext'


import LoginView from './AuthComponents/LoginView';
import TopMenu from './TopMenu.jsx'
import MyCampaignsView from './Campaigns/MyCampaignsView';

import 'antd/dist/antd.css';
import SignupView from './AuthComponents/Signup';
import ProtctedPath from './AuthComponents/ProtectedPath'
import SingleCampaignEditor from './Campaigns/SingleCampaignEditor';
import SingleSessionEditor from './Sessions/SingleSessionEditor';

function App() {

  
  return (
    <AuthProvider>
      <Layout className="App">
        <Layout.Header>
          <TopMenu />
        </Layout.Header>
        <Layout.Content style={{minHeight: "93vh"}}>
          <ConfigProvider direction="rtl">
            <Routes>
              
              <Route path="/login" element={<LoginView />} />  
              <Route path="/signup" element={<SignupView />} />          
              <Route exact path="/campaigns" element={
                <ProtctedPath>
                  <MyCampaignsView />
                </ProtctedPath>  
              }/>
              <Route exact path="/campaigns/:campaignId" element={
                <ProtctedPath>
                  <SingleCampaignEditor />
              </ProtctedPath>  
              }/>
              <Route exact path="/campaigns/:campaignId/sessions/:sessionId/*" element={
                <ProtctedPath>
                  <SingleSessionEditor />
              </ProtctedPath>  
              }/>
            
              <Route path="/" element={<div>This is the main Page</div>} />
            </Routes>
          </ConfigProvider>
          
        </Layout.Content>
      </Layout>
    </AuthProvider>
  );
}

export default App;
