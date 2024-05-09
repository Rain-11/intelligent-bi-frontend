import { Footer } from '@/components';
import {
  emailVerificationCodeLogin,
  sendVerificationCode,
  userLogin,
  userRegister,
} from '@/services/intelligent_bi_serve/yonghujiekou';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, history, useModel } from '@umijs/max';
import { Button, Form, FormProps, Input, Modal, Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
/**
 * 其他登录方式
 */
/* const ActionIcons = () => {
  const { styles } = useStyles();
  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action} />
    </>
  );
}; */
const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const loginForm = useRef<ProFormInstance>();
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.UserLoginRequest | API.UserLoginEmailRequest) => {
    try {
      // 登录
      let res;
      if (type === 'account') {
        res = await userLogin({
          ...values,
        });
      } else if (type === 'mobile') {
        res = await emailVerificationCodeLogin({
          ...values,
        });
      }
      if (res.code === 20000) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(res.message);
      // 如果失败去设置用户错误信息
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  useEffect(() => {
    console.log(
      JSON.stringify(
        JSON.parse(
          '\n\n{\n  "tooltip": {\n    "trigger": "item"\n  },\n  "legend": {\n    "orient": "vertical",\n    "left": "left"\n  },\n  "series": [\n    {\n      "name": "用户增长数",\n      "type": "pie",\n      "radius": "50%",\n      "data": [\n        {"value": 10, "name": "1号"},\n        {"value": 20, "name": "2号"},\n        {"value": 30, "name": "3号"}\n      ],\n      "emphasis": {\n        "itemStyle": {\n          "shadowBlur": 10,\n          "shadowOffsetX": 0,\n          "shadowColor": "rgba(0, 0, 0, 0.5)"\n        }\n      }\n    }\n  ]\n}\n\n',
        ),
      ),
    );
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish: FormProps<API.UserRegisterRequest>['onFinish'] = async (values) => {
    try {
      const res = await userRegister(values);
      if (res.code === 20000) {
        message.success('注册成功');
        setIsModalOpen(false);
      }
    } catch (error) {
      message.error('注册失败');
      console.log(error);
    }
  };

  const onFinishFailed: FormProps<API.UserRegisterRequest>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.container}>
      <Modal title="注册账户" open={isModalOpen} footer={false} onCancel={handleCancel}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 400 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<API.UserRegisterRequest>
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入你的邮箱!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<API.UserRegisterRequest>
            label="密码"
            name="userPassword"
            rules={[{ required: true, message: '请输入你的密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<API.UserRegisterRequest>
            label="验证码"
            name="verificationCode"
            rules={[{ required: true, message: '请输入你验证码!' }]}
          >
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码！'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'秒后重新获取'}`;
                }
                return '获取验证码';
              }}
              name="verificationCode"
              onGetCaptcha={async () => {
                const email = form.getFieldValue('email');
                if (!email) {
                  message.error('请先输入您的邮箱');
                  return;
                }
                const result = await sendVerificationCode({
                  email,
                });
                if (result.code === 20000) {
                  message.success('获取验证码成功！已发送到您的邮箱');
                  return;
                } else {
                  throw new Error('获取验证码错误');
                }
              }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 14, span: 16 }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          formRef={loginForm}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="智驭数据"
          subTitle={'智慧BI分析平台'}
          initialValues={{
            autoLogin: true,
          }}
          // actions={['其他登录方式 :', <ActionIcons key="icons" />]}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '邮箱密码登录',
              },
              {
                key: 'mobile',
                label: '邮箱验证码登录',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'邮箱'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined />,
                }}
                name="email"
                placeholder={'请输入邮箱！'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                  {
                    pattern:
                      /^(\w+([-.][A-Za-z0-9]+)*){3,18}@\w+([-.][A-Za-z0-9]+)*\.\w+([-.][A-Za-z0-9]+)*$/,
                    message: '不合法的邮箱！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码！'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                name="verificationCode"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
                onGetCaptcha={async () => {
                  const email = loginForm.current?.getFieldValue('email');
                  if (!email) {
                    message.error('请先输入您的邮箱');
                    throw new Error('获取验证码错误');
                  }
                  const result = await sendVerificationCode({
                    email,
                  });
                  if (result.code === 20000) {
                    message.success('获取验证码成功！已发送到您的邮箱');
                    return;
                  } else {
                    throw new Error('获取验证码错误');
                  }
                }}
              />
            </>
          )}
          <div>
            <a
              style={{
                float: 'right',
                marginBottom: 24,
              }}
              onClick={() => {
                showModal();
              }}
            >
              还没有账号 ? 点击去注册
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
