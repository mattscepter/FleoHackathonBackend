const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/fleohackathon', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Connected Successfully');
  } catch (err) {
    console.log('DB Connection Failed');
    console.log(err, 'ERROR');
  }
};

module.exports = connection;
