// const fs = require('fs');

module.exports = {
	getClientListPage: (req, res) => {
        let query = "SELECT * FROM `clientinformation` ORDER BY clientId ASC"; // SQL statement to query all quotes
        // Execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/index.ejs');
            }
            res.render('clientList.ejs', {
                clients: result // Quotes result used in quoteHistory.ejs to render table
            });
        });
    }
};
