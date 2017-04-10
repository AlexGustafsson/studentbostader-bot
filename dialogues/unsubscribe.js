function unsubscribe(botpress, event) {
  const firstName = event.user.first_name;

  // TODO: remove the value instead of using false
  botpress.db.kvs.set('subscriptions', false, event.user.id)
  .then(() => {
    botpress.messenger.sendText(event.user.id, `Vi hoppas du har hittat din bostad nu, ${firstName}. Hör gärna av dig igen!`);
  })
  .catch(error => {
    console.error(error);
    botpress.messenger.sendText(event.user.id, `Hej, ${firstName}! Tyvärr kunde vi inte ta bort prenumerationen. Försök igen om en stund.`, {typing: true});
  });
}

module.exports = unsubscribe;
