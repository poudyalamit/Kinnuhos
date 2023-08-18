import connectDB from "@/middleware/mongoose"
import User from "@/models/User";

const handler = async (req, res) => {
    if (req.method === 'POST') {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            if (req.body.email === user.email && req.body.password === user.password) {
                res.status(200).json({ success: true });
            }else{
                res.status(400).json({ error : "No user found"})
            }
        } else {
            res.status(400).json({ error: 'Invalid credentals' });
        }
    } else {
        res.status(500).json({ error: "This method is not allowed" })
    }
}

export default connectDB(handler)
