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
