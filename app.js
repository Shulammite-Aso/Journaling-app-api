const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/journalDB", {useNewUrlParser: true, useUnifiedTopology: true});

const journalSchema = {
  title: String,
  content: String
};

const Journal = mongoose.model("Journal", journalSchema);

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Requests Targetting all Journals

app.route("/journals")

.get(function(req, res){
  Journal.find(function(err, foundJournals){
    if (!err) {
      res.send(foundJournals);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){

  const newJournal = new Journal({
    title: req.body.title,
    content: req.body.content
  });

  newJournal.save(function(err){
    if (!err){
      res.send("Successfully added a new Journal.");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res){

  Journal.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all Journals.");
    } else {
      res.send(err);
    }
  });
});

// Requests Targetting A Specific Journal

app.route("/journals/:journalTitle")

.get(function(req, res){

  Journal.findOne({title: req.params.JournalTitle}, function(err, foundJournal){
    if (foundJournal) {
      res.send(foundJournal);
    } else {
      res.send("No Journals matching that title was found.");
      console.log(req.params.JournalTitle);
    }
  });
})

.put(function(req, res){

  Journal.update(
    {title: req.params.journalTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Successfully updated the selected journal.");
      }
    }
  );
})

.patch(function(req, res){

  Journal.update(
    {title: req.params.journalTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully updated journal.");
      } else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res){

  Journal.deleteOne(
    {title: req.params.journalTitle},
    function(err){
      if (!err){
        res.send("Successfully deleted the corresponding journal.");
      } else {
        res.send(err);
      }
    }
  );
});



app.listen(8000, function() {
  console.log("Server started on port 8000");
});
