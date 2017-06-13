const mongoose = require('mongoose');
const Comment = require('../models/comment');

module.exports.getCallReport = function (fromDate, toDate, arrBDM, arrISR, groupBy, callback) {
    let groupId = null;

    switch (groupBy) {
        case "day":
            groupId = { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } };
            break;
        case "week":
            groupId = { $week: "$updatedAt" };
            break;
        case "month":
            groupId = { $month: "$updatedAt" };
            break;
    };

    if (groupId) {
        Comment.aggregate([
            { $match: { "isr": { $in: arrISR } } },
            { $match: { "updatedAt": { $gte: fromDate, $lte: toDate } } },
            { $match: { $or: [{ commentType: "Call" }, { commentType: "Meeting" }] } },
            { $match: { "bdm.email": { $in: arrBDM } } },

            {
                $group: {
                    _id: groupId,
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
            },
            {
                $sort: { _id: 1 }
            },
        ], callback)
    }else{
        callback("invalid value for groupBy : "+groupBy, null);
    }
};