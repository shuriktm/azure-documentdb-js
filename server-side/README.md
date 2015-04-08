JSDocs: http://dl.windowsazure.com/documentDB/jsserverdocs/

When building server-side logic in Stored Procedures, Triggers, UDFs etc. it is useful to have Visual Studio IntelliSense to help you out. Using this wrapper file you can enable full server-side IntelliSense for the server-side JS SDK. 

In Visual Studio - Tools->Options->Text Editor->JavaScript->Intellisense->References and add a reference to this file. 

Or, in the JS file you are working on you can provide the path to the file explicitly in comments.
    <reference group="Generic" />
    <reference path="C:\Program Files (x86)\Microsoft Visual Studio 12.0\JavaScript\References\DocDbWrapperScript.js" />
