const { gql } = require("apollo-server-micro");

const typeDefs = gql`
    type Query {
        user(id: ID!): User
        users: [User]
    }

    type User {
        id: ID
        fullname: String!
        email: String!
        password: String!
        token: String
    }

    type Mutation {
        login(input: LoginInput!): LoginResponse
        register(input: RegisterInput!): User!
    }
    
    type LoginResponse {
        user: User
        ok: Boolean!
        error: String
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input RegisterInput {
        fullname: String!
        email: String!
        password: String!
    }
`;

module.exports = typeDefs;