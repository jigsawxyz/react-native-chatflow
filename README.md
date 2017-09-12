# ReactNative Chat Flow
ReactNative component that helps you to quickly and easily build interactive chat applications.

## Installation
```javascript
npm install --save react-native-chatflow
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
onRenderComponent | Method that renders custom components (see below)
onChangeAnswers | Event fired when the user answers a question or clicks an option