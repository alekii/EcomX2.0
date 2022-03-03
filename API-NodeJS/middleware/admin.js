//Authorizationn
module.exports = function(req,res,next){
    //403 Forbidden -dont try again 
    //401 unauthorized - user tries to acces resource bt no valid jwt provided
    if(!req.user.isAdmin) return res.status(403).send('Forbidden. Access Denied')
    
    next()
}