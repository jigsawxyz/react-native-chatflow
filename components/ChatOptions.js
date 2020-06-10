import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Animated
} from 'react-native';

import ChatOption from "./ChatOption";
import LinearGradient from "react-native-linear-gradient";

export default class ChatOptions extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			position: new Animated.Value(0)
		};

		this.getColorWithOpacity = this.getColorWithOpacity.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (!this.state.visible) {
			if (this.props.options && this.props.options.length > 0) {
				this.setState({
					visible: true
				}, () => {
					Animated.spring(this.state.position, {toValue: 1, useNativeDriver: false}).start();
				});
			}
		} else {
			if (!this.props.options || this.props.options.length == 0) {
				this.setState({
					visible: false
				}, () => {
					this.setState({
						position: new Animated.Value(0)
					})
				});
			}
		}
	}

	hexToRgba(hex, opacity) {
		hex = hex.replace('#','');
		r = parseInt(hex.substring(0,2), 16);
		g = parseInt(hex.substring(2,4), 16);
		b = parseInt(hex.substring(4,6), 16);
		return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
	}

	getColorWithOpacity(color, opacity) {
		if (color.indexOf("#") >= 0) {
			// This is a hex color, convert it
			return this.hexToRgba(color, opacity);
		} else {
			// TODO, not yet supported, needs to be a hex for now
			console.error("Right now, background colors must be in hex format");
			return "#ffffff";
		}
	}

	render() {
		if (!this.state.visible) {
			return null;
		}

		var containerStyles = [localStyles.container];

		containerStyles.push({
			transform: [{translateY: this.state.position.interpolate({
				inputRange: [0, 1],
				outputRange: [200, 0]
			})}]
		});

		var gradientFrom = this.getColorWithOpacity(this.props.backgroundColor, 0);
		var gradientTo = this.getColorWithOpacity(this.props.backgroundColor, 1);

		if (!this.props.options) {
			return null;
		}

		return (
			<Animated.View style={containerStyles} onLayout={(evt) => this.props.onChangeSize(evt.nativeEvent.layout)}>
				<LinearGradient colors={[gradientFrom, gradientTo]} style={localStyles.innerContainer}>
					{this.props.options.map((option) => {
						return (
							<ChatOption 
								key={option.value} 
								option={option} 
								onSelectOption={() => this.props.onSelectOption(option)}
								bubbleStyle={this.props.bubbleStyle}
								bubbleTextStyle={this.props.bubbleTextStyle}/>
						)
					})}
				</LinearGradient>
			</Animated.View>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		flex: 1,
		flexWrap: "wrap",
		justifyContent: "center"
	},
	innerContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		flex: 1,
		justifyContent: "center",
		padding: 20,
		paddingBottom: 30
	}
});