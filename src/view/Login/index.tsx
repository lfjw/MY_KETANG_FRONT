import React from 'react'
import './index.scss'
import { Input, Form, Button } from 'antd'
import { connect } from "react-redux";
import { CombinedState, MineState } from "../../typings";
import mapDispatchToProps from 'src/store/actions/login'


import Nav from '../../components/Nav'

// TODO 回头记得添加类型
//type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>


function Login(props: any) {

  const [form] = Form.useForm();

  const onFinish = (values: any) => {

    const {login} = props;
    login(values)
    
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Nav history={props.history}>登录</Nav>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}


let mapStateToProps = (state: CombinedState): MineState => state.mine

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)