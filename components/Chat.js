import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Animated,
	Image
} from 'react-native';

export default class Chat extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showing: new Animated.Value(0)
		};
	}

	componentDidMount() {
		Animated.spring(this.state.showing, {toValue: 1, useNativeDriver: false}).start();
	}

	getImageSource(image) {
		if (image.id) {
			return this.props.images[image.id];
		} else {
			return {uri: image};
		}
	}

	render() {
		var outerContainerStyles = [localStyles.outerContainer];
		var containerStyles = [this.props.botBubbleStyle];
		var textStyles = [this.props.botBubbleTextStyle];

		if (this.props.chat.from_user) {
			outerContainerStyles.push(localStyles.outerContainerUser);
			containerStyles = containerStyles.concat(this.props.userBubbleStyle);			
			textStyles = textStyles.concat(this.props.userBubbleTextStyle);
		}

		outerContainerStyles.push({
			transform: [{
				scale: this.state.showing.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1]
				})
			}]
		})

		var content = null;

		if (this.props.chat.image) {
			content = (
				<View style={containerStyles}>
					<Image 
						source={this.getImageSource(this.props.chat.image)} 
						style={localStyles.image}
						resizeMode="contain"
						/>
				</View>
			);
		} else {
			var actualContent = null;

			if (this.props.chat.text) {
				actualContent = (
					<Text style={textStyles}>{this.props.chat.text}</Text>
				);
			} else if (this.props.chat.component) {
				actualContent = this.props.onRenderComponent(this.props.chat.component, this.props.chat, this.props.userPreferences);
			}

			content = (
				<View style={containerStyles}>
					{actualContent}
				</View>
			);
		}
		

		return (
			<Animated.View style={outerContainerStyles}>
				{content}
			</Animated.View>
		)
	}
}

const localStyles = StyleSheet.create({
	outerContainer: {
		marginLeft: 20,
		marginRight: 40,
		flexDirection: "row",
		justifyContent: "flex-start"
	},
	image: {
		width: 200,
		height: 200
	},
	outerContainerUser: {
		marginRight: 20,
		marginLeft: 40,
		justifyContent: "flex-end"
	}
});