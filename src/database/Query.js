const mongoose = require('mongoose');

class Query {

    constructor(model) {
        this.model = model;
    }

    async find() {
        return await this.model.find();
    }
    
    async findOne() {
        return await this.model.findOne();
    }
    
    async findOneWithFilter({ ...props }) {
        return await this.model.findOne({ ...props });
    }

    async findById(id) {
        return this.model.findById({ _id: mongoose.Types.ObjectId(id) });
    }

    async saveOrUpdate(object) {
        if (object.id) {
            return await this.model.updateOne({ _id: mongoose.Types.ObjectId(object.id) },  { $set: { ...object } });
        }
        return await this.model.create({ ...object });
    }

    async delete(id, object) {
        if (id) {
            const deleted = await this.model.deleteOne({ _id: mongoose.Types.ObjectId(id) });
            return deleted.deletedCount;
        }
        return await this.model.deleteOne({ ...object });
    }
}

module.exports = Query;