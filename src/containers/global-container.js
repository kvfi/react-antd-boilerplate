import { Avatar, Breadcrumb, Dropdown, Layout, Menu } from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { useKeycloak } from 'react-keycloak'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const Logo = styled.div`
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
`

export default function GlobalContainer(props) {
    const [keycloak, initialized] = useKeycloak()
    const [userInfo, setUserInfo] = useState({
        firstName: null,
        lastName: null
    })
    const { children } = props

    useEffect(() => {
        if (initialized) {
            keycloak.loadUserProfile().success((info) => {
                setUserInfo(info)
            })
        }
    }, [initialized, keycloak])

    if (!initialized && !keycloak.authenticated) {
        return 'Loading...'
    }

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <span onClick={() => keycloak.logout()}>Logout</span>
            </Menu.Item>
        </Menu>
    )

    return (
        <Layout>
            <Header className="header">
                <>
                    <Logo />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{
                            lineHeight: '64px',
                            display: 'flex',
                            alignItems: 'right',
                            justifyContent: 'right',
                            marginRight: '24px'
                        }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                        <Dropdown overlay={menu}>
                            <span style={{ color: '#999', fontSize: '14px' }}>
                                <Avatar icon="user" size="small" style={{ marginRight: '10px' }} /> {userInfo.firstName} {userInfo.lastName}
                            </span>
                        </Dropdown>
                    </Menu>
                </>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <UserOutlined />
                                    subnav 1
                                </span>
                            }
                        >
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <LaptopOutlined />
                                    subnav 2
                                </span>
                            }
                        >
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={
                                <span>
                                    <NotificationOutlined />
                                    subnav 3
                                </span>
                            }
                        >
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
