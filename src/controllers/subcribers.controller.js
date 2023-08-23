const { Subscriber } = require("../models");
// helpers
const { sendConfirmationEmail, success, error } = require("../helpers");

const subscribe = async(req, res) => {

    const { email } = req.body;

    //Generate confirmationCode 
    const confirmationCode = Math.random().toString(36).substring(2, 8);

    const subcriberData = {
        email,
        confirmationCode
    }

    const subscriber = new Subscriber(subcriberData);
    await subscriber.save();

    await sendConfirmationEmail(email, confirmationCode)
    .then( msg => {
        success(req, res, msg, 200);
    })
    .catch( err => {
        error(req, res, err);
    });
    
}

const confirmSubcription = async(req, res) => {
    const { confirmationCode } = req.params;
    
    const subscriber = await Subscriber.findOne({confirmationCode})
    
    if(!subscriber){
        return error(req, res, 'Invalid Confirmation Code')
    }

    subscriber.confirmed = true;
    await subscriber.save()
    .then(data => {
        success(req, res, 'Subscription Confirmed')
    })
    .catch(err => {
        error(req, res, 'Error processing the request', 400)
    })
}

module.exports = {
    confirmSubcription,
    subscribe
}