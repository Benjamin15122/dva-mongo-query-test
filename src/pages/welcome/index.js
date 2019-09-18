import React from 'react';
import { Card, Typography, Alert, Table, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

const columns = [
  {
    title: 'cashFlow1',
    dataIndex: 'cashFlow1',
    key: 'cashFlow1',
  },
  {
    title: 'cashFlow2',
    dataIndex: 'cashFlow2',
    key: 'cashFlow2',
  },
  {
    title: 'cashFlow3',
    dataIndex: 'cashFlow3',
    key: 'cashFlow3',
  },
];

class Welcome extends React.Component {
  render() {
    const { dataSource, dispatch } = this.props;
    return (
      <PageHeaderWrapper>
        <Card
          extra={
            <>
              <Button
                onClick={() => dispatch({ type: 'table/insertData', payload: { length: 49 } })}
              >
                insertData
              </Button>
              <Button onClick={() => console.log('a')}>updateContent1</Button>
              <Button onClick={() => console.log('b')}>updateContent2</Button>
              <Button onClick={() => console.log('c')}>updateContent3</Button>
              <Button onClick={() => console.log('d')}>updateContent4</Button>
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
}))(Welcome);
