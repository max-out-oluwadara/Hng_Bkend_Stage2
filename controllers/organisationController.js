//GET
//All the orginisation the user belongs to or created
//Dont get another user orginisation
exports.getUserOrganisation = (req, res)=>{
    res.send("Get all  organisation the user belong to or created");
}


//GET
//The log in user gets a single Organisation record
exports.getOrganizationByIdForUser = (req, res)=>{
    res.send("user get a single organisation record")
};

//POST
//User can Create their new organisation
exports.createOrganization = (req, res)=>{
    res.send(" User Create Organisation");
}

//POST
//Add a user to a particular Organisation
exports.addUserToOrganization = (req, res)=>{
    res.send(" Add a user to a particular Organisation")
};