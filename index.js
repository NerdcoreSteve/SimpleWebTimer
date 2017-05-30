const
    express = require('express'),
    app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static('public'))  
app.set('view engine', 'pug')
app.get('/', (req, res) => res.render('index'))
app.listen(app.get('port'), () => console.log(`Example app listening on port ${app.get('port')}!`))
