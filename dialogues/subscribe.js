function subscribe(botpress, event) {
  const firstName = event.user.first_name;

  botpress.db.kvs.set('subscriptions', true, event.user.id)
  .then(() => {
    botpress.messenger.sendText(event.user.id, `Hej, ${firstName}! Nu kommer du bli meddelad om nya bostäder dyker upp.`, {typing: true});
  })
  .catch(error => {
    console.error(error);
    botpress.messenger.sendText(event.user.id, `Hej, ${firstName}! Tyvärr kunde vi inte lägga till prenumerationen. Försök igen om en stund.`, {typing: true});
  });
}

module.exports = subscribe;
