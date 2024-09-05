import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";

import { sequelize, connectAuthenticate } from "../config/database";
import user from "./routes/api/user";
import auth from "./routes/api/auth";
import { User } from "./models/User";
import { Role } from "./models/Role";

const app = express();

// Connect to DB
connectAuthenticate();
sequelize.sync({logging:false}).then(async res=>{
  console.log("sync done");
  await createRolesAndAdminIfNotExist();

});

// Express configuration
app.use(cors());
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", auth);
app.use("/api/user", user);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);












// create admin if not exist on start server
///////////////////////////////////////////
async function createRolesAndAdminIfNotExist(): Promise<void> {
  const rolesToCreate = [
    { name: 'ADMIN' },
    { name: 'STUDENT' },
    { name: 'USER' }

  ];

  try {
    // Create roles if they don't exist
    for (const roleData of rolesToCreate) {
      const existingRole = await Role.findOne({ where: { name: roleData.name } as any });
      if (!existingRole) {
        await Role.create(roleData);
        console.log(`Role '${roleData.name}' created.`);
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

      // Create admin user
      const adminData = {
        name: 'marwa',
        password: hashedPassword,
        email:'marwabarhoumi@gmail.com',
        phone_number:'29204755',
        active:true,
        role_id: 1, // Assuming role_id 1 represents the admin role
      };

    const existingAdmin = await User.findOne({ where: { name: adminData.name } as any });
    if (!existingAdmin) {
      await User.create(adminData);
      console.log('Admin user created.');
    } 
  } catch (error) {
    console.error('Error creating roles and admin:', error);
  }
}














export default server;
