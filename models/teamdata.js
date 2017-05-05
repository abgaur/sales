const mongoose = require('mongoose');
const Comment = require('../models/comment');

module.exports.getCallToMeeting = function(fromDate, toDate, arrBDM, callback){
    console.log(arrBDM);

    Comment.aggregate([
   //{ $match: {"updatedAt" : {$gte: fromDate , $lte: toDate}}},
    { $match: { $or: [ { commentType: "Call" }, { commentType: "Meeting" } ] } },
    { $match: {"bdm.email" : { $in: arrBDM }} },
  
    {
        $group: {
            _id: "$user.email",
            name : { $first: '$user.name' },
            email : { $first: '$user.email' },
            totalCount: { $sum: 1 },
            calls: {
                $sum: {
                    $cond: [{ $eq: ["$commentType", "Call"] }, 1, 0]
                }
            },
            meeting: {
                $sum: {
                    $cond: [{ $eq: ["$commentType", "Meeting"] }, 1, 0]
                }
            }
        }
    }
    
    ], callback)
};