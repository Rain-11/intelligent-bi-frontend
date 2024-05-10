import { listChart } from '@/services/intelligent_bi_serve/tubiaojiekou';
import { useModel } from '@umijs/max';
import { Avatar, Card, List, message } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
const ChartList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const initSearchParams = {
    pageSize: 12,
  };
  const [searchParams, setSearchParams] = useState({ ...initSearchParams });
  const [data, setData] = useState<API.ChartVo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { initialState } = useModel('@@initialState');
  const initData = async () => {
    setLoading(true);
    try {
      const res = await listChart({ ...searchParams });
      if (res.code === 20000) {
        setData(res.data?.records as API.ChartVo[]);
        setTotal(res.data?.total as number);
      }
    } catch (error) {
      console.log(error);
      message.error('数据加载失败');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    initData();
  }, [searchParams]);
  return (
    <>
      <List
        loading={loading}
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: searchParams.pageSize,
          total,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            extra={
              <ReactECharts style={{ width: 500 }} option={JSON.parse(item.genChart as string)} />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={initialState?.currentUser?.userAvatar} />}
              title={<a>{item.name}</a>}
              description={item.chartType ? '图标类型:' + item.chartType : undefined}
            />
            <Card title={item.goal}>{item.genResult}</Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default ChartList;
