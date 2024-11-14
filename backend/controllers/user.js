import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user.js';

import validateUsername from '../utils/validateUsername.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    register: async (req, res) => {
        const { username, email, password, rePassword } = req.body;
        try {
            //check if user exists
            const userExists = await User.findOne({ email });

            if (userExists) {
                return res.status(400).json({
                    message: 'User already exists. Please login'
                });
            }

            //validate username, email, password, check if passwords match
            const isValidEmail = validateEmail(email);
            const isValidUsername = validateUsername(username);
            const isValidPassword = validatePassword(password);
            const doPasswordsMatch = matchPasswords(password, rePassword);

            if (
                isValidEmail &&
                isValidUsername &&
                isValidPassword &&
                doPasswordsMatch
            ) {
                //hash password
                const hashedPassword = hashPassword(password);

                //create a new user
                const newUser = new User({
                    email,
                    username,
                    password: hashedPassword
                });
                await newUser.save();
                res.status(201).json({
                    message: 'User created successfully',
                    user: newUser
                });
            } else {
                res.status(400).json({
                    message: 'Invalid email, password or username'
                });
            }
        } catch (err) {
            res.status(500).json({ message: `Server error: ${err.message}` });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            //check if user already exists
            const userExists = await User.findOne({ email });

            if (userExists) {
                //check passwords
                bcrypt.compare(
                    password,
                    userExists.password,
                    (err, isValid) => {
                        if (err) {
                            return res
                                .status(500)
                                .json({ message: err.message });
                        }

                        if (isValid) {
                            //create token
                            const token = jwt.sign(
                                { user: userExists },
                                process.env.TOKEN_SECRET
                            );

                            //create cookie
                            res.cookie('token', token, { httpOnly: true });

                            res.status(200).json({
                                id: userExists._id,
                                username: userExists.username,
                                message: 'User logged successfully'
                            });
                        } else {
                            res.status(400).json({
                                message: 'Invalid credentials, please try again'
                            });
                        }
                    }
                );
            } else {
                res.status(400).json({
                    message: 'User does not exist. Please register.'
                });
            }
        } catch (err) {
            res.status(500).json({ message: `Server error: ${err.message}` });
        }
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully!' });
    }
};

export default userControllers;
