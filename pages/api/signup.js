import connectDB from "@/middleware/mongoose"
import User from "@/models/User";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let user = new User(req.body);
        await user.save();
        res.status(200).json({ success: "success" });
    } else {
        res.status(400).json({ error: 'This method is not allowed' });
    }

}

export default connectDB(handler)
