# Studentbostäder bot for Messenger
### A bot written to alert users when new student accommodations are available
***

### Setting up

##### Installing

___Prerequisites: NodeJS, NPM___

```
# Download the project and enter the directory
git clone https://github.com/AlexGustafsson/studentbostader-bot.git && cd studentbostader-bot
# Setup the project
npm install
# Start the bot engine
npm start
```

You can now navigate to `http://localhost:3000` and set up the service.

_The documentation will be heavily rewritten when the bot is stable and ready to use. Until then - stay tuned._

_For now, all messages are in Swedish. There may or may not be an English translation in the future._

##### Quickstart

```JavaScript
npm start
```

### Available actions

| action | description | regexp | example |
| ------ | ----------- | ------ | ------- |
| List accommodations | Sends three (or two) messages per available accommodation (less than three): a descriptive text message, an image (when available), a number to call and a direct link. | /lista&#124;just nu&#124;bostäder&#124;boende&#124;rum&#124;korridor&#124;lägenhet/i | Vilka bostäder är lediga just nu? |
| Present usage | Sends messages containing usage instructions and example messages | /använd/i | Hur använder jag tjänsten? |
| Present inner workings | Sends a message explaining how the service works | /fungera&#124;funka/i | Hur fungerar tjänsten? |
| Start subscribing | Sends a confirmation message and adds the user to the subscription list. The user is then notified of new listings | /start/i| Start |
| Stop subscribing | Sends a confirmation message and removes the user from the subscription list. | /stop/i | Stop |

### Contributing

Any contribution is welcome. If you're not able to code it yourself, perhaps someone else is - so post an issue if there's anything on your mind.

###### Development

Clone the repository:
```
git clone https://github.com/AlexGustafsson/studentbostader-bot.git && cd studentbostader-bot
```

Set up for development:
```
npm install
```

Follow the conventions enforced:
```
npm test
```

### Disclaimer

_Although the project is very capable, it is not built with production in mind. Therefore there might be complications when trying to use the bot for large-scale projects meant for the public. The bot was created to easily and automatically fetch available student accommodations and as such it might not promote best practices nor be performant. This project is not in any way affiliated with Studentbostäder. The project is purely educational and should only be used to learn about NodeJS, ES6 and bots. No responsibility can be held by the author for any misuse of the project._
