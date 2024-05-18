import { listChart, searchChartByNameAndGoal } from '@/services/intelligent_bi_serve/tubiaojiekou';
import { useModel } from '@umijs/max';
import { Avatar, Card, Empty, List, message } from 'antd';
import Search, { SearchProps } from 'antd/lib/input/Search';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
enum ChartEnum {
  '排队中' = 0,
  '已完成' = 1,
  '执行中' = 2,
  '任务失败' = 3,
}
const ChartList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const initSearchParams: API.ChartQueryDto = {
    pageSize: 12,
  };
  const [searchParams, setSearchParams] = useState<API.ChartQueryDto>({ ...initSearchParams });
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
        console.log(res);
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

  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    console.log(info?.source, value);
    const res = await searchChartByNameAndGoal({
      name: value,
      goal: value,
    });
    if (res.code === 20000) {
      setData(res.data?.records as API.ChartVo[]);
    }
  };
  return (
    <>
      <Search placeholder="请输入关键字" onSearch={onSearch} enterButton />
      <List
        loading={loading}
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: searchParams.pageSize,
          total,
          onChange: (page: number, pageSize: number) => {
            setSearchParams((value) => {
              return { ...value, current: page, pageSize: pageSize };
            });
          },
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            extra={
              item.status === 1 ? (
                <ReactECharts style={{ width: 500 }} option={JSON.parse(item.genChart as string)} />
              ) : (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: '100%', width: 500, paddingTop: 50 }}
                  description={
                    <span>
                      <a href="#API">{ChartEnum[item.status as number]}</a>
                    </span>
                  }
                ></Empty>
              )
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
