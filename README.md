<html>
        <head>
        <title>Microsoft Azure DocumentDB SDK: Javascript</title>
    </head>
    <body>
        <h2>Microsoft Azure DocumentDB SDK: Javascript</h2>
        <p>
            DocumentDB is a purpose built NoSQL JSON document database designed for modern mobile and web applications. DocumentDB supports rich queries over JSON data as well as, <br>
            transactional execution of JavaScript based application logic. DocumentDB is built with a deep commitment to the JSON data model enabling it to offer differentiated query and data <br>
            processing capabilities that scale to meet the needs of the most demanding modern applications.
        </p>
        <p>
            The Javascript client SDK provides access to DocumentDB through the REST interface using permissions authorization. <br>
            The SDK supports only collection level operations.
        </p>
        <h4>Hello world example code</h4>
        <p><pre style="background-color:#eee">
var host = (hostendpoint);                        // Add your host
var resourceToken = {};
resourceTokens[(collectionId)] = (resourceToken); // Add the collectionId and resourceToken for read/write on the collection
var collectionUrl = (collectionUrl);              // Add the collection self-link
var client = DocumentDB.createClient(host, {resourceTokens: resourceTokens});
var documentDefinition = {id: "Hello world document", content: "Hello World!"};
client.createDocument(collectionUrl, documentDefinition, function(err, createdDocument) {
    if (err) {
        throw err;
    }
        
    console.log('result', createdDocument.content);
});
</pre></p>

</body>
</html>
