const mongoose = require('mongoose');
const Comment = require('../models/comment');

module.exports.getCallToMeeting = function (fromDate, toDate, arrBDM, callback) {
    Comment.aggregate([
        { $match: { "updatedAt": { $gte: fromDate, $lte: toDate } } },
        { $match: { $or: [{ commentType: "Call" }, { commentType: "Meeting" }] } },
        { $match: { "bdm.email": { $in: arrBDM } } },

        {
            $group: {
                _id: "$user.email",
                name: { $first: '$user.name' },
                email: { $first: '$user.email' },
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
module.exports.getTopUsersforMonth = function (month, noOfUsers, callback) {
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

/** returns meetings scheduled for given month */
module.exports.getMeetingsScheduledforMonths = function (noOfMonths, callback) {
    Comment.aggregate([
        { $match: { commentType: "Meeting" } },
        {
            $lookup:
            {
                from: "clients",
                localField: "clientId",
                foreignField: "_id",
                as: "details"
            }
        },
        {
            $project: {
                "_id": 1,
                "isr": "$user.name",
                "bdm": "$bdm.name",
                "clients": { "$arrayElemAt": ["$details", 0] },
                "month": { $dateToString: { format: "%Y-%m", date: "$updatedAt" } }
            }
        },
        {
            $group: {
                _id: {
                    month: "$month"
                },
                "month": { $first: "$month" },
                "clientCount": { "$sum": 1 },
                "clients": {
                    "$push": {
                        "isr": "$isr",
                        "bdm": "$bdm",
                        "company": "$clients.company",
                        "name": { $concat: ["$clients.firstName", " ", "$clients.lastName"] }
                    },
                }
            }
        },
        { $sort: { _id: -1 } },
        { $limit: noOfMonths },
        {
            $project: { _id: 0 }
        },
    ], callback);
};