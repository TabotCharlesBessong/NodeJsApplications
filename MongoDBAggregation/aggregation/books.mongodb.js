use("aggregate");

db.books.aggregate([
  {
    $lookup: {
      from: "author",
      localField: "author_id",
      foreignField: "_id",
      as: "author_details"
    }
  },
  {
    $addFields: {
      author_details: {
        $first:"$author_details"
      }
    }
  }
])