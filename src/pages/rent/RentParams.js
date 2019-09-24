import React from 'react'
import { Card, Form, DatePicker, Button, InputNumber, Tabs, Select } from 'antd'
import { connect } from 'dva'
const { TabPane } = Tabs
const { Option } = Select
const Item = Form.Item

const mapStateToProps = (state) => {
    return {
        rentInfo: state.rent.rentInfo
    }
}

class RentParams extends React.Component {
    handleSubmit = () => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                console.log(err)
                return
            }
            const startDate = fieldsValue.startDate.format()
            const endDate = fieldsValue.endDate.format()
            const values = {
                ...fieldsValue,
                startDate: startDate,
                endDate: endDate
            }
            if (!this.props.id) {
                this.props.dispatch({type: 'rent/createRent', payload: values})
            }
            else {
                this.props.dispatch({type: 'rent/recalculate', payload: {
                    params: values,
                    rentInfo: this.props.rentInfo
                }})
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: '请输入租赁日期' }],
        };
        const { title } = this.props
        return <Card title={title === undefined ? "输入" : title} bordered={false} style={{ height: 540 }} extra={<Button type="primary" onClick={this.handleSubmit}>计算</Button>}>
            <Form {...formItemLayout}>
                <Tabs>
                    <TabPane key='0' tab='租期信息'>
                        {/* <Row>
                            <Col span={12}> */}
                        <Item label={'起租日'}>
                            {getFieldDecorator('startDate', { rules: [{ required: true, message: '请选择起租日' }] })(<DatePicker style={{ width: '120px' }} />)}
                        </Item>
                        {/* </Col>
                            <Col span={12}> */}
                        <Item label={'到期日'}>
                            {getFieldDecorator('endDate', { rules: [{ required: true, message: '请选择到期日' }] })(<DatePicker style={{ width: '120px' }} />)}
                        </Item>
                        {/* </Col>
                        </Row> */}
                        {/* <Row gutter={24}>
                            <Col span={12}> */}
                        <Item label={'租期'}>
                            {getFieldDecorator('leasePeriod', { rules: [{ required: true, message: '请输入租期' }] })(
                                <InputNumber style={{ width: '120px' }} min={0} step={1} />
                            )}
                        </Item>
                        <Item label={'每期还款日'}>
                            {getFieldDecorator('repaymentDate', { rules: [{ required: true, message: '请输入每期还款日' }] })(
                                <InputNumber style={{ width: '120px' }} min={0} />
                            )}
                        </Item>
                        {/* </Col>
                            <Col span={12}> */}
                        <Item label={'租金收取频次(月)'}>
                            {getFieldDecorator('rentalFrequency', { rules: [{ required: true, message: '请输入租金收取频次' }] })(
                                <InputNumber style={{ width: '120px' }} min={1} max={31} />
                            )}
                        </Item>
                    </TabPane>
                    <TabPane key='1' tab='租赁选项'>
                        <Item label={'税务方案类型'}>
                            {getFieldDecorator('taxPlanType', { rules: [{ required: true, message: '请选择税务方案' }] })(
                                <Select style={{ width: 120 }}>
                                    <Option value="直租">直租</Option>
                                    <Option value="回租">回租</Option>
                                </Select>
                            )}
                        </Item>
                        <Item label={'先付后付标志'}>
                            {getFieldDecorator('payTag', { rules: [{ required: true, message: '请选择支付标志' }] })(
                                <Select style={{ width: 120 }}>
                                    <Option value="先付">先付</Option>
                                    <Option value="后付">后付</Option>
                                </Select>
                            )}
                        </Item>
                        <Item label={'租金计算模板'}>
                            {getFieldDecorator('algTemplate', { rules: [{ required: true, message: '请选择租金计算模板' }] })(
                                <Select style={{ width: 120 }}>
                                    <Option value="等额本金">等额本金</Option>
                                    <Option value="等息本金">等息本金</Option>
                                </Select>
                            )}
                        </Item>
                        {/* </Col>
                        </Row> */}
                    </TabPane>
                    <TabPane key='2' tab='资金信息'>
                        {/* <Row gutter={24}>
                            <Col span={12}> */}
                        <Item label={'租赁本金'}>
                            {getFieldDecorator('principal', { rules: [{ required: true, message: '请输入租赁本金' }] })(
                                <InputNumber style={{ width: '120px' }} min={0} step={0.01} />
                            )}
                        </Item>
                        <Item label={'资产余值'}>
                            {getFieldDecorator('assetValue', { rules: [{ required: true, message: '请输入资产余值' }] })(
                                <InputNumber style={{ width: '120px' }} min={0} step={0.01} />
                            )}
                        </Item>
                        <Item label={'年计算天数'}>
                            {getFieldDecorator('yearCountDays', { rules: [{ required: true, message: '请输入资产余值' }] })(
                                <InputNumber style={{ width: '120px' }} min={0} max={366} step={1} />
                            )}
                        </Item>
                        {/* </Col>
                            <Col span={12}> */}
                        <Item label={'留购价款'}>
                            {getFieldDecorator('purchasePrice', { rules: [{ required: true, message: '请输入留购价款' }] })(
                                <InputNumber style={{ width: '120px' }} min={0} step={0.01} />)}
                        </Item>
                        <Item label={'保证金'}>
                            {getFieldDecorator('margin', { rules: [{ required: true, message: '请输入保证金' }] })(
                                <InputNumber style={{ width: '120px' }} min={0} step={0.01} />)}
                        </Item>
                        <Item label={'手续费'}>
                            {getFieldDecorator('handlingFee', { rules: [{ required: true, message: '请输入手续费' }] })(
                                <InputNumber style={{ width: '120px' }} min={0} step={0.01} />)}
                        </Item>
                        {/* </Col>
                        </Row> */}
                    </TabPane>
                    <TabPane key='3' tab='税率利率'>
                        <Item label={'手续费税率'}>
                            {getFieldDecorator('tariffRate', { rules: [{ required: true, message: '请输入手续费税率' }] })(
                                <InputNumber style={{ width: '120px' }} min={0} step={0.01} />)}
                        </Item>
                        <Item label={'本金利息税率'}>
                            {getFieldDecorator('principalInterestRate', { rules: [{ required: true, message: '请输入本金利息税率' }] })(
                                <InputNumber style={{ width: '120px' }} min={0} step={0.01} />)}
                        </Item>
                        <Item label={'进项税税率'}>
                            {getFieldDecorator('inputTaxRate', { rules: [{ required: true, message: '请输入进项税税率' }] })(
                                <InputNumber style={{ width: '120px' }} min={0} step={0.01} />)}
                        </Item>
                        <Item label={'计算年利率'}>
                            {getFieldDecorator('annualInterestRate', { rules: [{ required: true, message: '请输入年利率' }] })(
                                <InputNumber style={{ width: '120px' }} min={0} step={0.000001} />)}
                        </Item>
                    </TabPane>
                </Tabs>
            </Form>
        </Card>
    }
}

const RentParamsWrapper = Form.create({ name: '租赁计算' })(RentParams)

export default connect(mapStateToProps)(RentParamsWrapper) 