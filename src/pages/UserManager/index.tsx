import {
  addUser,
  deleteUser,
  listUserByPage,
  updateUser,
} from '@/services/intelligent_bi_serve/yonghujiekou';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Upload, message } from 'antd';
import { useRef, useState } from 'react';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ProColumns<API.LoginUserVO>[] = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '用户昵称',
    dataIndex: 'userName',
    copyable: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    valueType: 'avatar',
    width: 150,
    search: false,
    render: (dom, record) => (
      <Space>
        <span>{dom}</span>
        <a href={record.userAvatar as string} target="_blank" rel="noopener noreferrer"></a>
      </Space>
    ),
    editable: false,
  },
  {
    title: '账户权限',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      user: { text: '普通用户', status: 'Default' },
      admin: { text: '管理员', status: 'Success' },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
    editable: false,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id as number);
        }}
      >
        编辑
      </a>,
    ],
  },
];

const { Option } = Select;

export default () => {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [newUser] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    newUser.resetFields();
    setOpen(false);
  };
  const handleOk = () => {
    newUser.submit();
  };

  const normFile = (e: any) => {
    setFileList(e.fileList);
  };
  return (
    <>
      <Drawer
        title="新建用户"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={handleOk} type="primary">
              确认创建用户
            </Button>
          </Space>
        }
      >
        <Form
          form={newUser}
          onFinish={async (values) => {
            const res = await addUser({
              ...values,
              avatarUrl: (fileList[0] as any).response.data,
            });
            if (res.message === 'ok') {
              message.success('添加成功');
            }
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="昵称"
                rules={[{ required: true, message: 'Please enter username' }]}
              >
                <Input placeholder="Please enter username" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="头像"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                name="avatarUrl"
              >
                <Upload action="/api/user/pictureUpload" listType="picture-card">
                  {fileList.length > 0 ? null : (
                    <button style={{ border: 0, background: 'none' }} type="button">
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="userAccount"
                label="账户名"
                rules={[{ required: true, message: 'Please enter userAccount' }]}
              >
                <Input placeholder="Please enter userAccount" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="userPassword"
                label="密码"
                rules={[{ required: true, message: 'Please enter userPassword' }]}
              >
                <Input placeholder="Please enter userPassword" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="手机号"
                rules={[{ required: true, message: 'Please enter phone' }]}
              >
                <Input placeholder="Please enter phone" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[{ required: true, message: 'Please enter email' }]}
              >
                <Input placeholder="Please enter email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="性别"
                rules={[{ required: true, message: 'Please choose the gender' }]}
              >
                <Select placeholder="Please choose the gender">
                  <Option value="1">男</Option>
                  <Option value="0">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="planetCode"
                label="星球id"
                rules={[{ required: true, message: 'Please enter planetCode' }]}
              >
                <Input placeholder="Please enter planetCode" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <ProTable<API.LoginUserVO>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          await waitTime(1000);
          delete params.created_at;
          const { data } = await listUserByPage({
            ...params,
          });
          return {
            total: data?.total,
            success: true,
            data: data?.records,
          };
        }}
        editable={{
          type: 'multiple',
          onSave: async (rowKey, data) => {
            await waitTime(2000);
            const res = await updateUser(data as API.User);
            if (res.message === 'ok') {
              message.success('修改成功');
            }
          },
          onDelete: async (key) => {
            const res = await deleteUser({
              id: key as number,
            });
            if (res.message === 'ok') {
              message.success('删除成功');
            }
          },
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          pageSizeOptions: [5, 10, 15],
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showDrawer} icon={<PlusOutlined />}>
            新建用户
          </Button>,
        ]}
      />
    </>
  );
};
