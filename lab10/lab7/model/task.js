const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema();
taskSchema.add({
    name: String,
    userId: String
});

taskSchema.methods.toDTO = function () {
    const obj = this.toObject();

    const dto = {
        id: obj._id,
        name: obj.name
    };

    return dto;
};

const Task = mongoose.model('Task', taskSchema);

exports.model = Task;