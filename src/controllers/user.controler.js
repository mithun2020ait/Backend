import {User} from '../model/user.model.js';

// Register user controller
const registerUser = async (req, res) => {
    try {
        const {userName, email, password} = req.body;

        // Validate input fields
        if(!userName || !email || !password) {
            return res.status(400).json({message: 'All fields are required.'});
        }

        // Check for existing user
        const existingUser = await User.findOne({email : email});

        if(existingUser) {
            return res.status(400).json({message: 'User with this email already exists.'});
        }

        // Create new user
        const createUser = await User.create({
            userName,
            email,
            password,
            loginStatus: false
        });
        res.status(201).json({
            message: 'User registered successfully.',
            user:{id: createUser._id, email: createUser.email, userName: createUser.userName}
        });
        
    } catch (error) {
        res.status(500).json({message: 'Server error. Please try again later.', error: 
            error.message });
    }
}

// Login user controller
const loginUser = async (req, res) => {
    try {
        //check if user exists
        const {email, password} = req.body;
        const user = await User.findOne({
            email: email
        });
        if(!user) {
            return res.status(404).json({message: 'User not found.'});
        }

        //compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials.'});
        }
        res.status(200).json({message: 'Login successful.',
         user: {
            id: user._id, email: user.email, userName: user.userName
         }
    });

    } catch (error) {
        res.status(500).json({message: 'Server error. Please try again later.', error: 
            error.message });
    }
}

//Logout user controller
const logoutUser = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({
            email
        });

        if(!user) {
            return res.status(404).json({message: 'User not found.'});
        }
        res.status(200).json({message: 'Logout successful.'});
    } catch (error) {
        res.status(500).json({message: 'Server error. Please try again later.', error:
            error.message });
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
};
   