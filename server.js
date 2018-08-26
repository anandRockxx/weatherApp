const express = require('express');
const hbs = require('hbs');


const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('currentYear', () =>{
    return new Date().getFullYear()
})

app.set('view engine', 'hbs');

// app.use(express.static(__dirname + '/public'));


// app.get('/', (req, res) =>{
//     res.send('<h1>hii</h1>');
// })


// app.get('/sitemap', (req, res) => {
//     res.send('this is sitemap generator page');
// })

app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather App'
    })
})


app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle : 'about page',
    });
})


app.listen(port, () =>{
    console.log(`server started on port ${port}`);
});