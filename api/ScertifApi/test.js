// db.exams.find().forEach((e) => {
//   e.questions.forEach((q) => {
//     db.exams.updateOne(
//       { _id: e._id },
//       { $set: { "questions.$[el].QID": ObjectId() } },
//       { arrayFilters: [{ "el.question": q.question }] }
//   )
// });

// db.testc.updateOne(
//   { name: "youssef" },
//   { $set: { "roles.$[el].koko": ObjectId() } },
//   { arrayFilters: [{ "el.name": { $eq: "user" } }] }
// );

// add to each question its unique objectid
db.exams.find().forEach((e) => {
  e.questions.forEach((q) => {
    print(i++);
    db.exams.updateOne(
      { _id: e._id },
      { $set: { "questions.$[el].qid": ObjectId() } },
      { arrayFilters: [{ "el.question": q.question }] }
    );
  });
});

// exam: 5f8d98015f561d24267dd00a
// question: 5f9db70229f6c00046fee081
// user: 5f9e7f7b3931c850d03596c5

db.comments.insertMany([
  {
    userId: ObjectId("5f9e7f7b3931c850d03596c5"),
    comment: "blablabla1",
    exam: ObjectId("5f8d98015f561d24267dd00a"),
    question: ObjectId("5f9db70229f6c00046fee081"),
  },
  {
    userId: ObjectId("5f9e7f7b3931c850d03596c5"),
    comment: "blablabla2",
    parent: ObjectId("5f9eda02e2a5ee4c1ad7e492"),
    exam: ObjectId("5f8d98015f561d24267dd00a"),
    question: ObjectId("5f9db70229f6c00046fee081"),
  },
  {
    userId: ObjectId("5f9e7f7b3931c850d03596c5"),
    comment: "blablabla2",
    parent: ObjectId("5f9eda02e2a5ee4c1ad7e492"),
    exam: ObjectId("5f8d98015f561d24267dd00a"),
    question: ObjectId("5f9db70229f6c00046fee081"),
  },
  {
    userId: ObjectId("5f9e7f7b3931c850d03596c5"),
    comment: "blablabla3",
    parent: ObjectId("5f9eda2fe2a5ee4c1ad7e494"),
    exam: ObjectId("5f8d98015f561d24267dd00a"),
    question: ObjectId("5f9db70229f6c00046fee081"),
  },
]);
