import React, { Component } from 'react';
import {
	StyleSheet,
	SafeAreaView,
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

	componentDidUpdate(prevProps) {
		if (this.props.visible && !prevProps.visible) {
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

	getBackgroundColorStyle() {
		if (!this.props.backgroundColor) {
			return {
				backgroundColor: "#E4E4E4"
			};
		} 

		return {
			backgroundColor: this.props.backgroundColor
		}
		
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
			<SafeAreaView style={this.getBackgroundColorStyle()}>
				<View style={[localStyles.container, this.getBackgroundColorStyle()]}>
					<TextInput 
						value={this.state.text}
						style={textInputStyles} 
						placeholder={this.props.placeholder}
						keyboardType={this.props.keyboardType}
						onFocus={this.props.onFocus}
						onChangeText={(value) => this.onChangeText(value)}
						returnKeyType="send"
						onSubmitEditing={() => this.onDone()}
						/>
				</View>
			</SafeAreaView>
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