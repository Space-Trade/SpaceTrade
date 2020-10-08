const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "superJWTSecret";
const CONNECTION_STRING = process.env.CONNECTION_STRING || `mongodb+srv://dbAdmin:dbAdmin123@cluster0.ggr9w.mongodb.net/Cluster0?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const User = mongoose.model("User", {
    fullname: String,
    email: String,
    password: String
});

const Event = mongoose.model("Event", {
    eventTypeId: String,
    userId: String,
    startDate: String,
    endDate: String,
    location: String,
    title: String
});

const EventType = mongoose.model("EventType", {
    name: String
});

const resolvers = {
    Query: {
        user: (_, args) => {
            return User.findById(args.id);
        },
        event: (_, args) => {
            return Event.findById(args.id);
        },
        events: (_, args) => {
            return Event.find({userId: args.userId});
        },
        users: () => User.find(),
        eventsType: () => EventType.find()
    },
    Event: {
        eventType(parent) {
            return EventType.findOne({ id: parent.eventTypeId });
        }
    },
    Mutation: {
        login: async (_, { input }) => { 
            const user = await User.findOne({
                email: input.email, 
                password: input.password
            });
            if (user === null) {
                return {
                    ok: false,
                    error: "User not found"
                };
            }
            else {
                const { _id, email, fullname } = user;
                const token = jwt.sign({ _id, email, fullname }, JWT_SECRET);
                user.token = token;
                return {
                    ok: true,
                    user,
                }
            }
        },      
        register: async (_, { input }) => {
            const user = await new User(input).save();
            const { _id, email, fullname } = user;
            const token = jwt.sign({ _id, email, fullname }, JWT_SECRET);
            user.token = token;
            return user;
        },
        registerEvent: async (_, { input }) => {
            const eventCreated = await Event.findOne({
                startDate: input.startDate,
                endDate: input.endDate,
                userId: input.userId,
                title: input.title
            });
            if(eventCreated === null) {
                const event = new Event(input);
                event.save();
                return {
                    ok: true,
                    event: event
                };
            }
            else {
                return {
                    ok: false,
                    error: "Event already exist"
                };
            } 
        },
        registerEventType: async (_, { input }) => {
            const eventTypeCreated = await EventType.findOne({
                name: input.name
            });
            if( eventTypeCreated === null) {
                const eventType = new EventType(input);
                eventType.save();
                return {
                    ok: true,
                    eventType: eventType
                };
            }
            else {
                return {
                    ok: false,
                    error: "Event Type " + eventTypeCreated.name + " already exist"
                };
            }
        }
    }
};

module.exports = resolvers;
