const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const app = express();

const users = require("./dummy_users");
const todos = require("./dummy_todos");

const AddressType = new GraphQLObjectType({
  name: "Address",
  description: "This represents an address",
  fields: () => ({
    street: { type: GraphQLNonNull(GraphQLString) },
    suite: { type: GraphQLNonNull(GraphQLString) },
    city: { type: GraphQLNonNull(GraphQLString) },
    zipcode: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents an user",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    address: { type: GraphQLNonNull(AddressType) },
    phone: { type: GraphQLNonNull(GraphQLString) },
    website: { type: GraphQLNonNull(GraphQLString) },
    todos: {
      type: new GraphQLList(TodoType),
      resolve: (user) => {
        return todos.filter((todo) => todo.userId === user.id);
      },
    },
  }),
});

const TodoType = new GraphQLObjectType({
  name: "Todo",
  description: "This represents a todo",
  fields: () => ({
    userId: { type: GraphQLNonNull(GraphQLInt) },
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    completed: { type: GraphQLBoolean },
    user: {
      type: UserType,
      resolve: (todo) => {
        return users.find((user) => user.id === todo.userId);
      },
    },
  }),
});

const rootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    todos: {
      type: new GraphQLList(TodoType),
      description: "List of Todos",
      resolve: () => todos,
    },
    todo: {
      type: TodoType,
      description: "A Single Todo",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => todos.find((todo) => todo.id === args.id),
    },
    users: {
      type: new GraphQLList(UserType),
      description: "List of Users",
      resolve: () => users,
    },
    user: {
      type: UserType,
      description: "A Single Users",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => users.find((user) => user.id === args.id),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addTodo: {
      type: TodoType,
      description: "Add a User",
      args: {
        userId: { type: GraphQLInt },
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
      },
      resolve: (parent, args) => {
        const todo = {
          id: todos.length + 1,
          userId: args.userId,
          title: args.title,
          completed: args.completed,
        };
        todos.push(todo);
        return todo;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: rootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
