use("aggregate");

// 1. How many users are active
db.data.aggregate([
  {
    $match: {
      isActive: true,
    },
  },
  {
    $count: "activeUsers",
  },
]);

//  2. what is the average age of all users
db.data.aggregate([
  {
    $group: {
      _id: "null",
      averageAge: {
        $avg: "$age",
      },
    },
  },
]);

// 3. List the top 5 common fruits among the users
db.data.aggregate([
  {
    $group: {
      _id: "$favoriteFruit",
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $limit: 2,
  },
]);

// 4. Find the toal number of male and females

db.data.aggregate({
  $group: {
    _id: "$gender",
    count: {
      $sum: 1,
    },
  },
});

// 5. Which country has the highest number of registered users

db.data.aggregate([
  {
    $group: {
      _id: "$company.location.country",
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $limit: 1
  }
]);

// 6. List all the unique eye colors present in the collection
db.data.aggregate([
  {
    $group: {
      _id:"$eyeColor"
    }
  }
])

// 7. What is the average number of tags per users
// when you have arrays, you need to seperate the arrays if you have to make use of result from the array
// Method 1
db.data.aggregate([
  {
    $unwind: "$tags"
  },
  {
    $group:{
      _id:"$_id",
      numberOfTags:{
        $sum:1
      }
    }
  },
  {
    $group:{
      _id:null,
      averageNumberOfTags:{
        $avg:"$numberOfTags"
      }
    }
  }
])

// Method 2
db.data.aggregate([
  {
    $addFields: {
      numberOfTags: {
        $size:{$ifNull:["$tags",[]]}
      }
    }
  },
  {
    $group:{
      _id:null,
      averageNumberOfTags:{
        $avg:"$numberOfTags"
      }
    }
  }
])

// 8. How many users have 'enim' as one of their tags
db.data.aggregate([
  {
    $match: {
      tags:"enim"
    }
  },
  {
    $count:"userWithEnimTag"
  }
])

// 9. What are the name of users who are inactive and have 'velit' as a tag?
db.data.aggregate([
  {
    $match:{
      isActive:false,
      tags:'velit',
      age:{
        $gt:20
      }
    }
  },
  {
    $project: {
      name:1,
      age:1
    }
  }
])

// 10. How many users have phone numbers starting with '+1 (940)'?

db.data.aggregate([
  {
    $match:{
      "company.phone": /^\+1 \(940\)/
    }
  },
  {
    $count: 'usersWithSpecialPhoneNumber'
  }
])