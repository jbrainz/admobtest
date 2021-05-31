/* eslint-disable react-native/no-inline-styles */
//import libraries
import React, {Component} from 'react';
import {Dimensions, Modal, Share} from 'react-native';
import {
  Container,
  Header,
  Content,
  Body,
  Left,
  Icon,
  Right,
  Title,
  Button,
} from 'native-base';
import {InterstitialAd, AdEventType} from '@react-native-firebase/admob';
import WebView from 'react-native-webview';

const webViewHeight = Dimensions.get('window').height - 56;

// create a component
class ModalComponent extends Component {
  constructor(props) {
    super(props);
  }

  handleClose = () => {
    return this.props.onClose();
  };

  handleShare = () => {
    const {url, title} = this.props.articleData;
    let message = `${title}\n\nRead More @${url}\n\nShared via RN News App`;
    return Share.share(
      {title, message, url: message},
      {dialogTitle: `Share ${title}`},
    );
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
  }

  render() {
    const {showModal, articleData} = this.props;
    const {url} = articleData;
    if (url != undefined) {
      return (
        <Modal
          animationType="slide"
          transparent
          visible={showModal}
          onRequestClose={this.handleClose}>
          <Container
            style={{margin: 15, marginBottom: 0, backgroundColor: '#fff'}}>
            <Header style={{backgroundColor: '#009387'}}>
              <Left>
                <Button onPress={this.handleClose} transparent>
                  <Icon name="close" style={{color: 'white', fontSize: 12}} />
                </Button>
              </Left>
              <Body>
                <Title children={articleData.title} style={{color: 'white'}} />
              </Body>
              <Right>
                <Button onPress={this.handleShare} transparent>
                  <Icon name="share" style={{color: 'white', fontSize: 12}} />
                </Button>
              </Right>
            </Header>
            <Content contentContainerStyle={{height: webViewHeight}}>
              <WebView
                source={{uri: url}}
                style={{flex: 1}}
                onError={this.handleClose}
                startInLoadingState
                scalesPageToFit
              />
            </Content>
          </Container>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

//make this component available to the app
export default ModalComponent;
