function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function usage(botpress, event) {
  const listStrings = [
    'Lista nuvarande bostäder',
    'Kan du lista nuvarande bostäder?',
    'Ge mig en lista av lediga boenden',
    'Lista bostäder'
  ];

  const usageStrings = [
    'Hur används tjänsten?',
    'Hur använder jag tjänsten?',
    'Förklara användningen'
  ];

  const infoStrings = [
    'Hur fungerar tjänsten?',
    'Hur fungerar det?',
    'Förklara för mig hur tjänsten fungerar'
  ];

  const usage = `Om du vill se aktuella listningar är det bara att fråga. Testa att skriva '${randomElement(listStrings)}'.
Du kan även fråga om användningen av tjänsten genom att exempelvis skriva '${randomElement(usageStrings)}'.
Vill du veta mer kan du testa att skriva '${randomElement(infoStrings)}'`;

  const usage2 = `Vill du bli meddelad när nya listningar sker, skriv då 'Start'.
Vill du avsluta prenumerationen så skickar du 'Stop'.`;

  botpress.messenger.sendText(event.user.id, usage, {typing: true})
  .then(() => {
    botpress.messenger.sendText(event.user.id, usage2, {typing: true});
  });
}

module.exports = usage;
