const api = require('studentbostader-api');
const utilities = require('../utilities').messaging;

function list(botpress, event) {
  api.fetchAccommodations()
  .then(accommodations => {
    // Only send accommodations if there are few available (to avoid spam)
    if (accommodations.length < 3)
      utilities.sendAccommodations(botpress, event.user.id, accommodations);
    else
      botpress.messenger.sendText(event.user.id, `Det finns ${accommodations.length} bostäder lediga. Se mer på hemsidan!`, {typing: true});
  })
  .catch(error => {
    console.error(error);
    botpress.messenger.sendText(event.user.id, 'Vi verkar inte kunna utföra listningen just nu. Försök igen senare.', {typing: true});
  });
}

module.exports = list;
