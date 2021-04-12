'use strict';
const axios = require('axios');
const functions = require('firebase-functions');

function constructUrl(serviceBaseUrl, body) {
    // extract jeans colour from the input session parameter
    let colour = body.sessionInfo.parameters.jeans_color_param.original;
    return serviceBaseUrl + '?cloth_type=jeans&colour=' + colour;
}

exports.nextService = functions.https.onRequest(async (req, res) => {
    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body));

    // compile GET request URL by extracting relevant params
    //TODO: Please changhe the below URL to the URL corresponding to your service
    let url = constructUrl('https://mockbin.org/bin/07b65975-59ef-43f1-96d0-60952c6cdb9c', req.body);

    // Call the search API/service to fetch the matching products
    let responseData = '';
    try {
        const response = await axios.get(url);
        responseData = response.data;
    } catch (error) {
        console.error(error);
    }

    // construct response body matching the Dialogflow richContent API specification
    let body = constructRichContentResponseMessage(responseData);
    console.log('raw : ' + body);

    // return message/body
    res.status(200).send(body);
});

// Function to construct richContent required by the Dialogflow API
// The following is a crude way of building JSON in NodeJS. Please use an appropriate library to construct the JSON object in a neat way.
function constructRichContentResponseMessage(input) {

    // picking the first element for the demo purposes
    let data = {
        // This type changes based on the type of the custom response one expects in Dialogflow.
        // refer to https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger for richContent message types
        type: "info",
        title: input.list[0].title,
        subtitle: input.list[0].brand,
        image: {
            src: {
                rawUrl: input.list[0].url
            }
        },
        actionLink: "https://example.com"
    }

    let richContentCollection = [];
    richContentCollection.push(data);

    let payload = {
        payload: {
            richContent: [
                richContentCollection
            ]
        }
    }

    let messages = [];
    messages.push(payload);

    return {
        fulfillment_response: {
            messages
        }
    };
}
