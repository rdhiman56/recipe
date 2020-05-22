const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data
var recipes = [
    { name: 'Halwa', genre: 'demo1', id: '1', authorId: '1' },
    { name: 'Puri', genre: 'demo2', id: '2', authorId: '2' },
    { name: 'Chole', genre: 'demo3', id: '3',authorId: '3'},
    { name: 'Broken Weat', genre: 'demo4', id: '3', authorId: '3' },
    { name: 'custurd', genre: 'dmo4', id: '5', authorId: '3' },
    { name: 'Milkshake', genre: 'demo5', id: '6', authorId: '3' },
];

var authors = [
    { name: 'xyz1', age: 44, id: '1' },
    { name: 'xyz2', age: 42, id: '2' },
    { name: 'xyz3', age: 66, id: '3' }
];

const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve(parent, args){
                return _.filter(recipes, { authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipe: {
            type: RecipeType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                // Code to get data from Database when request
                console.log(typeof(args.id));
                return _.find(recipes, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(authors, { id: args.id });
            }
        },
        recipes: {
            type: GraphQLList(RecipeType),
            resolve(parent, args){
                return recipes;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});