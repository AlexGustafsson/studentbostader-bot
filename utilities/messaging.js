const PHONE_NUMBER = '013208660';

function formatAccommodation(accommodation) {
  const accommodationText = `${accommodation.availableDirectly ? 'BOSTAD DIREKT\n' : ''}${accommodation.type} på ${accommodation.area} kvadratmeter för uthyrning.
Hyran ligger på ${accommodation.rent} ${accommodation.rentUnit} och objektet är tillgängligt från och med ${accommodation.available}.
Addressen, ${accommodation.address}, ligger i området ${accommodation.location}.
Bostaden kräver ${accommodation.points} poäng.`;

  return accommodationText;
}

function sendAccommodations(botpress, id, accommodations) {
  const messageFunctions = [];

  // Send informational message
  function sendInfo(id, accommodation) {
    const accommodationText = formatAccommodation(accommodation);

    return botpress.messenger.sendText(id, accommodationText, {typing: true, waitDelivery: true});
  }

  // Send image if one exists
  function sendImage(id, accommodation) {
    // Something is wrong with the Messenger API
    // An error, 400, is thrown when an image is sent saying
    // that "the image is of an invalid format" - which it is not
    // So for now, don't send images.
    return Promise.resolve();

    if (!accommodation.image || accommodation.image === '')
      return Promise.resolve();

    console.log('Sending image', accommodation.image);

    const type = 'image';
    return botpress.messenger.sendAttachment(id, type, accommodation.image, {typing: true, waitDelivery: true});
  }

  // Send direct url and phone number
  function sendContactInfo(id, accommodation) {
    return botpress.messenger.sendText(id, `För mer information: ${accommodation.url}. Telefonnummer: ${PHONE_NUMBER}`, {typing: true, waitDelivery: true});
  }

  for (const accommodation of accommodations) {
    // Send everything in serial
    messageFunctions.push(() => {
      return sendInfo(id, accommodation)
      .then(() => sendImage(id, accommodation))
      .then(() => sendContactInfo(id, accommodation));
    });
  }

  // Execute promises in serial
  return messageFunctions.reduce((p, sendMessage) => {
    return p.then(() => {
      return sendMessage();
    });
  }, Promise.resolve());
}

function sendDirectlyAvailable(botpress, id, accommodations) {
  sendAccommodations(botpress, id, accommodations.filter(x => x.availableDirectly));
}

function notifySubscribers(botpress, accommodations) {
  botpress.db.kvs.get('subscriptions')
  .then(subscriptions => {
    const ids = Object.keys(subscriptions);
    for (const id of ids) {
      if (subscriptions[id]) {
        console.log('Sending new accommodations to an active subscriber');

        botpress.messenger.sendText(id, 'Nya boenden väntar!', {typing: true})
        .then(sendDirectlyAvailable.bind(null, botpress, id, accommodations))
        .catch(error => {
          console.error('Critical - could not send message broadcast!', error);
        });
      }
    }
  }).catch(error => {
    console.error('Critical - could not send message broadcast!', error);
  });
}

function broadcast(botpress, message) {
  return botpress.db.kvs.get('subscriptions')
  .then(subscriptions => {
    if (!subscriptions)
      return;
    const ids = Object.keys(subscriptions);
    const activeIds = ids.filter(x => subscriptions[x]);
    const promises = activeIds.map(id => {
      return botpress.messenger.sendText(id, message, {typing: true});
    });
    return Promise.all(promises);
  });
}

module.exports = {
  formatAccommodation,
  sendAccommodations,
  notifySubscribers,
  broadcast
};
