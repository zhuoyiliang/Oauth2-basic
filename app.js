const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));



//#region | ---------------------------------------| vjs {
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//#endregion }

//#region | ---------------------------------------| 首页 {
// app.get('/ejs', (req, res) => {
//     const data = { message: 'Hello from the server!' };
//     res.render('index', data);
// });

//#endregion }


//#region | ---------------------------------------| oauth2 回调 {
const require1 = require('./routes/oauth2-token-uri');

app.use(require1);

//#endregion }


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})