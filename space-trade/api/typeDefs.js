const { gql } = require("apollo-server-micro");

const typeDefs = gql`

    type Query {
        user(id: ID!): User
        users: [User]
        
        event(id: ID!): Event
        events(userId: ID!): [Event]

        eventsType: [EventType]
    }

    type User {
        id: ID
        fullname: String!
        email: String!
        password: String!
        token: String
    }

    type Event {
        id: ID
        userId: String!
        startDate: String!
        endDate: String!
        location: String!
        title: String!
        eventTypeId: String
        eventType: EventType
    }

    type EventType { 
        id: ID
        name: String!
    }

    type Mutation {
        login(input: LoginInput!): LoginResponse
        register(input: RegisterInput!): User!
        registerEvent(input: RegisterEvent!): EventResponse!
        registerEventType(input: RegisterEventType!): EventTypeResponse!
    }
    
    type LoginResponse {
        user: User
        ok: Boolean!
        error: String
    }

    type EventTypeResponse {
        eventType: EventType
        ok: Boolean!
        error: String    
    }

    type EventResponse {
        event: Event
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

    input RegisterEvent {
        userId: String!
        startDate: String!
        endDate: String!
        title: String!
        location: String! 
    }

    input RegisterEventType {
        name: String!
    }
`;

module.exports = typeDefs;