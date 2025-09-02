const User = require('../models/user-model');
 // 
const bcrypt = require('bcryptjs');

const home = async() =>{
try {
    res.status(200).send('Welcome to the Authentication API using Controllers Again!');
} catch (error) {
    res.status(400).send("There is an Error!")
}
}

const registration = async (req, res) => {
  try {
    console.log("Incoming registration body:", req.body);

    const { username, email, phone, password } = req.body;

    // 1️⃣ Manual field check (extra safety even with Zod)
    if (!username || !email || !phone || !password) {
      return res.status(422).json({
        message: "Validation Failed",
        errors: [
          { field: "username", message: !username ? "Username is required" : null },
          { field: "email", message: !email ? "Email is required" : null },
          { field: "phone", message: !phone ? "Phone is required" : null },
          { field: "password", message: !password ? "Password is required" : null }
        ].filter(e => e.message !== null)
      });
    }

    // 2️⃣ Check if email is already taken
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
        field: "email"
      });
    }

    // 3️⃣ Hash password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4️⃣ Create user
    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hashedPassword
    });

    // 5️⃣ Check if generateAuthToken exists
    let token = null;
    if (typeof userCreated.generateAuthToken === "function") {
      token = await userCreated.generateAuthToken();
    }

    // 6️⃣ Success response
    res.status(201).json({
      message: "Registration Successful!",
      user: {
        id: userCreated._id,
        username: userCreated.username,
        email: userCreated.email,
        phone: userCreated.phone
      },
      token
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Registration Failed",
      error: error.message
    });
  }
};





const login = async(req, res) =>{
    try {
        const { email, password } = req.body;

        // Check if user exists
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).send("User does not exist!");
        }
        

        console.log("Type of login password:", typeof password);
        console.log("Type of stored hash:", typeof userExist.password);
        console.log("Are they equal (plain):", password === userExist.password);


        // Check if password matches
        const isMatch = await bcrypt.compare(password, userExist.password);

        if (isMatch) {
            // Generate token
            res.status(200).json({
                msg: "Login Successful!",
                token : await userExist.generateAuthToken(),
                userId: userExist._id.toString()
            });
        } 
        
        else {
            res.status(400).send("Invalid password!");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("There is an Error while Login!");
    }
}


module.exports = { home, registration, login };
