const express = require("express");
const http = require("http");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers: require("./utils/helpers") });
// Activate when controllers are added.
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const cors = require('cors');
const socketIo = require('socket.io');



const app = express();
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = socketIo(server);

const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Set up sessions with cookies
const sess = {
  secret: process.env.DB_PASSWORD,
  cookie: {
    // Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(cors());

// Activate when mySQL is added.
app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// Activate when routes is created.
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
  });
});
