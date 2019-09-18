import React from 'react';
import { Card, Typography, Alert, Table, Button, Spin, Statistic } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

const columns = [
  {
    title: 'cashFlow1',
    dataIndex: 'content1',
    key: 'cashFlow1',
  },
  {
    title: 'cashFlow2',
    dataIndex: 'content2',
    key: 'cashFlow2',
  },
  {
    title: 'cashFlow3',
    dataIndex: 'content3',
    key: 'cashFlow3',
  },
];

const insertScale = 1000

class Welcome extends React.Component {
  render() {
    const { content1, dispatch, indexData, cost } = this.props;
    const dataSource = indexData.map((item) => {
      const index1 = item.content1
      if(!content1){
        return item
      }
      else if(!content1[index1]){
        return item
      }
      else {
        return {
          ...item,
          content1: content1[index1].name
        }
      }
    })
    return (
      <PageHeaderWrapper>
        <Card
          extra={
            <>
              <Statistic title="timecost(ms)" value={cost}/>
              <Button
                onClick={() => dispatch({ type: 'table/insertData', payload: { length: 0 } })}
              >
                fetchData
              </Button>
              <Button
                onClick={() => dispatch({ type: 'table/insertData', payload: { length: insertScale } })}
              >
                {`insert(${insertScale})`}
              </Button>
              <Button onClick={() => dispatch({ type: 'table/fetchColumn', payload: { column: 'content1', list: indexData.map((item) => item.content1) } })}>updateContent1</Button>
              <Button onClick={() => console.log('b')}>updateContent2</Button>
              <Button onClick={() => console.log('c')}>updateContent3</Button>
            </>
          }
        >
          <Table dataSource={dataSource} columns={columns} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default connect(({ table }) => ({
  dataSource: table.dataSource,
  indexData: table.indexData,
  cost: table.cost,
  content1: table.content1,
  // content2: table.content2,
  // content3: table.content3
}))(Welcome);
