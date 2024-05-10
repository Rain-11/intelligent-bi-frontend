import { obtainAnalysisResults } from '@/services/intelligent_bi_serve/tubiaojiekou';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactECharts from 'echarts-for-react';
import { useState } from 'react';
const Chart: React.FC = () => {
  const [option, setOption] = useState(undefined);
  const [chartResult, setChartResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: any) => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const res = await obtainAnalysisResults(
        {
          ...values,
          file: undefined,
        },
        { file: values.file.file.originFileObj },
      );

      if (res.code === 20000) {
        setOption(JSON.parse(res.data?.option as string));
        setChartResult(res.data?.result as string);
        message.success('数据解析成功');
        return;
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error('数据分析失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col span={12}>
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

              <Form.Item name="file" label="待分析数据" extra="请上传csv格式文件">
                <Upload name="file">
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
        <Col span={12}>
          <Card style={{ height: '100vh' }} title="数据分析结果">
            <Row justify={'center'} style={{ height: '50vh' }}>
              {option ? (
                <ReactECharts style={{ width: '100%' }} option={option} />
              ) : (
                <Empty description={'暂无图表数据'} />
              )}
            </Row>
            <Divider />
            <Row justify={'center'} style={{ height: '50vh' }}>
              {chartResult.substring(0, chartResult.length - 1) || (
                <Empty description={'暂无分析结论'} />
              )}
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Chart;
