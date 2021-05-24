const express = require('express')
const methodOverride = require('method-override')
const path = require('path')
const app = express()

//app.use(require('express').urlencoded({extended:false}));
//const middleware = require('method-override')('_method');
//app.use(middleware);
app.use(methodOverride('_method'))


// Three Sequelize statmenets

const Sequelize = require ('sequelize');

const { STRING } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/db');

// Get data from db.js
const db = require('./db');

//Express statements
app.delete('/bookmarks/:id', async(req, res, next)=> {
	try{
	//	const bookmarkers = await Bookmarker.findAll()
	//	await bookmarkers[req.params.id].destroy();
	
		const bm = await Bookmarker.findByPk(req.params.id)
		await bm.destroy()

		res.redirect("/");
	}
	catch(ex){
		next(ex);
	}
});

//Express statements
app.get('/bookmarks/:id', async(req,res,next)=>{
  try{
const bookmarkers = await Bookmarker.findAll()
let text = '<ul>'
  for(let i = 0;i<bookmarkers.length;i++) {
  	if(bookmarkers[i].category === req.params.id){
	text+=`<li><form method='POST' action='/bookmarks/${bookmarkers[i].id}?_method=DELETE'>
	<button>x</button>
		<a href = "${bookmarkers[i].URL}">${bookmarkers[i].name}</li>`
}

}
res.send(text + '</ul>')
}
catch(ex){
next(ex)
}
})

//Express statements
app.get('/', async(req,res,next)=> {
try{
res.redirect('/bookmarks')
}
catch(ex){
next(ex);
}
})

app.get('/bookmarks', async(req,res,next)=>{
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
  text +=`<form method='POST' action='/bookmarks'>
        <label for="bname">Name:</label>
 	<input type = 'text' id="bname" name="bname"><br>
 	<label for="bcategory">Category:</label>
	<input type = 'text' id="bcategory" name = "bvategory"><br>
	<label for="burl">URL:</label>
	<input type = "text" id="burl" name = "burl"><br>
	<button>Create</button>

  </form>
		`
 res.send(text)}
  catch(ex){
  	next(ex);
  }
 })


app.get('/bookmarks/music', async(req, res, next)=> {
  try {
    res.send('music')
  }
  catch(ex){
    next(ex);
  }
})

// Define Table Structure
const Bookmarker = conn.define('bookmarker', {
         name: {
	  type: STRING,
	  allowNull: false
	},
	URL: {
	  type: STRING,
	  allowNull: false
	},	
	category: {
	  type: STRING,
	  allowNull: false
	}
});

// Seed some data
const syncAndSeed = async()=> {
  await conn.sync({force:true}) //Force Sync
  await Bookmarker.create( {
                        name: 'LinkedIn',
                        URL: 'http://www.linkedin.com',
                        category: 'jobs'
                      },
	  {
	                name: 'Indeed',
	                URL: 'http://www.indeed.com',
	                 category: 'jobs'
                       })
   console.log(db.data[3])  
   await Bookmarker.create(db.data[4])
   await Bookmarker.create(db.data[5])
 //  for(let i=0;i<db.data.length;i++) {
 //    await Bookmarker.create(db.data[i])
 //  }
    Promise.all(db.data.map(name=> Bookmarker.create(name) )) // gives me array of functions
}



const init = async()=> {
  try {
     await conn.authenticate();
     await syncAndSeed();
     console.log(await Bookmarker.findAll());
     
     //Two lines for express PORT
     const port = process.env.PORT || 3000;
     app.listen(port, ()=> console.log(`listening on port ${port}`))
  }
  catch(ex) {
    console.log(ex);
  }
}


init();

//app.listen(8000, ()=> {});
//app.get('/', (req, res, next)=> {
  // do something here
//})



//YourModel.create(an_object_with_attributes_for_model_instance)
