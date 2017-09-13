import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView
} from 'react-native';

import Chat from "./Chat";
import ChatInput from "./ChatInput";
import ChatOptions from "./ChatOptions";


import update from "react-addons-update";

const CHAT_PUSH_DELAY = 1000;
const SCROLL_DELAY = 100;
const BORDER_RADIUS = 20;
const DEFAULT_USER_BUBBLE_COLOUR = "#3E92F1";

const BUBBLE_STYLES = {
	bubble: {
		backgroundColor: "#ffffff",
		borderRadius: BORDER_RADIUS,
		borderBottomLeftRadius: 0,
		marginBottom: 20,
		padding: 20
	},
	bubbleUser: {
		backgroundColor: DEFAULT_USER_BUBBLE_COLOUR,
		borderBottomLeftRadius: BORDER_RADIUS,
		borderBottomRightRadius: 0
	},
	bubbleText: {
		color: "#000000",
		fontWeight: "300",
		fontSize: 17
	},
	bubbleTextUser: {
		color: "#ffffff",
		fontWeight: "300"
	},
	optionBubble: {
		backgroundColor: DEFAULT_USER_BUBBLE_COLOUR,
		padding: 15,
		borderRadius: 20,
		margin: 5,
	},
	optionBubbleText: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "500"
	}
}

export default class ChatHolder extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			pendingChats: [],
			chats: [],
			lastChat: null,
			userPreferences: {}
		};

		this.startChatTimer = this.startChatTimer.bind(this);
		this.pushNextChat = this.pushNextChat.bind(this);
		this.pushChats = this.pushChats.bind(this);
		this.scrollToEnd = this.scrollToEnd.bind(this);
		this.notifyOfChanges = this.notifyOfChanges.bind(this);
		this.getBackgroundColor = this.getBackgroundColor.bind(this);
	}

	componentDidMount() {
		this.getNextChatsFromScript();
	}

	getBackgroundColor() {
		if (this.props.backgroundColor) {
			return this.props.backgroundColor;
		} else {
			return "#ffffff";
		}
	}

	getBubbleStyles(user) {
		var bubbleStyles = [BUBBLE_STYLES.bubble];

		if (user) {
			bubbleStyles.push(BUBBLE_STYLES.bubbleUser);
			
			if (this.props.userBubbleStyle) {
				bubbleStyles.push(this.props.userBubbleStyle);
			}
		} else {
			if (this.props.botBubbleStyle) {
				bubbleStyles.push(this.props.botBubbleStyle);
			}
		}

		return bubbleStyles;
	}

	getBubbleTextStyles(user) {
		var bubbleTextStyles = [BUBBLE_STYLES.bubbleText];

		if (user) {
			bubbleTextStyles.push(BUBBLE_STYLES.bubbleTextUser);
			
			if (this.props.userBubbleTextStyle) {
				bubbleTextStyles.push(this.props.userBubbleTextStyle);
			}
		} else {
			if (this.props.botBubbleTextStyle) {
				bubbleTextStyles.push(this.props.botBubbleTextStyle);
			}
		}

		return bubbleTextStyles;
	}

	getBubbleOptionStyle() {
		var styles = [BUBBLE_STYLES.optionBubble];

		if (this.props.bubbleOptionStyle) {
			styles.push(this.props.bubbleOptionStyle);
		}

		return styles;
	}

	getBubbleOptionTextStyle() {
		var styles = [BUBBLE_STYLES.optionBubbleText];
		
		if (this.props.bubbleOptionTextStyle) {
			styles.push(this.props.bubbleOptionTextStyle);
		}

		return styles;
	}

	getNextChatsFromScript() {
		if (this.state.lastChat) {
			var scriptItem = this.state.lastChat;
			var chatsToPush = [];

			while (scriptItem.next && !scriptItem.input && !scriptItem.options) {
				var key = scriptItem.next;
				scriptItem = this.props.chatScript[key];

				chatsToPush.push(JSON.parse(JSON.stringify(scriptItem)));
				chatsToPush[chatsToPush.length - 1].id = key + "_" + new Date().getTime();
			}

			this.pushChats(chatsToPush);

		} else {
			// No last chat, go from start to any stop points
			var chatsToPush = [];
			var scriptItem = this.props.chatScript[this.props.chatScript._start];
			chatsToPush.push(scriptItem);
			chatsToPush[chatsToPush.length - 1].id = this.props.chatScript._start + new Date().getTime();

			while (scriptItem.next && !scriptItem.input && !scriptItem.options) {
				var key = scriptItem.next;
				scriptItem = this.props.chatScript[key];

				chatsToPush.push(JSON.parse(JSON.stringify(scriptItem)));
				chatsToPush[chatsToPush.length - 1].id = key + "_" + new Date().getTime();
			}

			this.pushChats(chatsToPush);
		}
	}

	notifyOfChanges() {
		if (this.props.onChangeAnswers) {
			this.props.onChangeAnswers(this.state.userPreferences);
		}
	}

	scrollToEnd() {
		setTimeout(() => {
			this.refs.scroller.scrollToEnd({animated: true});
		}, SCROLL_DELAY);
	}

	pushNextChat() {
		this._chatPushTimer = null;

		if (this.state.pendingChats.length > 0) {
			var chatToPush = this.state.pendingChats[0];

			var updatedPending = update(this.state.pendingChats, {$apply: (pending) => {
				pending.splice(0, 1);
				return pending;
			}});

			var updatedChats = update(this.state.chats, {$apply: (chats) => {
				chats.push(chatToPush);
				return chats;
			}});

			this.setState({
				pendingChats: updatedPending,
				chats: updatedChats,
				lastChat: updatedChats[updatedChats.length - 1]
			}, () => {
				this.scrollToEnd();

				if (this.state.pendingChats.length > 0) {
					this.startChatTimer();					
				}
			});

		} else {
			this._chatPushTimer = null;
		}
	}

	startChatTimer() {
		if (!this._chatPushTimer) {
			this._chatPushTimer = setTimeout(this.pushNextChat, CHAT_PUSH_DELAY);
		}
	}

	pushChats(chats) {
		var updatedPending = update(this.state.pendingChats, {$apply: (pending) => {
			pending = pending.concat(chats);
			return pending;
		}});

		this.setState({
			pendingChats: updatedPending
		});

		this.startChatTimer();
	}

	onChatInputFocus() {
		this.scrollToEnd();
	}

	onSelectOption(option) {
		var next = this.state.lastChat.next;

		if (option.next) {
			next = option.next;
		}

		var userPreferences = update(this.state.userPreferences, {$apply: (userPreferences) => {
			if (this.state.lastChat.field) {
				userPreferences[this.state.lastChat.field] = option.value;	
			}
			return userPreferences;
		}});
		

		var updatedChats = update(this.state.chats, {$apply: (chats) => {
			chats.push({
				id: new Date().getTime(),
				text: option.text,
				from_user: true,
				option: option,
				field: this.state.lastChat.field,
				next: next
			});

			return chats;
		}});

		this.setState({
			chats: updatedChats,
			userPreferences: userPreferences,
			lastChat: updatedChats[updatedChats.length - 1]
		}, () => {
			this.notifyOfChanges();
			this.getNextChatsFromScript();
		});
	}

	onUserResponse(value) {
		var updatedChats = update(this.state.chats, {$apply: (chats) => {
			chats.push({
				id: new Date().getTime(),
				text: value,
				from_user: true,
				field: this.state.lastChat.field,
				next: this.state.lastChat.next
			});

			return chats;
		}});

		this.setState({
			chats: updatedChats,
			lastChat: updatedChats[updatedChats.length - 1]
		}, () => this.getNextChatsFromScript());
	}

	onScrollContentSizeChange(evt) {
		
	}	

	render() {
		if (!this.state.chats || this.state.chats.length == 0) {
			return null;
		}

		return (
			<KeyboardAvoidingView behavior="padding" style={[localStyles.outerContainer, {backgroundColor: this.props.backgroundColor}]}>
				<ScrollView ref="scroller" showsVerticalScrollIndicator={false} style={localStyles.container} contentInset={{top: 10, left: 0, right: 0, bottom: 200}}>
					<View onLayout={(evt) => this.onScrollContentSizeChange(evt)}>
					{this.state.chats.map((chat) => {
						if (chat.component) {
							return this.props.onRenderComponent(chat.component, chat, this.state.userPreferences);
						} else {
							return (
								<Chat 
									key={chat.id} 
									chat={chat}
									images={this.props.images}
									botBubbleStyle={this.getBubbleStyles(false)}
									botBubbleTextStyle={this.getBubbleTextStyles(false)}
									userBubbleStyle={this.getBubbleStyles(true)}
									userBubbleTextStyle={this.getBubbleTextStyles(true)}/>
							);
						}
						
					})}
					</View>
				</ScrollView>
				<ChatInput 
					visible={this.state.lastChat.input}
					placeholder={this.state.lastChat.placeholder}
					onFocus={() => this.onChatInputFocus()}
					onDone={(value) => this.onUserResponse(value)}/>
				<ChatOptions
					backgroundColor={this.getBackgroundColor()}
					visible={this.state.lastChat.options}
					options={this.state.lastChat.options}
					bubbleStyle={this.getBubbleOptionStyle()}
					bubbleTextStyle={this.getBubbleOptionTextStyle()}
					onSelectOption={(option) => this.onSelectOption(option)}/>
			</KeyboardAvoidingView>
		)
	}
}

const localStyles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		paddingTop: 20
	},
	outerContainer: {
		flex: 1,
		backgroundColor: "#ffffff"
	}
});