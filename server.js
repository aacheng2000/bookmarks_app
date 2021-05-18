//const app = express();
const Sequelize = require ('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/db');

//conn.define(Model, {
const Model = conn.define('Model', {
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
}
	//model_properties_here
);

const syncAndSeed = async()=> {
//  await conn.sync({ force:true });
  await Model.create( {
                        name: 'LinkedIn',
                        URL: 'http://www.linkedin.com',
                        category: 'jobs'
                      })
  await Model.create( {
	                name: 'Indeed',
	                URL: 'http://www.indeed.com',
	                 category: 'jobs'
                       })
}



const init = async()=> {
  try {
     await conn.authenticate();
   //  await syncAndSeed();
     console.log(await User,findAll());
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
