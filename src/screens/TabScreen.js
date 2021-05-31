/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Tab,
  Tabs,
} from 'native-base';
import Tab1 from './tabs/tab1';
import Tab2 from './tabs/tab2';
import Tab3 from './tabs/tab3';

import firebase from '@react-native-firebase/app';
import {BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';

const credentials = {
  clientId:
    '475897723407-016fl2isblrjk583rb4vfhgpf01q4u2v.apps.googleusercontent.com',
  appId: '1:740486258778:android:7415bd6d8cab4678eff863',
  apiKey: 'AIzaSyCc0rafL712--ND0PHmE_NG3KLttjBlf9s',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: '',
  projectId: 'newsapp-396e5',
};

const config = {name: 'com.newsapp'};

const TabsScreen = () => {
  useEffect(() => {
    firebase.initializeApp(credentials, config);
  }, []);

  return (
    <Container>
      <Header style={{backgroundColor: '#009387'}} hasTabs>
        <BannerAd
          unitId="ca-app-pub-7055652875741833/3787590552"
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
          onAdFailedToLoad={error => {
            console.error('Advert failed to load: ', error);
          }}
        />
      </Header>
      <Tabs tabBarUnderlineStyle={{backgroundColor: 'white'}}>
        <Tab
          tabStyle={{backgroundColor: '#009387'}}
          activeTabStyle={{backgroundColor: '#009387'}}
          textStyle={{color: 'white'}}
          activeTextStyle={{color: 'white'}}
          heading="General">
          <Tab1 />
        </Tab>
        <Tab
          tabStyle={{backgroundColor: '#009387'}}
          activeTabStyle={{backgroundColor: '#009387'}}
          textStyle={{color: 'white'}}
          activeTextStyle={{color: 'white'}}
          heading="Business">
          <Tab2 />
        </Tab>
        <Tab
          tabStyle={{backgroundColor: '#009387'}}
          activeTabStyle={{backgroundColor: '#009387'}}
          textStyle={{color: 'white'}}
          activeTextStyle={{color: 'white'}}
          heading="Technology">
          <Tab3 />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TabsScreen;
