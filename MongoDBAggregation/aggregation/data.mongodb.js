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
    $group:{
      _id:"null",
      averageAge:{
        $avg:"$age"
      }
    }
  }
])

// 3. List the top 5 common fruits among the users
db.data.aggregate([
  {
    $group:{
      _id:"$favoriteFruit",
      count:{
        $sum:1
      }
    }
  },
  {
    $sort: {
      count: -1
    }
  },
  {
    $limit:2
  }
])
