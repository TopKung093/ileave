import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const Login = async(req:any,res:any) => {
    
    const result:any = await axios({
        
        method: 'post',
        url: `${process.env.BACK_END_API}/login`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({username: req?.body?.username, password: req?.body?.password}),
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
        data: JSON.parse(result?.data),
    })
}

export default Login
