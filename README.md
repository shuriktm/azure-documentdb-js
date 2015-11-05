#Microsoft Azure DocumentDB SDK: Javascript Client

DocumentDB is a purpose built NoSQL JSON document database designed for modern mobile and web applications. DocumentDB supports rich queries over JSON data as well as, transactional execution of JavaScript based application logic. DocumentDB is built with a deep commitment to the JSON data model enabling it to offer differentiated query and data processing capabilities that scale to meet the needs of the most demanding modern applications.

**Note: The Javascript Client SDK is intended for mobile scenarios. You will run in to CORS issues when attempting to use it from a browser.**

## Hello world example code

    var host = (<hostendpoint>); 
    var resourceTokens = {};
	resourceTokens[(collection._rid)] = (<resourcetoken>); 

    var client = DocumentDB.createClient(host, {
        resourceTokens: resourceTokens
    });
	
    var documentDefinition = {
        id: "Hello world document",
        content: "Hello World!"
    };
	
	//this url can be in the old format of dbs/tyhbAA==/colls/tyhbAN053QA=/
	//or in the newer format of dbs/YourDbId/colls/YourCollId
    var collectionUrl = ('dbs/MyDatabaseId/colls/MyCollectionId');	
    client.createDocument(collectionUrl, documentDefinition, function(err, createdDocument) {
        if (err) {
            throw err;
        }

        console.log('result', createdDocument.content);
    });

##Instructions
 - Replace <hostendpoint> with the value of your DocumentDB account endpoint, available in the [Azure Management Portal](portal.azure.com)
 
 - Replace <collection_rid> with the value of the Collection _rid. Note, this is the internal _rid, not the id you gave the collection when creating it.
 
 - Replace <resourcetoken> with a valid permission token. 

   	By design, the JavaScript client SDK does not expose the capability to connect to DocumentDB using the master key as you might do when using the Node.js SDK. This is because you should never distribute the master key for your account to a client device. This is very dangerous. 
   	Instead the JavaScript client SDK uses DocumentDB users & permissions with time based permission tokens. Using these tokens does not expose your DocumentDB account and allows you to limit what each user is able to do. 

   	To get a valid permission token you will need to create a user and permission server that uses the master key to connect to DocumentDB, generates and returns a token which can then be used from the JavaScript client SDK. An example of such a permission server can be found at [Sample Permission Server](https://github.com/Azure/azure-documentdb-js/tree/master/client/samples/Sample%20Persmission%20Server)  

###The completed code sample should resemble something like this:

    var host = "https://foo.documents.azure.com:443";
	var coll_rid = "Pa0wAKPRZQA=";
	var token = "type=resource&ver=1&sig=WaOXNCJaZ7Z7obf74i48Yg==;Dbb5bXDnm5ou0rpAUyifsFR5VNIsfSTeuad81P7zC7ytJtSwLCLnw9ne99vuIH8/giBsYIrqtXE5PYDs2idLfdJ4+K3bfT8BJgWqdgIuIEE/nvVpdEQ85y1azPXO7F+wXwBzK4eH2wQ0yMudy+petUdnN1GR3VJNsuNTZ1j+mnLLT/FLpFjWLVyI2dTLe7KHM0FvnczVZmT9wGJV8rUMjgjV9oG552DAev9exPGnj4E=";
	
    var resourceTokens = {};
	resourceTokens[coll_rid] = token; 
	
    var client = DocumentDB.createClient(host, {
        resourceTokens: resourceTokens
    });
	
    var documentDefinition = {
        id: "Hello world document",
        content: "Hello World!"
    };
	
	//this url can be in the old format of dbs/tyhbAA==/colls/tyhbAN053QA=/
	//or in the newer format of dbs/YourDbId/colls/YourCollId
    var collectionUrl = ('dbs/MyDatabaseId/colls/MyCollectionId');	
    client.createDocument(collectionUrl, documentDefinition, function(err, createdDocument) {
        if (err) {
            throw err;
        }

        console.log('result', createdDocument.content);
    });
