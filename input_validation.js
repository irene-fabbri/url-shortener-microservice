module.exports = (req, res, next) => {
  const { data } = req.body;

  if(!data) {
      return res.status(400).send({
          "errors": [
            {
              "status": "400",
              "code": "missing-attribute",          
              "title": "Missing Attribute",
              "detail": "The request is missing required attributes",
              "source" : {
                  "pointer": "/data"
              }
            }
          ]
        });
  } else if (!data.attributes){
      return res.status(400).send({
          "errors": [
            {
              "status": "400",
              "code": "missing-attribute",          
              "title": "Missing Attribute",
              "detail": "The request is missing the 'attributes' attribute",
              "source" : {
                  "pointer": "/data/attributes/"
              }
            }
          ]
        });
  } else if( !data.attributes.url ){
      return res.status(400).send({
          "errors": [
            {
              "status": "400",
              "code": "missing-attribute",          
              "title": "Missing Attribute",
              "detail": "The request is missing required 'url' attribute",
              "source" : {
                  "pointer": "/data/attributes/url"
              }
            }
          ]
        });
  } else if( Object.entries(data.attributes).length > 1){
      return res.status(400).send({
          "errors": [
            {
              "status": "400",
              "code": "too-many-attributes",          
              "title": "Too Many Attributes",
              "detail": "The request has too many attributes.Only 'url' is allowed in 'attributes'",
              "source" : {
                  "pointer": "/data/attributes"
              }
            }
          ]
        });
  };

  // Check if valid URL
  const pattern = /^https?:\/\/(?:www\.)?[a-zA-Z0-9]{2,}(?:\.[a-zA-Z0-9]{2,})+(\/[a-zA-Z0-9]{2,})*\/?/;

  const original_url = data.attributes.url;
  
  if (! pattern.test(original_url)) {
    return res.status(400).send({
      "errors": [
        {
          "status": "400",
          "code": "invalid-url",          
          "title": "Invalid URL",
          "detail": "MUST provide valid URL"
        }
      ]
    });
  }
    next();
}