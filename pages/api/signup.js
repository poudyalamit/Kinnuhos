import connectDB from "@/middleware/mongoose"
import User from "@/models/User";
var cryptoJS = require("crypto-js")

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let { name, email } = req.body;
        let user = new User({ name, email, password: cryptoJS.AES.encrypt(req.body.password, "secret123").toString() })
        await user.save();
        res.status(200).json({ success: "success" });
    } else {
        res.status(400).json({ error: 'This method is not allowed' });
    }

}

export default connectDB(handler)
