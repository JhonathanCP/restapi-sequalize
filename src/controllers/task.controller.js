import TaskSchema from '../models/Task';

export async function createTask(req, res) {
    try {
        const { name, done, projectId } = req.body;
        console.log(req.body);
        const newTask = await TaskSchema.create({
            projectId,
            name,
            done
        }, {
                fields: ['projectid', 'name', 'done']
            });
        res.json({ 
            message: 'New Task created',
        });
    }
    catch (error) {
        console.log(error);
    }
};

export async function getTasks(req, res) {
    const tasks = await TaskSchema.findAll({
        attributes: ['id', 'projectid', 'name', 'done'],
        order: [
            ['id', 'DESC']
        ]
    });
    res.json({
        tasks
    });
}

export async function updateTask(req, res) {
    const { id } = req.params;
    const { projectid, name, done } = req.body;
    try {
        const task = await TaskSchema.findOne({
            attributes: ['name', 'projectid', 'done', 'id'],
            where: { id }
        });
        const updatedTask = await TaskSchema.update(
            { name, done, projectid },
            { where: { id } }
        )
        res.json({ message: 'Task Updated', updatedTask });
    } catch (e) {
        console.log(e);
    }
};

export async function deleteTask(req, res) {
    const { id } = req.params;
    try {
        const taskDeleted = await TaskSchema.destroy({
            where: { id }
        });
        res.json({
            message: 'Task Deleted'
        })
    } catch (e) {
        console.log(e);
    }
};

export async function getOneTask(req, res) {
    const { id } = req.params;
    try {
        const task = await TaskSchema.findOne({
            where: { id },
            attributes: ['id', 'projectid', 'name', 'done']
        });
        res.json({ task });
    } catch (e) {
        console.log(e);
    }
};

export async function getTaskByProject(req, res) {
    const { projectid } = req.params;
    try {
        const tasks = await TaskSchema.findAll({
            attributes: ['id', 'projectid', 'name', 'done'],
            where: { projectid }
        });
        res.json({
            tasks
        });
    } catch (e) {
        console.log(e);
    }
};