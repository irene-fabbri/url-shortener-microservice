const express = require(`express`);
const cors = require('cors');
const input_validation = require('./input_validation');
const app = express ();

app.use(express.json());
app.use(cors());

// For the sake, of simplicity I am not using a database for this exercise
let URList = [];
let id = 1;

// Allow for GET or POST method
app.use((req, res, next) => {
  if (!['GET', 'POST'].includes(req.method)) {
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

app.post('/api/shorturl', input_validation, (req,res) => {
  const original_url = req.body.data.attributes.url;
  const short_url = id
  // Add to URList
  URList.push({
    "original_url": `${original_url}`,
    "short_url": `${short_url}`
  });
  id += 1;

  // return json with original and short url
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
  if( !req.params.url ){
    return res.status(400).send({
      "errors": [
        {
          "status": "400",
          "code": "missing-short-url",          
          "title": "Missing short URL",
          "detail": "MUST provide a short URL"
        }
      ]
    });
  }

  const short_url = req.params.url;
  
  // Look if URL in urlList
  let URLObj = URList.find(url => url['short_url'] === short_url)
  if(URLObj === undefined) {
    return res.status(400).send({
      "errors": [
        {
          "status": "400",
          "code": "invalid-short-url",          
          "title": "Invalid short URL",
          "detail": "The short_url provided is not on the URL list"
        }
      ]
    });
  }
  
  // If found, redirect to page
  res.redirect(302, URLObj.original_url);
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