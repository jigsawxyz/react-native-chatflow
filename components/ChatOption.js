import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import Styles from "../styles/Styles";

export default class ChatOption extends Component {
	render() {
		return (
			<TouchableOpacity style={this.props.bubbleStyle} onPress={() => this.props.onSelectOption()}>
				<Text style={this.props.bubbleTextStyle}>{this.props.option.text}</Text>
			</TouchableOpacity>
		);
	}
}

const localStyles = StyleSheet.create({
});