import React, { Component, useState, useEffect, useCallback, useRef } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Picker,
  Dimensions
} from "react-native";
import Modal from "react-native-modalbox";
import { channelManager } from '../../Core/chat/firebase';
import AppStyles from '../../AppStyles';

import firebase from 'react-native-firebase';

const height = Dimensions.get("window");
const swipeArea = Math.floor(height * 0.1);

class TranslateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible || false,
      languageOptions: this.props.languageOptions || [],
      channelId: this.props.channelId || '',
      userId: this.props.userId || '',
      languageTo: 'En',
      languageFrom: 'En'
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalVisible !== prevProps.modalVisible) {
      this.setState({modalVisible: this.props.modalVisible});
    }
  }

  componentWillUnmount() {
    this.setState({modalVisible: false});
  }

    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    turnOffTranslate = () => {
      this.props.translateOff();
    }

    onSetLanguages = () => {
      var languageTo = this.state.languageTo;
      var languageFrom = this.state.languageFrom;
      this.props.onSelectLanguages(languageTo, languageFrom);
    };
  render() {
  return (
    <Modal
      style={styles.container}
      isOpen={this.state.modalVisible}
      position="center"
      swipeToClose
      swipeArea={swipeArea}
      swipeThreshold={4}
      coverScreen={true}
      backButtonClose={true}
      useNativeDriver={Platform.OS === "android" ? true : false}
      animationDuration={500}
      onClosed={this.props.translateOff}
    >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Translate From:</Text>
            <Picker
              selectedValue={this.state.languageFrom}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => this.setState({languageFrom: itemValue})}
            >
              {this.state.languageOptions.map((item, index) => {
                return (<Picker.Item label={item.text} value={item.value} key={index}/>)
              })}
            </Picker>
            <Text style={styles.modalText}>Translate To:</Text>
            <Picker
              selectedValue={this.state.languageTo}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => this.setState({languageFrom: itemValue})}
            >
              {this.state.languageOptions.map((item, index) => {
                return (<Picker.Item label={item.text} value={item.value} key={index}/>)
              })}
            </Picker>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#44339C" }}
              onPress={() => this.onSetLanguages()}
            >
              <Text style={styles.textStyle}>Translate</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.props.translateOff}
            >
              <Text style={{color: 'blue', fontSize: 12, marginTop: 10}}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
  );
}
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  container: {
    width: 200,
    height: 200,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default TranslateModal;
