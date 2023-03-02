const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect('mongodb+srv://Happy79:Happy79@cluster0.alaye2h.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log(`Mongodb connected to the server: ${data.connection.host}`);
        });
}

module.exports = connectDatabase;