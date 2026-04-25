import { validateEmail, validatePassword, validatePhone, validateUsername } from "../utils/valid.mjs"
import { userModel } from '../models/userModel.mjs'
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import { SecretKey } from "../../config.mjs"

const registerUser = async (req, res) => {
    try {

        let { name, email, password, username, dob, gender, phone } = req.body
        // Logic for registering user

        // validate the input data
        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ message: 'Failed', error: 'Invalid password format' });
        }

        if (!validatePhone(phone)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        if (!validateUsername(username)) {
            return res.status(400).json({ error: 'Invalid username format' });
        }

        // Hash the password before saving to the database
        const saltRounds = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, saltRounds);




        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        console.log("Happeinag")

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password,
            username,
            dob,
            gender,
            phone
        });



        // Save user to database
        await newUser.save();

        // Return success response
        res.status(201).json({ message: 'User registered successfully', data: newUser });
    } catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).json({ error: error.message });
        } else if (error.message.includes("duplicate")) {
            return res.status(409).json({ error: 'User already exists' });
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }

    }
}

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body
        
        // Logic for logging in user
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        //console.log("Happeinag")

        // Generate JWT token
        const token = jsonwebtoken.sign({ userId: user._id, email: user.email },
            SecretKey, { expiresIn: '1h' });
        if (!token) {
            return res.status(500).json({ error: 'Failed to generate token' });
        }
        res.setHeader('Authorization', `Bearer ${token}`);

        // Return success response
        res.status(200).json({ message: 'User logged in successfully', data: user, token: token });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User profile retrieved successfully', data: user });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id
        const updateData = req.body
        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User profile updated successfully', data: updatedUser });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export { registerUser, loginUser, getUserProfile, updateUserProfile }