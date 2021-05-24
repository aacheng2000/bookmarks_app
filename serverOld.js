const express = require('express').Router();
const path = require('path')
const app = express()
const routes = require("./routes/bookmarks")


// Three Sequelize statmenets

const Sequelize = require ('sequelize');

const { STRING } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/db');

// Get data from db.js
const db = require('./db');

// Expres

app.get('/bookmarks', require('./routes/bookmarks'));


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
     //console.log(await Bookmarker.findAll());
     
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


//Y/ourModel.create(an_object_with_attributes_for_model_instance)

