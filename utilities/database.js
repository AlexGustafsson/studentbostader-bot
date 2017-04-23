const {
  broadcast
} = require('./messaging');

function storeAccommodations(botpress, accommodations) {
  return botpress.db.kvs.set('accommodations', accommodations);
}

function diffAccommodations(botpress, accommodations) {
  return botpress.db.kvs.get('accommodations')
  .then(oldAccommodations => {
    const newAccommodations = accommodations.filter(accommodation => {
      return oldAccommodations.filter(oldAccommodation => oldAccommodation.id === accommodation.id).length === 0;
    });

    return newAccommodations;
  });
}

function setupDatabase(botpress) {
  // Prepare the subscribers object in the key value store
  // Alert subscribed users that the service is running
  botpress.db.kvs.get('subscriptions')
  .then(subscriptions => {
    if (!subscriptions)
      botpress.db.kvs.set('subscriptions', {});

    broadcast(botpress, 'Nu är tjänsten uppe igen!');
  });

  // Prepare the accommodations object in the key value store
  botpress.db.kvs.get('accommodations')
  .then(accommodations => {
    if (!accommodations)
      botpress.db.kvs.set('accommodations', []);
  });
  botpress.db.kvs.set('accommodations', []);
}

module.exports = {
  storeAccommodations,
  diffAccommodations,
  setupDatabase
};
