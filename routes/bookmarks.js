const router = require('express').Router();
const db = require('../db')
const Bookmarker = require('../server')





//Express statements
router.get('/bookmarks/:id', async(req,res,next)=>{
  try{
res.send('aaa' + Bookmarker)
const bookmarkers = await Bookmarker.findAll()
let text = '<ul>'
  for(let i = 0;i<bookmarkers.length;i++) {
  	if(bookmarkers[i].category === req.params.id){
		text+=`<ul><a href = "${bookmarkers[i].URL}">${bookmarkers[i].name}</ul>`
	}
  }
	res.send(text + '</ul>')
  }
  catch(ex){
    next(ex)
  }
})

//Express statements
router.get('/', async(req,res,next)=> {
  try{
  res.redirect('/bookmarks')
  }
  catch(ex){
    next(ex);
  }
})

router.get('/bookmarks', async(req,res,next)=>{
  try{
  const bookmarkers = await Bookmarker.findAll()

  const obj = {}
  for(let i = 0;i<bookmarkers.length;i++) {
  	if(obj[bookmarkers[i].category] === undefined) {obj[bookmarkers[i].category]=0}
	obj[bookmarkers[i].category]++
  }

  text = ''
  for (const [key,value] of Object.entries(obj)) {
    text += `<a href = "/bookmarks/${key}">${key} (${value})</a><br>`
  }

  res.send(text)}
  catch(ex){
  	next(ex);
  }
 })
module.exports = router
