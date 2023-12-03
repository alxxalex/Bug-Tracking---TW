import express from 'express'
import cors from 'cors'
import { sequelize } from './sequelize.js'
import { User } from "./models/user.js";
import { Project } from "./models/project.js";
import { Bug } from "./models/bug.js";
import { usersRouter } from './Routes/usersRouter.js';


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors)

app.use('/api',usersRouter)

const serverPort = 5001

app.listen(serverPort, async () => {
    console.log(`Express web server running on port ${serverPort}`);

    try {
        User.belongsToMany(Project, {
            through: "user_assign",
            as: "projects",
            foreignKey: "project_id"
        })

        Project.belongsToMany(User, {
            through: "user_assign",
            as: "users",
            foreignKey: "user_id"
        })

        await sequelize.authenticate();
        console.log('Connection established');
    } catch (err) {
        console.log(err);
    }
})