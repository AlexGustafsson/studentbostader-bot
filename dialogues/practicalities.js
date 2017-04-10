function practicalities(botpress, event) {
  const info = `Tjänsten fungerar genom att tolka och kontrollera aktuella bostäder hos Studentbostäder.se.
Har du har valt att bli meddelad vid nya listningar så skickas ett meddelande till dig så fort som möjligt.`;

  botpress.messenger.sendText(event.user.id, info, {typing: true});
}

module.exports = practicalities;
