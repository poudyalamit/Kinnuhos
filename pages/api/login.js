import connectDB from "@/middleware/mongoose"
import User from "@/models/User";
var cryptoJS = require("crypto-js")
var jwt= require("jsonwebtoken");

const handler = async (req, res) => {
    if (req.method === 'POST') {

        let user = await User.findOne({ email: req.body.email })
        const bytes = cryptoJS.AES.decrypt(user.password, "secret123");
        const decryptPass = bytes.toString(cryptoJS.enc.Utf8);
        if (user) {
            if (req.body.email === user.email && req.body.password === decryptPass) {
                var token = jwt.sign({ success: true, email: user.email }, 'secret',{ expiresIn: '24h' });
                res.status(200).json({ success ,token});
            } else {
                res.status(400).json({ error: "Invalid Credentials" })
            }
        } else {
            res.status(400).json({ error: 'No user found' });
        }
    } else {
        res.status(500).json({ error: "This method is not allowed" })
    }
}

export default connectDB(handler)
