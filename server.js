const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3002
const MongoClient = require('mongodb').MongoClient

const MONGODB_CONNECTION_STRING = "mongodb+srv://helloworld:bcitteam28@cluster0-r8cwn.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true"

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

// 通过邮箱来获取用户信息
app.post('/get_profile_obj_by_email', (req, res) => {
    console.log('get_profile_obj_by_email')

    console.log('user_email')
    user_email = req.user_email

    console.log(user_email)
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection("user")
                .findOne(
                    { email: user_email },
                )
                .then(result => {
                    console.log(result)
                })
        })

    res.end(res.send(req.body.user_role))
})


app.post('/get_wordlist_obj_by_name', (req, res) => {
    console.log('get_wordlist_obj_by_name')
    wordlist_name = req.wordlist_name

    console.log('wordlist_name')
    console.log(wordlist_name)

    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection(wordlist_name)
                .find()
                .toArray((err, result) => {
                    console.log(result)
                })
        })

    res.end(res.send(req.body.user_role))
})

app.post('/update_word_info_by_wordname', (req, res) => {
    console.log('update_word_info_by_wordname(ID)')
    wordlist_name = req.word_id

    console.log('wordlist_name')
    console.log(wordlist_name)

    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection(wordlist_name)
                .find()
                .toArray((err, result) => {
                    console.log(result)
                })
        })

    res.end(res.send(req.body.user_role))
})

// 查找整个数据库的所有内容
app.get('/return_all_the_unit_names', (req, res) => {
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection("wordlist_indices")
                .findOne()
                .then(result => {
                    console.log(result)
                    res.send(result)
                    res.end()
                })
        })
})

app.post('/get_word_list_by_list_name', (req, res) => {
    console.log("get_word_list_by_list_name")
    console.log(req.body)
    let list_name = req.body.list_name
    console.log(list_name)
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection(list_name)
                .find()
                .toArray((err,doc)=>{
                    console.log(doc)
                    res.send(doc)
                })
        })
})

app.get('/test', (req, res) => {
    console.log("get_word_list_by_list_name")
    console.log(req.body)
    let list_name = req.body.list_name
    console.log(list_name)
    MongoClient.connect(MONGODB_CONNECTION_STRING,
        {}
        , function (err, db) {
            if (err) throw err;
            var dbo = db.db("vocabulary_companion");
            dbo.collection("german_wordlist_A2")
                .find({}).toArray((err,doc)=>{
                    console.log(err)
                    console.log(doc)
                })
        })
})

app.post('/update_word_information_by_word_id', (req, res) => {
    console.log("update_word_information_by_word_id")
    console.log(req.body)
    
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))