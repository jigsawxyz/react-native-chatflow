import React, { Component } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	Text,
	View,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity
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

	getButtonStyles() {
		var style = [this.props.userBubbleStyle];
		style.push(localStyles.button)
		return style;
	}

	render() {
		if (!this.props.visible) {
			return null;
		}

		var textInputStyles = [localStyles.textInput];
		
		if (this.props.textStyle) {
			textInputStyles.push(this.props.textStyle);
		}
		
		return (
			<SafeAreaView style={this.getBackgroundColorStyle()}>
				<View style={[localStyles.container, this.getBackgroundColorStyle()]}>
					<View style={localStyles.inputContainer}>
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
						<TouchableOpacity activeOpacity={0.7} style={this.getButtonStyles()} onPress={() => this.onDone()}>
							<Text style={[this.props.userBubbleTextStyle, {fontSize: this.props.textStyle.fontSize, fontFamily: this.props.textStyle.fontFamily, fontWeight: this.props.textStyle.fontWeight}]}>Go</Text>
						</TouchableOpacity>
					</View>
					
				</View>
			</SafeAreaView>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		backgroundColor: "#E4E4E4",
		padding: 20,
		flexDirection: "row"
	},
	inputContainer: {
		overflow: "hidden",
		flexDirection: "row",
		backgroundColor: "#ffffff",
		flex: 1,
		height: 50,
		borderRadius: 10
	},
	textInput: {
		padding: 15,
		flex: 1,
	},
	buttonText: {
		fontWeight: "700"
	},	
	button: {
		marginLeft: 0,
		padding: 10,
		height: 50,
		width: 50,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
		alignItems: "center",
		justifyContent: "center"
	}
});