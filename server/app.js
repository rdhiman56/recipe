const express = require('express');
const graphqlHTTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://cluster0-oaxs4.mongodb.net/test');
mongoose.connection.once('open', () => {
    console.log('connection has been made!');
}).on('error', (error) => {
    console.log('connection Error', error);
})

// Middlewear - bind express with graphql
app.use('/graphql', graphqlHTTTP({
    //schema
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listning port 4000');
});
