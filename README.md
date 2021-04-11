## Dummy webhook services to support Dialogflow CX agents

![alt text](cx-interaction-sequence.svg)

Typically, Dialogflow CX agents use webhooks to serve intents/flows by querying external services. This helps the
virtual agent program to serve the customer with the up-to-date information on product/services.

In this dummy project, i have created the [Webhook Service](function/smartService.js) and
the [optional External API](function/searchEngineService.js) from the image above. 

### This Example

The smartService cloud function gets triggered by the CX agent webhook to search for products (e.g. blue jeans)

* the service extracts the parameters passed by the CX agent
* constructs the URL to query a 3rd party service (searchEngineService cloud function in this example) with the required
  parameters
* calls the searchEngineService using Axios package
* parses the response from the searchEngineService
* constructs the JSON message compliant with
  the [ResponseMessage API specification](https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3beta1#responsemessage)
    * in this example, I have used the **
      info** [richContent message](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger#info_response_type)
    * plain text responses could also be constructed and returned matching [this](responses/plainTestResponse.json)
      example message
* returns the object to the CX agent

### Few Notes

* RichContents are supported
  by [Dialogflow messenger](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger) and
  supports rich sets of capabilities to support surfacing the contents, hyperlinks, lists etc. They also support
  facebook messenger.
* I have not handled the negative scenarios such as service unavailable, incorrect response handling etc.
* JSON object creation should be inproved by using a 3rd party library such that the objects are dynamically created in
  a manageable manner.
* Due to the copy-paste error, the smartService package file needs to be cleaned up to retain only the libraries needed
  for the use case. 