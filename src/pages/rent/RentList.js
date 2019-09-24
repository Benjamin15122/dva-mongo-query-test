import React from 'react';
import request from 'umi-request';
import { Table, Button, Modal, Spin, Card } from 'antd';
import { Link } from 'umi';
import RentParams from './RentParams';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

const mapStateToProps = state => ({
    rentList: state.rent.rentList
})

class RentList extends React.Component {
    state = {
        visible: false,
        list: null
    }

    constructor(props) {
        super(props)
        this.columns = [{
            title: 'id',
            key: 'id',
            dataIndex: 'id'
        }, {
            title: '操作',
            key: 'ops',
            render: record => {
                return <><Link to={`/schedule?id=${record.id}`}><Button>详情</Button></Link><Button onClick={async () => { request.delete(`/rent/api/rent?id=${record.id}`) }}>删除</Button></>
            }
        }]
    }

    componentDidMount() {
        this.props.dispatch({ type: 'rent/fetchList'})
    }

    render() {
        if (!this.props.rentList) return <PageHeaderWrapper><Spin /></PageHeaderWrapper>
        return <PageHeaderWrapper>
            <Card extra={<Button onClick={() => this.setState({ ...this.state, visible: true })}>创建</Button>}>
                <Table dataSource={this.props.rentList} columns={this.columns} />
            </Card>
            <Modal
                visible={this.state.visible}
                onCancel={() => this.setState({ ...this.state, visible: false })}
                footer={null}
            >
                <RentParams id={null} title={"创建租金表"} />
            </Modal>
        </PageHeaderWrapper>
    }
}

export default connect(mapStateToProps)(RentList)