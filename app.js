const express = require(`express`);
const cors = require('cors')
const app = express ();

app.use(cors());

// For the sake, of simplicity I am not using a database for this exercise
let URList = [];

// Allow for GET or POST method
app.use((req, res, next) => {
  if (not ['GET', 'POST'].includes(req.method)) {
    return res.status(405).send({
      "errors": [
          {
              "status": "405",
              "code": "method-not-allowed",     
              "title": "Method not allowed",
              "detail": "Request metod MUST be GET or POST"
          }
      ]
    });
  }
  next();
});

app.post('/api/shorturl',  (req,res) => {
  // TODO
  // Check if valid URL
  const pattern = /^https?:\/\/(?:www\./)?[a-zA-Z0-9]{2,}(?:\.[a-zA-Z0-9]{2,})+(\/[a-zA-Z0-9]{2,})*\/?/;

  // Check if already in urlList
  // If not, add to list

  // return json with original and shorten url
  res.status(200).json({
    "data": {
        "type": "short-url",
        "attributes": {
            "original_url": `${original_url}`,
            "short_url": `${short_url}`
        }
      }
  });
});

app.get('/api/shorturl/:url?',  (req,res) => {
  // TODO

  // Look if URL in urlList

  // Redirect to page
});

// Centralized error handling middleware
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      "errors": [
        {
          "status": `${error.status}`,
          "code": `${error.message}`,          
          "title": `${error.message}`
        }
      ]
  });
});

// Export the app instance for testing
module.exports = app;