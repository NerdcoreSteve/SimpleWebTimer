const
    express = require('express'),
    app = express(),
    port = 3001

app.use(express.static('public'))  
app.set('view engine', 'pug')
app.get('/', (req, res) => res.render('index'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
