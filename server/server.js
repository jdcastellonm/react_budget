// production server
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// return index.html when refreshing urls
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// server port
app.listen(port, () => {
    console.log('server up');
})