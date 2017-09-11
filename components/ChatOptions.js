import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Animated
} from 'react-native';

import ChatOption from "./ChatOption";

export default class ChatOptions extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			position: new Animated.Value(0)
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.visible) {
			if (nextProps.options && nextProps.options.length > 0) {
				this.setState({
					visible: true
				}, () => {
					Animated.spring(this.state.position, {toValue: 1}).start();
				});
			}
		} else {
			if (!nextProps.options || nextProps.options.length == 0) {
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

		return (
			<Animated.View style={containerStyles}>
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
		flexWrap: "wrap",
		justifyContent: "center",
		padding: 20
	}
});