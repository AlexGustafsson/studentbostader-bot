const api = require('studentbostader-api');

const {
  storeAccommodations,
  diffAccommodations
} = require('./database');

const {
  notifySubscribers
} = require('./messaging');

// When the crawler should start to update from server (to stop abuse)
const START_UPTIME = 8;
// WHen the crawler should end updating from server (to stop abuse)
const END_UPTIME = 18;

function startFetchingAccommodations(botpress) {
  // Only update during active hours
  const hour = new Date(Date.now).getHours();
  if (hour < START_UPTIME || hour > END_UPTIME)
    return;

  console.log('Starting fetching and broadcasting cycle');

  // Get current accommodations from server
  api.fetchAccommodations()
  .then(accommodations => {
    console.log('Retrieved accommodations');
    // Compare to already stored accommodations
    diffAccommodations(botpress, accommodations)
    .then(newAccommodations => {
      console.log(`Diffed accommodations and found ${newAccommodations.length} new ones (vs ${accommodations.length} in total)`);

      // No new accommodations, don't proceed
      if (newAccommodations.length === 0)
        return;

      notifySubscribers(botpress, newAccommodations);

      console.log('Storing accommodations');
      storeAccommodations(botpress, accommodations);
    });
  }).catch(error => {
    console.error('Error when automatically updating accommodations', error);
  });

  // Run every ten minutes
  setTimeout(startFetchingAccommodations.bind(this, botpress), 10 * 60 * 1000);
}

function startDaemon(botpress) {
  // Give a minute of grace time before starting to fetch accommodations
  setTimeout(() => {
    startFetchingAccommodations(botpress);
  }, 1 * 60 * 1000);
}

module.exports = {
  startDaemon
};
