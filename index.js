const express = require("express");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const app = express();

const people = [
  { id: "wdwefefewc", email: "john@gmail.com", name: "John" },
  { id: "uikiukujuiku", email: "Kim@gmail.com", name: "Kim" }
];
const schema = buildSchema(`
    type Query {
        user: [User!]!
    }

    type User{
        id:ID!
        email:String
        name:String
    }

    type Mutation{
        addUser(email:String!, name:String!):User
    }
`);

const root = {
  user: () => people,
  addUser: args => {
    const p = {
      id: "cffcedede",
      email: args.email,
      name: args.name
    };
    people.push(p);
    return p;
  }
};

app.use(
  "/graphql",
  graphqlHttp({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(3000, () => console.log("listening on port 3000"));
