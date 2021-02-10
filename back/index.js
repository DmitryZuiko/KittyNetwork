const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const usersRouter = require('./routes/users.routes');
const postsRouter = require('./routes/posts.router');
const commentsRouter = require('./routes/comments.router');


const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter)

const start = async() => {
    try {
        await mongoose.connect(
            'mongodb+srv://DmitryZuiko:zd123@cluster0.gxzom.mongodb.net/network', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(5000, () => {
            console.log(`Example app listening at http://localhost:${5000}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();
