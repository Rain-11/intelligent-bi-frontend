import { obtainAnalysisResultsAsync } from '@/services/intelligent_bi_serve/tubiaojiekou';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  GetProp,
  Input,
  Row,
  Select,
  Space,
  Upload,
  UploadProps,
  message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
const ChartAsync: React.FC = () => {
  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: any) => {
    try {
      if (values.file.fileList.length > 1) {
        message.error('每次只能上传一个文件');
        return;
      }
      if (loading) {
        return;
      }
      setLoading(true);
      const res = await obtainAnalysisResultsAsync(
        {
          ...values,
          file: undefined,
        },
        { file: values.file.file.originFileObj },
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      if (res.code === 20000) {
        message.success('任务提交成功');
        return;
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error('任务提交失败');
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng =
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (!isJpgOrPng) {
      message.error('请上传表格文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('文件大于 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Card style={{ height: '100vh' }} title="智能数据分析">
            <Form
              name="validate_other"
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
              labelAlign={'right'}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
            >
              <Form.Item
                name="name"
                label="请输入图标名称"
                rules={[{ required: true, message: '请填写图表名称!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="goal"
                label="请输入分析目标"
                rules={[{ required: true, message: '请输入分析目标!' }]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item name="chartType" label="图表类型" hasFeedback>
                <Select
                  placeholder="请选择图表类型"
                  allowClear
                  options={[
                    { value: '柱状图', label: '柱状图' },
                    { value: '饼图', label: '饼图' },
                    { value: '折线图', label: '折线图' },
                    { value: '折线图的渐变', label: '折线图的渐变' },
                  ]}
                ></Select>
              </Form.Item>

              <Form.Item
                name="file"
                label="待分析数据"
                extra="请上传csv格式文件，且文件大小不超过2MB"
              >
                <Upload name="file" maxCount={1} beforeUpload={beforeUpload}>
                  <Button icon={<UploadOutlined />}>上传csv文件</Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                    开始分析
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ChartAsync;
