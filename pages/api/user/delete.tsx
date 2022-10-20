import axios from "axios"
import dotenv from "dotenv"
import cookies from "next-cookies";
dotenv.config()

const DeleteUser = async(req:any,res:any) => {
    const user = JSON.parse(req?.cookies?.user)
    const result = await axios({
        method: 'delete',
        url: `${process.env.BACK_END_API}/user/delete/${req?.body?.id}`,
        headers: { 
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
    }).catch((err) => {
        console.log("error :", err)
        res.status(500).json({
            success: false,
            data: {},
            message: err
        })
    })
    res.status(200).json({
        success: true,
        data: result?.config?.data,
    })
}

export default DeleteUser
