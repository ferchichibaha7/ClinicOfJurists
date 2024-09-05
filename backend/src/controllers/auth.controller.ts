import {User} from "../models/User";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import _ from "underscore";
import jwt from "jsonwebtoken";
import { Role } from "../models/Role";
import { OAuth2Client } from 'google-auth-library';
import Payload from "../types/Payload";
import axios from 'axios';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export class authController {
  constructor() {}

  public currentUser = async (...params) => {
    const [req, res, next] = params;

    try {
      let user   = req.currentUser
      res.json({ message: "User retrieved", result: user  })
    } catch (err) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  
  };

  public async signup(...params) {
    const [req, res, next] = params;

    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      }

      // Extract user data from request body
      const { name, email, password, phone_number } = req.body;

      // Check for existing user with the same email
      const existingUser = await User.findOne({
        where: { email: email } as any
      });
      if (existingUser) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            existingUser.email === email ? { msg: "Email already in use" } : null,
          ].filter(Boolean),
        });
      }
      const userRole = await Role.findOne({ where: { name: 'USER' } as any });
     
      // Hash the password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

     
      const newUser = await User.create({
        name: name,
        email: email,
        phone_number:phone_number,
        password: hashedPassword,
        active:true,
        role_id: userRole.id,
      });

      // Send a success response
      res.status(HttpStatusCodes.CREATED).json({ message: "user created successfully." });
    } catch (err) {
      console.error(err);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
  }

  public login = async (...params) => {
    const [req, res, next] = params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = {};
          user = await User.findOne({ where:{ email : email }});
      if (!user) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Invalid Credentials"
            }
          ]
        });
      }
      const isMatch = bcrypt.compareSync(password, user['password']);

      if (!isMatch) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Invalid Credentials"
            }
          ]
        });
      }

      const payload: Payload = {
        id: user['id']
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: process.env.jwtExpiration },
        (err, token) => {
          if (err) throw err;
          let toret = {"token":token}
          res.json(toret);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  
  };

  
  public googleAuth = async (req, res) => {
    const { token: idToken } = req.body; // The ID token received from the frontend  
    try {
       // Verify the ID token with Google
    const ticket = await client.verifyIdToken({
      idToken, // Using the destructured idToken from req.body
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure this matches your Google client ID
    });
  
      const decodedToken = ticket.getPayload();
      const { email, name, picture,sub } = decodedToken;
  
      // Check if user exists in the database
      let user = await User.findOne({ where: { email } });
      
      if (!user) {
        // Create a new user if not found
        const userRole = await Role.findOne({ where: { name: 'USER' } });
        user = await User.create({
          name,
          email,
          password: '', // Google auth users won't have a local password
          picture,
          google_id:sub,
          active: true,
          role_id: userRole.id,
        });
      }
  
      // Generate a JWT for the authenticated user
      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
  
      // Send back the token and user details
      res.json({ token, decodedToken });
    } catch (error) {
      console.error("Error during Google authentication:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
  



  };
 

