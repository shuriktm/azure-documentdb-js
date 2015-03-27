This Node.js application connects to DocumentDB database using the endpoint and master key. 
The application requests the Resource token for a specified user/permission combination and returns this to the caller.

The resulting token is what needs to be used by the JavaScript client application when it attempts to connect to DocumentDB using resource tokens, as per;

```javascript
	var host = (hostendpoint);
    var resourceToken = {};
    resourceTokens[(collection._rid)] = (resourceToken); // Add the collection _rid (NOT the Collection Id but the internal resource id) and resourceToken for read/write on the collection
	
    var client = DocumentDB.createClient(host, {
        resourceTokens: resourceTokens
    }); 
```

The JavaScript client does not support connecting to the service use the master key because this is insecure to distribute your master key to every client application.
Therefore, use a secured middle-tier service, such as this Node.js app which uses the master key to generate a token usable by the JavaScript client.

NOTE:
This is a sample that uses a single user and a single permission object.
If you wish to have multiple users, each with their own permissions, then adjust accordingly.
