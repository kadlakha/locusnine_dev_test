module.exports = function (error, response, parentResponse) {
    try {
        if (error) {
            parentResponse.json(error);
        } else {
            parentResponse.json(JSON.parse(response));
        };
    } catch (e) {
        logger.error(response);
        parentResponse.json({
            response_code: 0,
            response_message: JSON.stringify(e)
        })
    }
};