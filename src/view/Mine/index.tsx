import React, { PropsWithChildren, useEffect, useState } from 'react'
import './index.scss'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { CombinedState, MineState, LOGIN_TYPES } from '../../typings'
import mapDispatchToProps from '../../store/actions/mime'
import Nav from '../../components/Nav'
import history from '../../history';
import { Descriptions, Button, Alert } from 'antd'

import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/lib/upload'



function beforeUpload(file: RcFile) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  // B  KB  M
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>
function Mine(props: Props) {
  const { validate, loginState, user } = props
  // TODO []概念 props 会导致死循环，深入了解一下
  useEffect(() => {
    validate()
  }, [validate])

  const [loading, changeLoading] = useState(false)


  function handleChange(info: UploadChangeParam) {
    if (info.file.status === 'uploading') {
      changeLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // response就是上传接口返回的响应体
      const {success, data} = info.file.response
      if(success){
        props.setAvatar(data)
      }else{
        message.error('上传失败')
      }
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (imageUrl: any) => {
      //   changeLoading(false)
      //   setImageUrl(imageUrl)
      // });
    }
  }

  let content;

  if (loginState === LOGIN_TYPES.UN_VALIDATE) {
    // 未验证
    content = null
  } else if (loginState === LOGIN_TYPES.LOGINED) {
    // 登录
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    // TODO user?.username 写法
    content = (
      <div className='user-info'>
        {/* name 往服务器上传头像的时候，应该使用那个字段名上传 */}
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="http://localhost:8888/user/uploadAvatar"
          beforeUpload={beforeUpload}
          onChange={handleChange}
          // 上传到服务端id名称
          data={{ userId: user?.id}}
        >
          {user.avatar ? <img src={user.avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>

        <Descriptions title='当前用户'>
          <Descriptions.Item label='用户名'>
            {user?.username}
          </Descriptions.Item>
          <Descriptions.Item label='邮箱'>
            {user?.email}
          </Descriptions.Item>
        </Descriptions>
        // TODO 退出函数有问题
        <Button>退出</Button>
      </div>
    )
  } else {
    //未登录
    content = (
      <>
        <Alert type='warning' message='未登录' description='亲爱的用户，你尚未登录'></Alert>
        <div style={{ textAlign: 'center', padding: '.5rem' }}>
          <Button onClick={() => props.history.push('/login')}>登录</Button>
          <Button onClick={() => props.history.push('/register')}>注册</Button>
        </div>
      </>
    )
  }
  return (
    <>
      <Nav history={history}>个人中心</Nav>
      {content}
    </>
  )
}

const mapStateToProps = (state: CombinedState): MineState => state.mine

export default connect(mapStateToProps, mapDispatchToProps)(Mine)