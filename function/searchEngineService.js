/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.searchEngine = (req, res) => {
    console.log('Search Engine Service Request Header : ' + JSON.stringify(req.headers));
    console.log('Search Engine Service Request Body : ' + JSON.stringify(req.body));
    console.log("Search params : cloth_type [" + req.args.get('cloth_type') + '],colour[' + req.args.get('colour') + ']');

    let obj = JSON.parse('{"list":[{"pid":"1","title":"JeansWithStretch","brand":"Lewis","price":"45.56","sale_price":"29.99","thumb_image":"","url":"https://www.next.co.uk/G27318s7/530205","description":"79%Cotton,20%Recycledcotton,1%Elastane"},{"pid":"2","title":"CottonCargoTrousers","brand":"Lewis","price":"29.00","sale_price":"20.00","thumb_image":"","url":"https://www.next.co.uk/g572158s2/634016","description":"100%Cotton."}]}');
    res.status(200).send(obj);
};
