# ReactNative Chat Flow
ReactNative component that helps you to quickly and easily build interactive chat applications.

## Installation
```javascript
npm install --save react-native-chatflow
```

Note: this package requires react-native-linear-gradient. It is part of the dependencies of the package so will be automatically installed, but note that you will need to run the following command to link it as it is a native module:

```javascript
react-native link react-native-linear-gradient
``` 

## Basic Usage
It's really easy to get started. Put the following code in one of your components...

```javascript

import ChatFlow from "react-native-chatflow";
import chatScript from "./chatScript.json";

<ChatFlow 
    chatScript={chatScript}
    backgroundColor={Styles.colours.lightBackground}
```

Then you need to include a chat script (in the example above, chatScript.json), which defines what the chat flow will be. An example is shown below:

```
{
    "_start": "hello",
    "hello": {
        "text": "Hello I'm an example bot 👋🏼",
        "next": "getName"
    },
    "getName": {
        "text": "First up, what's your name?",
        "input": "text",
        "placeholder": "Enter your name",
        "field": "name",
        "next": "favouriteEmoji"
    },
    "favouriteEmoji": {
        "text": "What food do you want?",
        "field": "food",
        "options": [
            {"value": "small", "text": "🥕"},
            {"value": "medium", "text": "🍕"},
            {"value": "big", "text": "🐔"}
        ]
    }
}
```

## Properties/Options
Name | Description
---------------- | -------------------------------
chatScript | The chat script JSON object
images | Map of static images to use in chats
backgroundColor | Background color of the chat holder
userBubbleStyle | Object with styles for the user bubble
userBubbleTextStyle | Object with styles for the user bubble text
botBubbleTextStyle | Object with styles for the bot bubble
bubbleOptionStyle | Object with styles for the option bubble
bubbleOptionTextStyle | Object with styles for the option bubble text (the options shown at the bottom of the screen)
textInputStyle | Text styles for the text input box
hidden | If set to true, the chat component will be hidden
onRenderComponent | Method that renders custom components (see below)
onChangeAnswers | Event fired when the user answers a question or clicks an option
onChatHistoryChange | Event fired when the chat history changes (i.e. when the user or bot speaks)
getChatHistory | Method that returns the chat history  

## Loading existing chat history
If you need to load chat history, create a ref on your component and then call chatFlow.loadChatHistory(chats)