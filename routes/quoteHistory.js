// const fs = require('fs');

module.exports = {
	getQuoteHistoryPage: (req, res) => {
        // let query = "SELECT * FROM `fuelquote` ORDER BY clientId ASC"; // SQL statement to query all quotes
        // // Execute query
        let query = "SELECT fuelquote.quoteId, fuelquote.clientId, clientinformation.fullName, fuelquote.gallonsRequested, fuelquote.requestDate, fuelquote.deliveryDate, fuelquote.deliveryAddress, fuelquote.deliveryCity, fuelquote.deliveryState, fuelquote.deliveryZipCode, fuelquote.deliveryContactName, fuelquote.deliveryContactPhone, fuelquote.deliveryContactEmail, fuelquote.suggestedPrice, fuelquote.totalAmountDue FROM `fuelquote` JOIN clientinformation ON fuelquote.clientId = clientinformation.clientId ORDER BY fuelquote.clientId"
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/index.ejs');
            }
            res.render('quoteHistory.ejs', {
                fuelquote: result // Quotes result used in quoteHistory.ejs to render table
            });
        });
    }
};
