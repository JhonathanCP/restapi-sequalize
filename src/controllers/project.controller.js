import ProjectSchema from '../models/Project';

export async function getAllProjects(req, res) {
    try {
        const allProjects = await ProjectSchema.findAll();
        res.json({
            data: allProjects
        });
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export async function getProjectById(req, res) {
    try {
        const Project = await ProjectSchema.findByPk(req.params.id);
        /* const Project = await ProjectSchema.findOne({
            where: id
        }); */
        res.json({
            data: Project
        });
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export async function createProject(req, res) {
    const { name, priority, description, deliverydate } = req.body;
    try {
        let newProject = await ProjectSchema.create({
            name,
            priority,
            description,
            deliverydate
        }, {
            fields: ['name', 'priority', 'description', 'deliverydate']
        });
        if (newProject) {
            res.json({
                message: 'Project created succesfully',
                data: newProject
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        })
    }
}

export async function deleteProject(req, res) {
    try {
        const deleteRowCount = await ProjectSchema.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            message: 'Project deleted successfully',
            count: deleteRowCount
        });
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}

export async function updateProject(req, res) {
    try {
        const { id } = req.params;
        const { name, priority, description, deliverydate} = req.body;
        /*
            const projects = await Project.Schema.findAll({
                attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
                where: {
                    id
                }
            });
            if(projects.lenght > 0) {
                projects.forEach(async project => {
                    await project.update({
                        name,
                        priority,
                        description,
                        deliverydate
                    });
                });
            }
         */
        const project = await ProjectSchema.update({
            name,
            priority,
            description,
            deliverydate
        }, {
            where: {
                id
            }
        });
        res.json({
            message: 'Project updated succesfully',
            data: project
        });
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong',
            data: {}
        });
    }
}