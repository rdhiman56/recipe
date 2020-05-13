const graphql = require('graphql');
const _ = require('lodash');
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// dummy data
var recipes = [
    { name: 'Halwa', genre: 'demo1', id: '1' },
    { name: 'Puri', genre: 'demo2', id: '2' },
    { name: 'Chole', genre: 'demo3', id: '3' },
];

const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipe: {
            type: RecipeType,
            args: {id: {type: GraphQLString}},
            resolve(parent,args){
                // Code to get data from Database when request
                return _.find(recipes, { id: args.id });
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});