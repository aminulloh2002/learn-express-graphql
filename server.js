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

const todos = [
  { userId: 1, id: 1, title: "delectus aut autem", completed: false },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  { userId: 1, id: 3, title: "fugiat veniam minus", completed: false },
  { userId: 1, id: 4, title: "et porro tempora", completed: true },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
  {
    userId: 1,
    id: 6,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    completed: false,
  },
  {
    userId: 1,
    id: 7,
    title: "illo expedita consequatur quia in",
    completed: false,
  },
  {
    userId: 1,
    id: 8,
    title: "quo adipisci enim quam ut ab",
    completed: true,
  },
  {
    userId: 1,
    id: 9,
    title: "molestiae perspiciatis ipsa",
    completed: false,
  },
  {
    userId: 1,
    id: 10,
    title: "illo est ratione doloremque quia maiores aut",
    completed: true,
  },
  {
    userId: 1,
    id: 11,
    title: "vero rerum temporibus dolor",
    completed: true,
  },
  {
    userId: 1,
    id: 12,
    title: "ipsa repellendus fugit nisi",
    completed: true,
  },
  { userId: 1, id: 13, title: "et doloremque nulla", completed: false },
  {
    userId: 1,
    id: 14,
    title: "repellendus sunt dolores architecto voluptatum",
    completed: true,
  },
  {
    userId: 1,
    id: 15,
    title: "ab voluptatum amet voluptas",
    completed: true,
  },
  {
    userId: 1,
    id: 16,
    title: "accusamus eos facilis sint et aut voluptatem",
    completed: true,
  },
  {
    userId: 1,
    id: 17,
    title: "quo laboriosam deleniti aut qui",
    completed: true,
  },
  {
    userId: 1,
    id: 18,
    title: "dolorum est consequatur ea mollitia in culpa",
    completed: false,
  },
  {
    userId: 1,
    id: 19,
    title: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    completed: true,
  },
  {
    userId: 1,
    id: 20,
    title: "ullam nobis libero sapiente ad optio sint",
    completed: true,
  },
  {
    userId: 2,
    id: 21,
    title: "suscipit repellat esse quibusdam voluptatem incidunt",
    completed: false,
  },
  {
    userId: 2,
    id: 22,
    title: "distinctio vitae autem nihil ut molestias quo",
    completed: true,
  },
  {
    userId: 2,
    id: 23,
    title: "et itaque necessitatibus maxime molestiae qui quas velit",
    completed: false,
  },
  {
    userId: 2,
    id: 24,
    title: "adipisci non ad dicta qui amet quaerat doloribus ea",
    completed: false,
  },
  {
    userId: 2,
    id: 25,
    title: "voluptas quo tenetur perspiciatis explicabo natus",
    completed: true,
  },
  { userId: 2, id: 26, title: "aliquam aut quasi", completed: true },
  {
    userId: 2,
    id: 27,
    title: "veritatis pariatur delectus",
    completed: true,
  },
  {
    userId: 2,
    id: 28,
    title: "nesciunt totam sit blanditiis sit",
    completed: false,
  },
  { userId: 2, id: 29, title: "laborum aut in quam", completed: false },
  {
    userId: 2,
    id: 30,
    title:
      "nemo perspiciatis repellat ut dolor libero commodi blanditiis omnis",
    completed: true,
  },
  {
    userId: 2,
    id: 31,
    title: "repudiandae totam in est sint facere fuga",
    completed: false,
  },
  {
    userId: 2,
    id: 32,
    title: "earum doloribus ea doloremque quis",
    completed: false,
  },
  { userId: 2, id: 33, title: "sint sit aut vero", completed: false },
  {
    userId: 2,
    id: 34,
    title: "porro aut necessitatibus eaque distinctio",
    completed: false,
  },
  {
    userId: 2,
    id: 35,
    title: "repellendus veritatis molestias dicta incidunt",
    completed: true,
  },
  {
    userId: 2,
    id: 36,
    title: "excepturi deleniti adipisci voluptatem et neque optio illum ad",
    completed: true,
  },
  { userId: 2, id: 37, title: "sunt cum tempora", completed: false },
  { userId: 2, id: 38, title: "totam quia non", completed: false },
  {
    userId: 2,
    id: 39,
    title: "doloremque quibusdam asperiores libero corrupti illum qui omnis",
    completed: false,
  },
  {
    userId: 2,
    id: 40,
    title: "totam atque quo nesciunt",
    completed: true,
  },
  {
    userId: 3,
    id: 41,
    title:
      "aliquid amet impedit consequatur aspernatur placeat eaque fugiat suscipit",
    completed: false,
  },
  {
    userId: 3,
    id: 42,
    title: "rerum perferendis error quia ut eveniet",
    completed: false,
  },
  {
    userId: 3,
    id: 43,
    title: "tempore ut sint quis recusandae",
    completed: true,
  },
  {
    userId: 3,
    id: 44,
    title: "cum debitis quis accusamus doloremque ipsa natus sapiente omnis",
    completed: true,
  },
  {
    userId: 3,
    id: 45,
    title: "velit soluta adipisci molestias reiciendis harum",
    completed: false,
  },
  {
    userId: 3,
    id: 46,
    title: "vel voluptatem repellat nihil placeat corporis",
    completed: false,
  },
  {
    userId: 3,
    id: 47,
    title: "nam qui rerum fugiat accusamus",
    completed: false,
  },
  {
    userId: 3,
    id: 48,
    title: "sit reprehenderit omnis quia",
    completed: false,
  },
  {
    userId: 3,
    id: 49,
    title: "ut necessitatibus aut maiores debitis officia blanditiis velit et",
    completed: false,
  },
  {
    userId: 3,
    id: 50,
    title: "cupiditate necessitatibus ullam aut quis dolor voluptate",
    completed: true,
  },
  {
    userId: 3,
    id: 51,
    title: "distinctio exercitationem ab doloribus",
    completed: false,
  },
  {
    userId: 3,
    id: 52,
    title: "nesciunt dolorum quis recusandae ad pariatur ratione",
    completed: false,
  },
  {
    userId: 3,
    id: 53,
    title: "qui labore est occaecati recusandae aliquid quam",
    completed: false,
  },
  {
    userId: 3,
    id: 54,
    title: "quis et est ut voluptate quam dolor",
    completed: true,
  },
  {
    userId: 3,
    id: 55,
    title:
      "voluptatum omnis minima qui occaecati provident nulla voluptatem ratione",
    completed: true,
  },
  {
    userId: 3,
    id: 56,
    title: "deleniti ea temporibus enim",
    completed: true,
  },
  {
    userId: 3,
    id: 57,
    title: "pariatur et magnam ea doloribus similique voluptatem rerum quia",
    completed: false,
  },
  {
    userId: 3,
    id: 58,
    title: "est dicta totam qui explicabo doloribus qui dignissimos",
    completed: false,
  },
  {
    userId: 3,
    id: 59,
    title: "perspiciatis velit id laborum placeat iusto et aliquam odio",
    completed: false,
  },
  {
    userId: 3,
    id: 60,
    title: "et sequi qui architecto ut adipisci",
    completed: true,
  },
  {
    userId: 4,
    id: 61,
    title: "odit optio omnis qui sunt",
    completed: true,
  },
  {
    userId: 4,
    id: 62,
    title: "et placeat et tempore aspernatur sint numquam",
    completed: false,
  },
  {
    userId: 4,
    id: 63,
    title: "doloremque aut dolores quidem fuga qui nulla",
    completed: true,
  },
  {
    userId: 4,
    id: 64,
    title: "voluptas consequatur qui ut quia magnam nemo esse",
    completed: false,
  },
  {
    userId: 4,
    id: 65,
    title: "fugiat pariatur ratione ut asperiores necessitatibus magni",
    completed: false,
  },
  {
    userId: 4,
    id: 66,
    title: "rerum eum molestias autem voluptatum sit optio",
    completed: false,
  },
  {
    userId: 4,
    id: 67,
    title: "quia voluptatibus voluptatem quos similique maiores repellat",
    completed: false,
  },
  {
    userId: 4,
    id: 68,
    title: "aut id perspiciatis voluptatem iusto",
    completed: false,
  },
  {
    userId: 4,
    id: 69,
    title:
      "doloribus sint dolorum ab adipisci itaque dignissimos aliquam suscipit",
    completed: false,
  },
  {
    userId: 4,
    id: 70,
    title: "ut sequi accusantium et mollitia delectus sunt",
    completed: false,
  },
  {
    userId: 4,
    id: 71,
    title: "aut velit saepe ullam",
    completed: false,
  },
  {
    userId: 4,
    id: 72,
    title: "praesentium facilis facere quis harum voluptatibus voluptatem eum",
    completed: false,
  },
  {
    userId: 4,
    id: 73,
    title: "sint amet quia totam corporis qui exercitationem commodi",
    completed: true,
  },
  {
    userId: 4,
    id: 74,
    title: "expedita tempore nobis eveniet laborum maiores",
    completed: false,
  },
  {
    userId: 4,
    id: 75,
    title: "occaecati adipisci est possimus totam",
    completed: false,
  },
  { userId: 4, id: 76, title: "sequi dolorem sed", completed: true },
  {
    userId: 4,
    id: 77,
    title:
      "maiores aut nesciunt delectus exercitationem vel assumenda eligendi at",
    completed: false,
  },
  {
    userId: 4,
    id: 78,
    title: "reiciendis est magnam amet nemo iste recusandae impedit quaerat",
    completed: false,
  },
  { userId: 4, id: 79, title: "eum ipsa maxime ut", completed: true },
  {
    userId: 4,
    id: 80,
    title: "tempore molestias dolores rerum sequi voluptates ipsum consequatur",
    completed: true,
  },
  { userId: 5, id: 81, title: "suscipit qui totam", completed: true },
  {
    userId: 5,
    id: 82,
    title: "voluptates eum voluptas et dicta",
    completed: false,
  },
  {
    userId: 5,
    id: 83,
    title: "quidem at rerum quis ex aut sit quam",
    completed: true,
  },
  {
    userId: 5,
    id: 84,
    title: "sunt veritatis ut voluptate",
    completed: false,
  },
  { userId: 5, id: 85, title: "et quia ad iste a", completed: true },
  {
    userId: 5,
    id: 86,
    title: "incidunt ut saepe autem",
    completed: true,
  },
  {
    userId: 5,
    id: 87,
    title: "laudantium quae eligendi consequatur quia et vero autem",
    completed: true,
  },
  {
    userId: 5,
    id: 88,
    title: "vitae aut excepturi laboriosam sint aliquam et et accusantium",
    completed: false,
  },
  { userId: 5, id: 89, title: "sequi ut omnis et", completed: true },
  {
    userId: 5,
    id: 90,
    title: "molestiae nisi accusantium tenetur dolorem et",
    completed: true,
  },
  {
    userId: 5,
    id: 91,
    title: "nulla quis consequatur saepe qui id expedita",
    completed: true,
  },
  { userId: 5, id: 92, title: "in omnis laboriosam", completed: true },
  {
    userId: 5,
    id: 93,
    title: "odio iure consequatur molestiae quibusdam necessitatibus quia sint",
    completed: true,
  },
  {
    userId: 5,
    id: 94,
    title: "facilis modi saepe mollitia",
    completed: false,
  },
  {
    userId: 5,
    id: 95,
    title: "vel nihil et molestiae iusto assumenda nemo quo ut",
    completed: true,
  },
  {
    userId: 5,
    id: 96,
    title: "nobis suscipit ducimus enim asperiores voluptas",
    completed: false,
  },
  {
    userId: 5,
    id: 97,
    title: "dolorum laboriosam eos qui iure aliquam",
    completed: false,
  },
  {
    userId: 5,
    id: 98,
    title:
      "debitis accusantium ut quo facilis nihil quis sapiente necessitatibus",
    completed: true,
  },
  {
    userId: 5,
    id: 99,
    title: "neque voluptates ratione",
    completed: false,
  },
  {
    userId: 5,
    id: 100,
    title: "excepturi a et neque qui expedita vel voluptate",
    completed: false,
  },
];

const users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
    },
    phone: "1-463-123-4447",
    website: "ramiro.info",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    address: {
      street: "Hoeger Mall",
      suite: "Apt. 692",
      city: "South Elvis",
      zipcode: "53919-4257",
    },
    phone: "493-170-9623 x156",
    website: "kale.biz",
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    address: {
      street: "Skiles Walks",
      suite: "Suite 351",
      city: "Roscoeview",
      zipcode: "33263",
    },
    phone: "(254)954-1289",
    website: "demarco.info",
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    address: {
      street: "Norberto Crossing",
      suite: "Apt. 950",
      city: "South Christy",
      zipcode: "23505-1337",
      geo: [Object],
    },
    phone: "1-477-935-8478 x6430",
    website: "ola.org",
    company: {
      name: "Considine-Lockman",
      catchPhrase: "Synchronised bottom-line interface",
      bs: "e-enable innovative applications",
    },
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
    address: {
      street: "Rex Trail",
      suite: "Suite 280",
      city: "Howemouth",
      zipcode: "58804-1099",
      geo: [Object],
    },
    phone: "210.067.6132",
    website: "elvis.io",
    company: {
      name: "Johns Group",
      catchPhrase: "Configurable multimedia task-force",
      bs: "generate enterprise e-tailers",
    },
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
    address: {
      street: "Ellsworth Summit",
      suite: "Suite 729",
      city: "Aliyaview",
      zipcode: "45169",
      geo: [Object],
    },
    phone: "586.493.6943 x140",
    website: "jacynthe.com",
    company: {
      name: "Abernathy Group",
      catchPhrase: "Implemented secondary concept",
      bs: "e-enable extensible e-tailers",
    },
  },
  {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    address: {
      street: "Dayna Park",
      suite: "Suite 449",
      city: "Bartholomebury",
      zipcode: "76495-3109",
      geo: [Object],
    },
    phone: "(775)976-6794 x41206",
    website: "conrad.com",
    company: {
      name: "Yost and Sons",
      catchPhrase: "Switchable contextually-based project",
      bs: "aggregate real-time technologies",
    },
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    address: {
      street: "Kattie Turnpike",
      suite: "Suite 198",
      city: "Lebsackbury",
      zipcode: "31428-2261",
      geo: [Object],
    },
    phone: "024-648-3804",
    website: "ambrose.net",
    company: {
      name: "Hoeger LLC",
      catchPhrase: "Centralized empowering task-force",
      bs: "target end-to-end models",
    },
  },
];

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
