'use strict';
const {Seeder} = require('mongo-seeding');
const {mapUser, mapArticle, getRandomFirstName} = require('./util');
const path = require('path');

// db connection and settings
const connection = require('./config/connection');
let userCollection;
let articleCollection;
let studentCollection;
run();

async function run() {
  await connection.connect();
  await connection.get().dropCollection('users');
  await connection.get().dropCollection('articles');
  await connection.get().dropCollection('students');
  await connection.get().createCollection('users');
  await connection.get().createCollection('articles');
  await example10();

  userCollection = connection.get().collection('users');
  articleCollection = connection.get().collection('articles');
  studentCollection = connection.get().collection('students');

  await example1();
  await example2();
  await example3();
  await example4();
  await example5();
  await example6();
  await example7();
  await example8();
  await example9();
  await example11();
  await example12();
  await example13();
  await example14();
  await example15();
  await example16();
  await example17();
  await connection.close();
}

// #### Users

// - Create 2 users per department (a, b, c)
async function example1() {
  try {
    ['a', 'b', 'c'].concat(['a', 'b', 'c']).forEach(async dep => {
      await userCollection.insertOne(mapUser({department: dep}));
    });

    console.log(await userCollection.find({}).toArray());
  } catch (err) {
    console.error(err);
  }
}

// - Delete 1 user from department (a)

async function example2() {
  try {
    await userCollection.deleteOne({department: 'a'});
    console.log(await userCollection.find({department: 'a'}).toArray());
  } catch (err) {
    console.error(err);
  }
}

// - Update firstName for users from department (b)

async function example3() {
  try {
    await userCollection.updateMany(
      {department: 'b'},
      {
        $set: {
          firstName: getRandomFirstName()
        }
      }
    );

    console.log(await userCollection.find({department: 'b'}).toArray());
  } catch (err) {
    console.error(err);
  }
}

// - Find all users from department (c)
async function example4() {
  try {
    const users = await userCollection.find({department: 'c'}).toArray();
    console.log(users);
  } catch (err) {
    console.error(err);
  }
}

// ### Articles

// - Create 5 articles per each type(a, b, c)
async function example5() {
  try {
    await articleCollection.insertMany([
      ...new Array(5).fill(null).map(i => mapArticle({type: 'a'})),
      ...new Array(5).fill(null).map(i => mapArticle({type: 'b'})),
      ...new Array(5).fill(null).map(i => mapArticle({type: 'c'}))
    ]);
  } catch (err) {
    console.error(err);
  }
}

// - Find articles with type a, and update tag list with next value [tag1-a, tag2-a, tag3]
async function example6() {
  try {
    await articleCollection.updateMany(
      {type: 'a'},
      {
        $set: {
          tags: ['tag1-a', 'tag2-a', 'tag3']
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
}

// - Add tags [tag2, tag3, super] to other articles except articles from type a
async function example7() {
  try {
    await articleCollection.updateMany(
      {type: {$ne: 'a'}},
      {
        $set: {
          tags: ['tag2', 'tag3', 'super']
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
}

// - Find all articles that contains tags [tag2, tag1-a]
async function example8() {
  try {
    console.log(await articleCollection.find({tags: {$in: ['tag2', 'tag1-a']}}).toArray());
  } catch (err) {
    console.error(err);
  }
}

// - Pull [tag2, tag1-a] from all articles
async function example9() {
  try {
    await articleCollection.updateMany(
      {},
      {
        $pull: {
          tags: {
            $in: ['tag2', 'tag1-a']
          }
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
}

async function example10() {
  try {
    const config = {
      database: 'mongodb+srv://user:user@cluster0.mw6uy.mongodb.net/myFirstDatabase'
    };
    const seeder = new Seeder(config);
    const collections = seeder.readCollectionsFromPath(path.resolve('./data'), {
      transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
    });
    await seeder.import(collections);
  } catch (e) {
    console.error(e);
  }
}

// Find all students who have the worst score for homework, sort by descent
async function example11() {
  try {
    console.log(
      await studentCollection
        .aggregate([
          {$match: {'scores.type': 'homework'}},
          {
            $addFields: {
              homeworkOrder: {
                $filter: {
                  input: '$scores',
                  as: 's',
                  cond: {
                    $eq: ['$$s.type', 'homework']
                  }
                }
              }
            }
          },
          {$sort: {homeworkOrder: 1}},
          {$limit: 5},
          {$sort: {homeworkOrder: -1}}
        ])
        .toArray()
    );
  } catch (err) {
    console.error(err);
  }
}

// Find all students who have the best score for quiz and the worst for homework, sort by ascending
async function example12() {
  try {
    console.log(
      await studentCollection
        .aggregate([
          {
            $set: {
              quizScore: {
                $reduce: {
                  input: '$scores',
                  initialValue: 0,
                  in: {
                    $add: [
                      '$$value',
                      {
                        $cond: {
                          if: {$eq: ['$$this.type', 'quiz']},
                          then: '$$this.score',
                          else: 0
                        }
                      }
                    ]
                  }
                }
              }
            }
          },
          {
            $set: {
              homeworkScore: {
                $reduce: {
                  input: '$scores',
                  initialValue: 0,
                  in: {
                    $add: [
                      '$$value',
                      {
                        $cond: {
                          if: {$eq: ['$$this.type', 'homework']},
                          then: '$$this.score',
                          else: 0
                        }
                      }
                    ]
                  }
                }
              }
            }
          },
          {$sort: {quizScore: -1}},
          {
            $group: {
              _id: null,
              studentsList: {
                $push: {
                  _id: '$_id',
                  name: '$name',
                  quizScore: '$quizScore',
                  homeworkScore: '$homeworkScore'
                }
              }
            }
          },
          {
            $set: {
              bestQuizResults: {$slice: ['$studentsList', 5]}
            }
          },
          {$unwind: '$studentsList'},
          {
            $set: {
              _id: '$studentsList._id',
              name: '$studentsList.name',
              quizScore: '$studentsList.quizScore',
              homeworkScore: '$studentsList.homeworkScore',
              isBestQuiz: {$in: ['$studentsList', '$bestQuizResults']}
            }
          },
          {$unset: ['studentsList', 'bestQuizResults']},

          {$sort: {homeworkScore: 1}},
          {
            $group: {
              _id: null,
              studentsList: {
                $push: {
                  _id: '$_id',
                  name: '$name',
                  quizScore: '$quizScore',
                  homeworkScore: '$homeworkScore',
                  isBestQuiz: '$isBestQuiz'
                }
              }
            }
          },
          {
            $set: {
              worstHomeworkResults: {$slice: ['$studentsList', 5]}
            }
          },
          {$unwind: '$studentsList'},
          {
            $set: {
              _id: '$studentsList._id',
              name: '$studentsList.name',
              quizScore: '$studentsList.quizScore',
              homeworkScore: '$studentsList.homeworkScore',
              isBestQuiz: '$studentsList.isBestQuiz',
              isWorstHomework: {$in: ['$studentsList', '$worstHomeworkResults']}
            }
          },
          {$unset: ['studentsList', 'worstHomeworkResults']},

          {$match: {$or: [{isBestQuiz: true}, {isWorstHomework: true}]}},
          {$sort: {quizScore: 1, homeworkScore: 1}}
        ])
        .toArray()
    );
  } catch (e) {
    console.error(e);
  }
}

// Find all students who have the best score for quiz and exam
async function example13() {
  try {
    console.log(
      await studentCollection
        .aggregate([
          {
            $set: {
              quizScore: {
                $reduce: {
                  input: '$scores',
                  initialValue: 0,
                  in: {
                    $add: [
                      '$$value',
                      {
                        $cond: {
                          if: {$eq: ['$$this.type', 'quiz']},
                          then: '$$this.score',
                          else: 0
                        }
                      }
                    ]
                  }
                }
              }
            }
          },
          {
            $set: {
              examScore: {
                $reduce: {
                  input: '$scores',
                  initialValue: 0,
                  in: {
                    $add: [
                      '$$value',
                      {
                        $cond: {
                          if: {$eq: ['$$this.type', 'exam']},
                          then: '$$this.score',
                          else: 0
                        }
                      }
                    ]
                  }
                }
              }
            }
          },
          {$sort: {examScore: -1}},
          {
            $group: {
              _id: null,
              students: {
                $push: {
                  _id: '$_id',
                  name: '$name',
                  quizScore: '$quizScore',
                  examScore: '$examScore'
                }
              }
            }
          },
          {
            $set: {
              bestExamScores: {$slice: ['$students', 5]}
            }
          },
          {$unwind: '$students'},
          {
            $set: {
              _id: '$students._id',
              name: '$students.name',
              quizScore: '$students.quizScore',
              examScore: '$students.examScore',
              hasBestExamScore: {$in: ['$students', '$bestExamScores']}
            }
          },
          {$unset: ['students', 'bestExamScores']},
          {$sort: {quizScore: -1}},
          {
            $group: {
              _id: null,
              students: {
                $push: {
                  _id: '$_id',
                  name: '$name',
                  quizScore: '$quizScore',
                  examScore: '$examScore',
                  hasBestExamScore: '$hasBestExamScore'
                }
              }
            }
          },
          {
            $set: {
              bestQuizScores: {$slice: ['$students', 5]}
            }
          },
          {$unwind: '$students'},
          {
            $set: {
              _id: '$students._id',
              name: '$students.name',
              quizScore: '$students.quizScore',
              examScore: '$students.examScore',
              hasBestExamScore: '$students.hasBestExamScore',
              hasBestQuizScore: {$in: ['$students', '$bestQuizScores']}
            }
          },
          {$unset: ['students', 'bestQuizScores']},

          {$match: {$or: [{hasBestQuizScore: true}, {hasBestExamScore: true}]}}
        ])
        .toArray()
    );
  } catch (err) {
    console.error(err);
  }
}

// Calculate the average score for homework for all students
async function example14() {
  try {
    console.log(
      await studentCollection
        .aggregate([
          {
            $unwind: '$scores'
          },
          {$match: {'scores.type': 'homework'}},
          {
            $group: {
              _id: '',
              averageScore: {$avg: '$scores.score'}
            }
          },
          {
            $project: {
              _id: 0
            }
          }
        ])
        .toArray()
    );
  } catch (e) {
    console.error(e);
  }
}
// Delete all students that have homework score <= 60
async function example15() {
  try {
    const students = await studentCollection
      .aggregate([
        {
          $unwind: '$scores'
        },
        {
          $match: {'scores.type': 'homework', 'scores.score': {$gt: 60}}
        },
        {$out: 'students'}
      ])
      .toArray();

    console.log(await studentCollection.find().count());
  } catch (e) {
    console.error(e);
  }
}

// Mark students that have quiz score => 80
async function example16() {
  try {
    const students = await studentCollection
      .aggregate([
        {
          $set: {
            quizScore: {
              $reduce: {
                input: '$scores',
                initialValue: 0,
                in: {
                  $add: [
                    '$$value',
                    {
                      $cond: {
                        if: {$eq: ['$$this.type', 'quiz']},
                        then: '$$this.score',
                        else: 0
                      }
                    }
                  ]
                }
              }
            }
          }
        },
        {
          $set: {
            quizHigher80: {$gte: ['$quizScore', 80]}
          }
        }
      ])
      .toArray();
    console.log(students);
  } catch (e) {
    console.error(e);
  }
}

// Write a query that group students by 3 categories (calculate the average grade for three subjects):
// a => [0, 40), b => [40, 60), c => [60, 100]
async function example17() {
  try {
    const students = await studentCollection
      .aggregate([
        {
          $unwind: '$scores'
        },
        {
          $group: {
            _id: {id: '$id', name: '$name'},
            averageScore: {
              $avg: '$scores.score'
            }
          }
        },
        {
          $bucket: {
            groupBy: '$averageScore',
            boundaries: [0, 40, 60, 100],
            output: {
              students: {
                $push: '$_id'
              }
            }
          }
        },
        {
          $set: {
            category: {
              $switch: {
                branches: [
                  {
                    case: {$and: [{$gte: ['$_id', 0]}, {$lt: ['$_id', 40]}]},
                    then: 'a'
                  },
                  {
                    case: {$and: [{$gte: ['$_id', 40]}, {$lt: ['$_id', 60]}]},
                    then: 'b'
                  },
                  {
                    case: {$and: [{$gte: ['$_id', 60]}, {$lte: ['$_id', 100]}]},
                    then: 'c'
                  }
                ]
              }
            }
          }
        },
        {
          $project: {
            _id: 0
          }
        }
      ])
      .toArray();
    console.log(students);
  } catch (e) {
    console.error(e);
  }
}
