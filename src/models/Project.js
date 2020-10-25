import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import TasksSchema from './Tasks';

const ProjectSchema = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT,
    },
    priority: {
        type: Sequelize.INTEGER,
    },
    description: {
        type: Sequelize.TEXT,
    },
    deliverydate: {
        type: Sequelize.DATE,
    }
}, {
    timestamps: false
});

ProjectSchema.hasMany(TasksSchema, {foreignKey: 'projectId', sourceKey: 'id'});
TasksSchema.belongsTo(ProjectSchema, {foreignKey: 'projectId', sourceKey: 'id'});

export default ProjectSchema;
