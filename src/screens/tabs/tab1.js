/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {InterstitialAd, AdEventType} from '@react-native-firebase/admob';
import {Alert, View, ActivityIndicator, FlatList} from 'react-native';
import {Container, Content, Text} from 'native-base';

import DataItem from '../../component/dataItem';
import Modal from '../../component/modal';

import {getArticles} from '../../service/news';

export default class ListThumbnailExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
      setModalVisible: false,
      modalArticleData: {},
    };
  }

  handleItemDataOnPress = articleData => {
    this.setState({
      setModalVisible: true,
      modalArticleData: articleData,
    });
  };

  handleModalClose = () => {
    this.setState({
      setModalVisible: false,
      modalArticleData: {},
    });
  };

  showInterstitialAd = () => {
    // Create a new instance
    const interstitialAd = InterstitialAd.createForAdRequest(
      'ca-app-pub-7055652875741833/9246487710',
    );
    // Add event handlers
    interstitialAd.onAdEvent((type, error) => {
      if (type === AdEventType.LOADED) {
        interstitialAd.show();
      }
    });
    // Load a new advert
    interstitialAd.load();
  };
  componentDidMount() {
    this.showInterstitialAd();
    getArticles().then(
      data => {
        this.setState({
          isLoading: false,
          data: data,
        });
      },
      error => {
        Alert.alert('Error', 'Something went wrong!');
      },
    );
  }
  render() {
    let view = this.state.isLoading ? (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
        <Text style={{marginTop: 10}} children="Please Wait.." />
      </View>
    ) : (
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <DataItem
              onPress={this.handleItemDataOnPress}
              key={item.id}
              data={item}
            />
          );
        }}
      />
    );

    return (
      <Container>
        <Content>{view}</Content>
        <Modal
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.handleModalClose}
        />
      </Container>
    );
  }
}
