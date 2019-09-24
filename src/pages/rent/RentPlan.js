import React from 'react'
import { Card, Tabs, Table, Descriptions } from 'antd'
const { TabPane } = Tabs


const rentColumns = [
    {
        title: '支付日',
        dataIndex: 'payDate',
        key: '支付日',
    }, {
        title: '当期租金',
        dataIndex: 'currentRent',
        key: '当期租金',
    }, {
        title: '当期含税租金(本金)',
        dataIndex: 'principal',
        key: '本金',
    }, {
        title: '当期含税租金(利息)',
        dataIndex: 'interest',
        key: '利息',
    }, {
        title: '剩余本金',
        dataIndex: 'remainingPrincipal',
        key: '剩余本金',
    }, {
        title: '不含税租金(本金)',
        dataIndex: 'excludingTaxPrincipal',
        key: '不含税本金',
    }, {
        title: '不含税租金(利息)',
        dataIndex: 'excludingTaxInterest',
        key: '不含税利息',
    }, {
        title: '本金增值税',
        dataIndex: 'principalVAT',
        key: '本金增值税',
    }, {
        title: '利息增值税',
        dataIndex: 'interestVAT',
        key: '利息增值税',
    }, {
        title: '手续费',
        dataIndex: 'handlingFee',
        key: '手续费',
    }, {
        title: '保证金',
        dataIndex: 'margin',
        key: '保证金',
    }, {
        title: '留购价款',
        dataIndex: 'purchasePrice',
        key: '留购价款',
    }, {
        title: 'XIRR(不含税)',
        dataIndex: 'excludingTaxXIRR',
        key: 'XIRR(不含税)',
    }, {
        title: 'IRR(不含税)',
        dataIndex: 'excludingTaxIRR',
        key: 'IRR(不含税)',
    }, {
        title: '会计IRR',
        dataIndex: 'accountingIRR',
        key: '会计IRR',
    }, {
        title: 'XIRR',
        dataIndex: 'xirr',
        key: 'XIRR',
    }, {
        title: 'IRR',
        dataIndex: 'irr',
        key: 'IRR',
    },
];

const collectColumns = [{
    title: '支付日',
    dataIndex: 'payDate',
    key: '支付日',
}, {
    title: '当期租金',
    dataIndex: 'currentRent',
    key: '当期租金',
}, {
    title: '手续费',
    dataIndex: 'handlingFee',
    key: '手续费',
}, {
    title: '保证金',
    dataIndex: 'margin',
    key: '保证金',
}, {
    title: '应收金额',
    key: 'amount',
    render: (text, record, index) => record.currentRent + record.handlingFee + record.margin
}]

const mapStateToProps = (state) => {
    return {
        rentInfo: state.rent.rentInfo
    }
}

class RentPlan extends React.Component {
    render() {
        const { rentInfo } = this.props
        const rentCells = rentInfo === undefined ? null : rentInfo.rentCells
        return <div>
            <Card title="输出" bordered={false} style={{ height: 700 }}>
                <Tabs>
                    <TabPane key='2' tab='收租计划表'>
                        <Table
                            scroll={{ y: 300 }}
                            columns={collectColumns}
                            dataSource={rentCells}
                        />
                    </TabPane>
                    <TabPane key='3' tab='租金计划表'>
                        <Table
                            scroll={{ x: 1800, y: 300 }}
                            columns={rentColumns}
                            dataSource={rentCells}
                        />
                    </TabPane>
                    <TabPane key='5' tab='回报率'>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="XIRR">{rentInfo === undefined ? null : rentInfo.xirr}</Descriptions.Item>
                            <Descriptions.Item label="IRR">{rentInfo === undefined ? null : rentInfo.irr}</Descriptions.Item>
                            <Descriptions.Item label="XIRR(不含税)">{rentInfo === undefined ? null : rentInfo.excludingTaxXIRR}</Descriptions.Item>
                            <Descriptions.Item label="IRR(不含税)">{rentInfo === undefined ? null : rentInfo.excludingTaxIRR}</Descriptions.Item>
                            <Descriptions.Item label="会计IRR">{rentInfo === undefined ? null : rentInfo.accountingIRR}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                    <TabPane key='7' tab='合计'>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="当期租金">{rentInfo === undefined ? null : rentInfo.currentRentSum}</Descriptions.Item>
                            <Descriptions.Item label="本金">{rentInfo === undefined ? null : rentInfo.principalSum}</Descriptions.Item>
                            <Descriptions.Item label="利息">{rentInfo === undefined ? null : rentInfo.interestSum}</Descriptions.Item>
                            <Descriptions.Item label="不含税本金">{rentInfo === undefined ? null : rentInfo.excludingTaxPrincipalSum}</Descriptions.Item>
                            <Descriptions.Item label="不含税利息">{rentInfo === undefined ? null : rentInfo.excludingTaxInterestSum}</Descriptions.Item>
                            <Descriptions.Item label="本金增值税">{rentInfo === undefined ? null : rentInfo.principalVATSum}</Descriptions.Item>
                            <Descriptions.Item label="利息增值税">{rentInfo === undefined ? null : rentInfo.interestVATSum}</Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    }
}

export default RentPlan