const api = require('studentbostader-api');
const utilities = require('../utilities').messaging;

function list(botpress, event) {
  api.fetchAccommodations()
  .then(accommodations => {
    utilities.sendAccommodations(botpress, event.user.id, accommodations);
  })
  .catch(error => {
    console.error(error);
    botpress.messenger.sendText(event.user.id, 'Vi verkar inte kunna utföra listningen just nu. Försök igen senare.', {typing: true});
  });
}

module.exports = list;
