var express = require('express');
var fs = require('fs');
const multer  = require('multer')
const upload = multer({ dest: 'public/assets/img/team/' })

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
.put(upload.single('new_picture'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 

  
  let ext=req.file.mimetype.split("/")[1];
  console.log(ext);
  R.changeTeamPicture(req.headers.id, req.file.filename+"."+ext)
  .then(contents => res.status(200).json({success:true, contents:contents}))
  .catch(error => console.log("Error : "+error))
});


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
