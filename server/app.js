const express = require('express');
const graphqlHTTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// Middlewear - bind express with graphql
app.use('/graphql', graphqlHTTTP({
    //schema
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listning port 4000');
});
