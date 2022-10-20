import { Button, Checkbox, Form, Input, Row, Image, Layout, Col, Card, Space, Avatar, Typography, } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const { Header, Content, Footer, Sider } = Layout;
interface IProps {
    user: any
}
const HeadComponent: React.FC<IProps> = (props) => {
    const router = useRouter()
    return (
        <><Row justify="start" style={{ background: '#064595', height: '70px', paddingTop: '10px' }}>
            <Colstyled span={2} style={{ textAlign: 'center' }}><img src="../images/LogoW.png" width='45%' /></Colstyled>
            {router?.pathname === "/login" ? <>
                <ColText >ระบบลางานออนไลน์</ColText>
            </>
                : <>
                    {props?.user?.role_id === "633e749477746afb52cb883c" ? <>
                        <Colstyle span={2}><Link href="../Leave">ลางาน</Link></Colstyle>
                        <Colstyle span={3}><Link href="../Work_From_Home">Work from home</Link></Colstyle>
                        <Colstyle span={4}><Link href="../Request_to_offsite">ขออนุญาตออกนอกสถานที่</Link></Colstyle>
                        <Colstyle span={2}><Link href="../Statics">สถิติ</Link></Colstyle>
                        <Colstyle span={3}><Link href="../Add_User">เพิ่มพนักงาน</Link></Colstyle>
                        <Colstyle span={2}><Link href="../Request">คำขอ</Link></Colstyle>
                    </>
                        : <>
                            <Colstyle span={2}><Link href="../Leave">ลางาน</Link></Colstyle>
                            <Colstyle span={3}><Link href="../Work_From_Home">Work from home</Link></Colstyle>
                            <Colstyle span={3}><Link href="../Request_to_offsite">ขออนุญาตออกนอกสถานที่</Link></Colstyle>
                        </>
                    }
                    <Colstyle span={3} style={{ paddingLeft: '10px', textAlign: 'right', paddingRight: '20px', display: 'flex' }}></Colstyle><Col style={{ color: 'white', fontSize: '24px' }}>{props?.user?.username}</Col>
                        <Col span={2}><Link href="../login"><img src="../images/Logout.png" width='50px' height='40px' style={{ padding: '5px' }} /></Link></Col>
                </>}
        </Row>
        </>
    )
};
const ColText = styled(Col)`

  font-size: 24px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
  padding-top: 5px;
  color: #fff;
`
const Colstyle = styled(Col)`
    font-Weight: '900';
    line-height: 45px;
    a {
        color: #ffffff;
        text-decoration: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        transition: color 0.3s;
        font-size: 24px;
`
const Colstyled = styled(Col)`
    margin-Top: -10px;
`

export default HeadComponent;