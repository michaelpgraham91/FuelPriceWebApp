const fs = require('fs');

module.exports = {
	getRequestPage: (req, res) => {
     //   let query = "SELECT `clientId` FROM `fuelquote`";
        let query = "SELECT DISTINCT fuelquote.clientId AS 'clientId', clientinformation.clientId AS 'activeClient', clientinformation.fullName AS 'clientName' FROM fuelquote RIGHT JOIN clientinformation ON fuelquote.clientId = clientinformation.clientId"
        db.query(query, (err, result) => {
            if(err) {
                res.redirect('/index.ejs');
            }
            res.render('requestAQuote.ejs', {
                fuelquote: result
            });    
        });
		
	},

	addRequest: (req, res) => {
		console.log("Add request started");
		let quote = {
		 clientId: req.body.clientId,
         gallonsRequested: req.body.num_gallons,
         requestDate: req.body.request_date,
         deliveryDate: req.body.delivery_date,
         deliveryLocation: req.body.delivery_location,
         deliveryCity: req.body.city,
         deliveryState: req.body.state,
         deliveryZipCode: req.body.zip,
         deliveryContactPersonName: req.body.delivery_contact_person_name,
         deliveryContactPersonPhone: req.body.delivery_contact_person_phone,
         deliveryContactPersonEmail: req.body.delivery_contact_person_email,
         suggestedPricePerGallon: req.body.price_per_gallon,
         totalAmountDue: req.body.total_amount_due
    	}		

    	
        let query = "INSERT INTO `fuelquote` (clientId, gallonsRequested, requestDate, deliveryDate, deliveryAddress," +
                            "deliveryCity, deliveryState, deliveryZipCode, deliveryContactName, deliveryContactPhone, deliveryContactEmail, suggestedPrice, totalAmountDue) VALUES ('" +
                            quote.clientId + "', '" + quote.gallonsRequested + "', '" + quote.requestDate + "', '" + quote.deliveryDate + "', '" + quote.deliveryLocation + "', '" + 
                            quote.deliveryCity + "', '" + quote.deliveryState + "', '" + quote.deliveryZipCode + "', '" + quote.deliveryContactPersonName + "', '" + 
                            quote.deliveryContactPersonPhone + "', '" + quote.deliveryContactPersonEmail + "', '" + quote.suggestedPricePerGallon + "', '" + quote.totalAmountDue + "')";


	    let isValid = validateQuoteInput(quote);
	   	if(isValid) {
	   		console.log("Valid quote");
            db.query(query, (err, result) => {
            if(err) {
                return res.status(500).send(err);
            }
            console.log("Quote added successfully");
            res.redirect('requestAQuote.ejs');
        }) 
	   	}
	   	else {
	  		console.log("Invalid");
            res.redirect('back')
	   	}
	
		    	

	}


};

function validateQuoteInput(quote) {
    var regexName = new RegExp('[^a-zA-Z\\s]');
    var regexEmail =
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var regexPhone = /^\d{10}$/;
    var regexDate = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\d\d$/;
    var regexAmount = /^\d+(\.\d{1,2})?$/;
    if(quote.gallonsRequested === '' || quote.deliveryLocation === '' || quote.deliveryContactPersonName ===
'' || quote.deliveryContactPersonEmail === '' || quote.deliveryContactPersonPhone === '' || quote.suggestedPricePerGallon === '') {
     // alert("Must fill out all fields");
      return false;
    }
    else if(regexName.test(quote.deliveryContactPersonName)){
    //  alert("Contact name must only contain letters");
      return false;
    }
    else if(!regexEmail.test(quote.deliveryContactPersonEmail)) {
    //  alert("Please enter a valid email");
      return false;
    }
    else if(!regexPhone.test(quote.deliveryContactPersonPhone)) {
    //  alert("Please enter a 10 digit phone with dashes xxx-xxx-xxxx");
      return false;
    }
    else if(!regexAmount.test(quote.gallonsRequested)) {
    //    alert("Please enter gallons as a whole number or to two decimal places");
    	return false;
    }
    else {
      return true;
    }
}