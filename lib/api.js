var express = require('express');
var fs = require('fs');
var repo = require('../lib/repo');
var router = express.Router();

let R = new repo();

R.init();

router.route('/contents')
.get((req, res, next) => {
  R.getContents()
  .then(contents => res.status(200).json({success:true, contents:contents}))
  .catch(error => console.log("Error : "+error))
})
.put((req,res,next) => {
  R.changeContent(req.body.id, req.body.content)
  .then(contents => res.status(200).json({success:true, contents:contents}))
  .catch(error => console.log("Error : "+error))  
})


router.route('/team')
.get((req, res, next) => {
  R.getTeam()
  .then(contents => res.status(200).json({success:true, contents:contents}))
  .catch(error => console.log("Error : "+error))
})
.put((req, res, next) => {
  R.changeTeam(req.body)
  .then(contents => res.status(200).json({success:true, contents:contents}))
  .catch(error => console.log("Error : "+error))
})

router.route('/team/picture')
.put((req, res, next) => {
  fs.writeFile("img.jpg", req.body, "binary", (error) => {
    if(error) console.log(error);
    console.log("File scritto correttamente!");
  })
})


router.route('/courses')
.get((req, res, next) => {
  R.getCourses()
  .then(contents => res.status(200).json({success:true, contents:contents}))
  .catch(error => console.log("Error : "+error))
})
.put((req, res, next) => {
  R.changeCourses(req.body.id, req.body.name, req.body.shortDesc)
  .then(contents => res.status(200).json({success:true, contents:contents}))
  .catch(error => console.log("Error : "+error))
})


module.exports = router;
