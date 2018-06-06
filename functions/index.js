const functions = require('firebase-functions');

const messages = [
  {
    text: 'Deece',
  },
  {
    text: 'Click here',
  },
  {
    text: 'What\'s Mrs. H cooking up tonight then Chrissy Harrrriiisss?',
  },
  {
    text: 'See PSD',
  },
  {
    text: 'Press cmd + Q to mute',
  },
  {
    text: 'What did you get for Christmas?',
  },
  {
    text: 'Who\'s getting twisted at 4?',
  },
  {
    text: 'Good luck ****',
  },
  {
    text: 'The budget is what it costs',
  },
  {
    text: 'I’ve got no plans this evening'
  }, 
  {
    text: 'One of my friends Dad\'s van was broken into last night on the outskirts of Cardiff'
  },
  {
    text: 'Love that'
  },
  {
    text: 'Boooooorrrriiiinnnggg'
  }
];

// Verify that the webhook request came from Slack. 
function verifyWebhook (body) {
  if (!body || body.token !== functions.config().slack.token) {
    const error = new Error('Invalid credentials');
    error.code = 401;
    throw error;
  }
}

// Verify that the method is of type POST
function verifyType (method) {
  if (method !== 'POST') {
    const error = new Error('Only POST requests are accepted');
    error.code = 405;
    throw error;
  }
}

// Generate random integer between two values (inclusive)
function getRandomInt(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return  randomInt
}

function selectMessage () {
  const messagesArray = messages;
  const messagesLength = messagesArray.length;
  const randomIndex = getRandomInt(0, messagesLength - 1);
  const message = messagesArray[randomIndex];
  return message;
}

exports.admin = functions.https.onRequest((req, res) => {
  // Check that method is of type POST
  verifyType(req.method);

  // Verfiy that this request came from Slack
  verifyWebhook(req.body);

  // Get admin message to send back to slack
  const message = selectMessage();

  // Set message to be public in slack
  message.response_type = 'in_channel'

  // Send message to slack
  res.send(message);
});