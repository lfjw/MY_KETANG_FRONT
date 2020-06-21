import React from 'react'
import './index.scss'
import { Input, Form, Button } from 'antd'
import { connect } from "react-redux";
import { CombinedState, MineState } from "../../typings";
import mapDispatchToProps from 'src/store/actions/reg'

import Nav from '../../components/Nav'

// TODO 回头记得添加类型
//type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>


function Register(props: any) {

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const { register } = props
    register(values)

  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Nav history={props.history}>注册</Nav>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="confirmPassword" label="确认密码" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">
            提交
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
)(Register)