const mongoose = require('mongoose');
const Comment = require('../models/comment');

module.exports.getCallToMeeting = function(fromDate, toDate, arrBDM, callback){
    console.log(arrBDM);

    Comment.aggregate([
    { $match: {"updatedAt" : {$gte: fromDate , $lte: toDate}}},
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

/** returns top callers for given month */
module.exports.getTopUsersforMonth = function(month, noOfUsers, callback){
    Comment.aggregate([
        {
            $redact: {
                $cond: [
                    { $eq: [{ $month: "$updatedAt" }, month] },
                    "$$KEEP",
                    "$$PRUNE"
                ]
            }
        },
        { $match: { $or: [{ commentType: "Call" }, { commentType: "Meeting" }] } },
        {
            $group: {
                _id: "$user.email",
                name: { $first: '$user.name' },
                email: { $first: '$user.email' },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        },
        { $limit: noOfUsers },
        {
            $project: { _id: 0 }
        }
    ], callback);
};