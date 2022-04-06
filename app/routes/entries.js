'use strict';
const createCSV = require('../utils/util')

const express = require('express');
const router = express.Router({mergeParams: true});
const Entry = require('../models/entry');

router.get('/', (request, response) => {
  let csvContent = null;
  Entry.find().lean().exec((err, entries) => {
    if (err) {
      console.log(err);
    }

    if (null != entries) {
      const parsedEntries = JSON.parse(JSON.stringify(entries));
      console.log("parsedEntries", parsedEntries);
      const allRecords = parsedEntries.map(entry => {
        const username = entry.username;
        const questions = entry.questions;
        console.log("username", username);
        console.log("questions", questions);
        const result = [username];
        let count = 0;
        for (let i = 0; i < 36; i++) {
          if (count < 10 && i + 1 === questions[count].qid) {
            result.push(questions[count].scale);
            count++;
          } else {
            result.push('NA');
          }
        }
        return result;
      })


      csvContent = createCSV(allRecords);
      response.send(csvContent);
    }

  })


});

// router.get('/:id', (request, response) => {
//
//   const { id } = request.params;
//
//   Entry.findOne({ _id: id }, (err, res) => {
//     if (err) {
//       console.error(err);
//       return response.sendStatus(500);
//     }
//     response.send(res);
//   });
// });

router.post('/', (request, response) => {

  console.log(request.body);

  const {username, options} = request.body;
  if (!username || !options){
    return response.sendStatus(400);
  }

  const entry = new Entry({
    username: username,
    questions: options
  });

  // const task = new Task({ name, desc });
  entry.save()
    .then(res => response.send(res))
    .catch(e => {
      console.error(e);
      response.sendStatus(500);
    });
});

// router.put('/:id', async (request, response) => {
//
//   const { id } = request.params;
//   const { name, desc } = request.body;
//
//   if (!name && !desc) return response.sendStatus(400);
//
//   Entry.findOneAndUpdate({ _id: id }, { name, desc })
//     .then(res => response.send(res))
//     .catch(e => {
//       console.error(e);
//       response.sendStatus(500);
//     });
// });
//
router.delete('/:id', async (request, response) => {
  console.log(request);
  const { id } = request.params;
  console.log(id);
  Entry.deleteOne({ _id: id })
    .then(() => response.sendStatus(200))
    .catch(e => {
      console.error(e);
      response.sendStatus(500);
    });
});

module.exports = router;
