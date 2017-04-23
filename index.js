const {
  subscribe,
  unsubscribe,
  usage,
  practicalities,
  list
} = require('./dialogues');

const utilities = require('./utilities');

const {
  startDaemon
} = utilities.daemon;

const {
  setupDatabase
} = utilities.database;

const {
  broadcast
} = utilities.messaging;

module.exports = botpress => {
  // Botpress specific
  botpress.middlewares.load();

  setupDatabase(botpress);

  startDaemon(botpress);

  botpress.hear(/använd/i, usage.bind(null, botpress));

  botpress.hear(/fungera|funka/i, practicalities.bind(null, botpress));

  botpress.hear(/lista|just nu|bostäder|boende|rum|korridor|lägenhet/i, list.bind(null, botpress));

  botpress.hear(/start/i, subscribe.bind(null, botpress));

  botpress.hear(/stop/i, unsubscribe.bind(null, botpress));

  // TODO: doesn't handle event correctly - exits directly
  function gracefulShutdown() {
    console.log('Initiating graceful shutdown');

    broadcast(botpress, 'Tjänsten kommer att stängas ned tillfälligt. Snart hörs vi igen!')
    .then(() => {
      console.error('Users have been notified. Will now exit');
    })
    .catch(error => {
      console.error('Could not broadcast message', error);
    });
  }

  // I.e. CTRL+C
  process.on('SIGINT', gracefulShutdown);
  // I.e. kill -p
  process.on('SIGTERM', gracefulShutdown);
  // I.e. keyboard
  process.on('SIGQUIT', gracefulShutdown);
};
