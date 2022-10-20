import axios from "axios"
import dotenv from "dotenv"
import cookies from "next-cookies";
dotenv.config()
const EditUser = async(req:any,res:any) => {
    console.log("req body >>>>>>> ", req?.body)
    const user = JSON.parse(req?.cookies?.user)
    const result = await axios({
        method: 'post',
        url: `${process.env.BACK_END_API}/user/update/${req?.body?.id}`,
        headers: { 
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            user_id: req?.body?.user_id,
            name: req?.body?.name,
            lastname: req?.body?.lastname,
            position: req?.body?.position_id,
            department: req?.body?.department_id
        })
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

export default EditUser

