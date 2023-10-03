require('dotenv').config()

const express = require('express')

const connectDB = require('./db/connect')

const authRoutes = require('./routes/auth')
const blogRoutes = require('./routes/blogs')
const auth = require('./auth/auth')

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use('/api/v1/blogs/auth',authRoutes)
app.use('/api/v1/blogs', auth, blogRoutes)



app.get('/', (req, res) => {

    res.send('<h1> Blog Api </h1>')

})



const start = async () =>{
try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(5000, ()=> {
        console.log('server running on machine 5000')
    
    }) 
} catch (error) {
  console.log(error)  
}
}

start()



