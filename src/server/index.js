const hapi = require('hapi');
const mongoose = require('mongoose');
const { database } = require('./constants');
const { User } = require('./models');


const server = hapi.server({
  port: 4000,
  host: 'localhost',
  routes: {
    cors: true,
  },
});

mongoose.connect(`mongodb://${database.user.name}:${database.user.password}@${database.url}:${database.port}/${database.name}`, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.once('open', () => {
  console.log('Database connection established...');
});
mongoose.connection.on('error', (error) => {
  console.log('What is this?', error);
});

const init = async () => {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: () => '<h1>HOL</h1>',
    },
    {
      method: 'POST',
      path: '/user',
      handler: (request, h) => {
        const { payload } = request;
        const { userName } = payload;

        if (!userName) {
          return h.response({ status: 'fail', message: 'Username is needed...' }).code(400);
        }

        return User.findOne({ name: userName })
          .then((userDocument) => {
            console.log(userDocument);
            if (!userDocument) {
              const newUser = new User({ name: userName });
              return newUser.save();
            }
            return h.response({ ...userDocument._doc, existing: true }); // eslint-disable-line
          })
          .catch((error) => {
            console.log({ error });
            return h.response(error).code(500);
          });
      },
    },
    {
      method: 'PUT',
      path: '/user/settings',
      handler: (request, h) => {
        const { payload } = request;
        const { userName, startDate, endDate, opinion } = payload;

        console.log({ payload });

        if (!userName || !startDate || !endDate) {
          return h.response({ status: 'fail', message: 'We need some info...' }).code(400);
        }

        return User.findOneAndUpdate(
          { name: userName },
          { settings: { startDate, endDate, opinion } },
        )
          .then((userDocument) => {
            console.log({ userDocument });
            return h.response(userDocument);
          })
          .catch((error) => {
            console.log({ error });
            return h.response(error).code(500);
          });
      },
    },
  ]);

  await server.start();
  console.log(`up and running at ${server.info.uri}`);
};

init();
