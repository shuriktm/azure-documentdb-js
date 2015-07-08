#Microsoft Azure DocumentDB SDK: Javascript

DocumentDB is a purpose built NoSQL JSON document database designed for modern mobile and web applications. DocumentDB supports rich queries over JSON data as well as, transactional execution of JavaScript based application logic. DocumentDB is built with a deep commitment to the JSON data model enabling it to offer differentiated query and data processing capabilities that scale to meet the needs of the most demanding modern applications.

## Hello world example code

```javascript
    var host = (hostendpoint); 
    var resourceTokens = {};
    resourceTokens[(collection._rid)] = (resourceToken); // Add the collection _rid (NOT the Collection Id but the internal resource id) and resourceToken for read/write on the collection

    var collectionUrl = (collectionUrl); // Add the collection self-link
    var client = DocumentDB.createClient(host, {
        resourceTokens: resourceTokens
    });
    var documentDefinition = {
        id: "Hello world document",
        content: "Hello World!"
    };
    client.createDocument(collectionUrl, documentDefinition, function(err, createdDocument) {
        if (err) {
            throw err;
        }

        console.log('result', createdDocument.content);
    });
```

###Instructions
 - Place your DocumentDB endpoint in to `(hostendpoint)`.
 - Place the collection resource id (this is the `_rid`, not the `id`,
   property in the collection JSON document) as the value for
   `(collectionId)`.
 - Place the permissions token (you will need to create a user and
   permission for the collection) as the value for `(resourceToken)`.
 - Place the `_self` link for the collection in `(collectionUrl)`

###The completed code sample should resemble something like this:


```javascript
    var host = "https://bloopbloop.documents.azure.com:443"; // Add your host

    var resourceTokens = {};
    // Add the collection._rid and resourceToken (obtained from some middle tier service) for read/write on the collection
    resourceTokens["Pa0wAKPRZQA="] = "type=resource&ver=1&sig=WaOXNCJaZ7Z7obf74i48Yg==;Dbb5bXDnm5ou0rpAUyifsFR5VNIsfSTeuad81P7zC7ytJtSwLCLnw9ne99vuIH8/giBsYIrqtXE5PYDs2idLfdJ4+K3bfT8BJgWqdgIuIEE/nvVpdEQ85y1azPXO7F+wXwBzK4eH2wQ0yMudy+petUdnN1GR3VJNsuNTZ1j+mnLLT/FLpFjWLVyI2dTLe7KHM0FvnczVZmT9wGJV8rUMjgjV9oG552DAev9exPGnj4E=;"; 

    var collectionUrl = "dbs/Pa0wAA==/colls/Pa0wAKPRZQA=/"; // Add the collection self-link

    var client = DocumentDB.createClient(host, {
        resourceTokens: resourceTokens
    });

    var documentDefinition = {
        id: "Hello world document",
        content: "Hello World!"
    };

    client.createDocument(collectionUrl, documentDefinition, function(err, createdDocument) {
        if (err) {
            throw err;
        }

        console.log('result', createdDocument);
    });
```
