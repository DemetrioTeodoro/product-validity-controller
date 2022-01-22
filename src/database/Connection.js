const mongoose = require('mongoose');

const connection = async () => {
    let mongodbOptions = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        connectTimeoutMS: 10000
    };
    
    await mongoose.connect(process.env.URI, mongodbOptions);
    console.log('Database Connected...');
}

module.exports = connection;