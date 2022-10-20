import axios from "axios"
import dotenv from "dotenv"
import cookies from "next-cookies";
dotenv.config()
const EditLeave = async (req: any, res: any) => {
    console.log("req body >>>>>>> ", req?.body)
    const user = JSON.parse(req?.cookies?.user)
    const result = await axios({
        method: 'post',
        url: `${process.env.BACK_END_API}/leave/update/${req?.body?.id}`,
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            detail: req?.body?.detail,
            status: req?.body?.status,
            dragDate: req?.body?.dragDate,
            uptoDate: req?.body?.uptoDate,
            approver: req?.body?.approver,
            user_id: req?.body?.user_id,
            ltype_id: req?.body?.ltype_id
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

export default EditLeave

