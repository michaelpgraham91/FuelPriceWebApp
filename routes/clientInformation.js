const fs = require('fs');

module.exports = {
	getClientPage: (req, res) => {
    	res.render('clientInformation.ejs');
        
    },

    addClient: (req, res) => {
    
        // console.log("add client happening");
    	let message = '';
    	let client = {
    		first_name: req.body.firstname,
    		last_name: req.body.lastname,
    		address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
    		phoneNumber: req.body.phonenumber,
    		email: req.body.email
    	};

    	client.first_name = client.first_name + " ";
        console.log("ZIP: " + client.zip);

    	let isValid = validateInput(client);
    	if(isValid) {
            let query = "INSERT INTO `clientinformation` (fullName, address, city, state, zipCode, phone, email) VALUES ('" +
                client.first_name + client.last_name + "', '" + client.address + "', '" + client.city + "', '" 
                + client.state + "', '" + client.zip + "', '" + client.phoneNumber + "', '" + client.email + "')";
            db.query(query, (err, result) => {
            if(err) {
                return res.status(500).send(err);
            }
            console.log("Client added successfully");
            res.redirect('clientInformation.ejs');
        }) 
    		console.log("Client is valid");
    	}
    	else {
    		console.log("Client not valid");
            res.redirect('back');
    	}


    }

};

function validateInput(client) {
	    var regexName = new RegExp('[^a-zA-Z]');
	    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    var regexPhone = /^\d{10}$/;
        var regexZip = /^\d{5}$/;
	    if(client.firstName === '' || client.lastName === '' || client.address === '' || client.phoneNumber === '' || client.email === '') {
	      // alert("Must fill out all fields");
	      return false;
	    }
        else if(!regexZip.test(client.zip)) {
            return false;
        }
	    else if(regexName.test(client.firstName)){
	      // alert("First name must only contain letters")
	      return false;
	    }
	    else if(regexName.test(client.lastName)) {
	      // alert("Last name must only contain letters")
	    }
	    else if(!regexPhone.test(client.phoneNumber)) {
	      // alert("Please enter a 10 digit phone with dashes xxx-xxx-xxxx")
	    }
	    else if(!regexEmail.test(client.email)) {
	      // alert("Please enter a valid email")
	    }
	    else {
	      return true;
	    }
	}