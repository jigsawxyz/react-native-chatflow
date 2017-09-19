import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	KeyboardAvoidingView
} from 'react-native';

export default class ChatInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: null
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.visible && !this.props.visible) {
			this.setState({
				text: null
			});
		}
	}

	onDone() {
		this.props.onDone(this.state.text);
	}

	onChangeText(value) {
		this.setState({
			text: value
		});
	}

	render() {
		if (!this.props.visible) {
			return null;
		}

		var textInputStyles = localStyles.textInput;
		
		if (this.props.textStyle) {
			textInputStyles.push(this.props.textStyle);
		}
		

		return (
			<View style={localStyles.container}>
				<TextInput 
					value={this.state.text}
					style={textInputStyles} 
					placeholder={this.props.placeholder}
					onFocus={this.props.onFocus}
					onChangeText={(value) => this.onChangeText(value)}
					returnKeyType="send"
					onSubmitEditing={() => this.onDone()}
					/>
			</View>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		backgroundColor: "#E4E4E4",
		padding: 20
	},
	textInput: {
		backgroundColor: "#ffffff",
		padding: 15,
		borderRadius: 5
	}
});