require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');

const errorHandler = require('./middlewares/error-handler');
const userRouter = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json('Welcome!'));
app.use('/users', userRouter);

app.use((req, res, next) => res.sendStatus(404));
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log('Connection Error', err));
