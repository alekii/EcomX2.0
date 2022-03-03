const {User} = require('../model/users');


async  function getCurrentUser(){


return await User.findById(req.user._id).select('-password');
}

module.exports  = getCurrentUser;