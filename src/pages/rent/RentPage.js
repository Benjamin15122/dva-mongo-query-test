import RentParams from './RentParams';
import RentPlan from './RentPlan';
import { withRouter } from 'umi';
import { connect } from 'dva';
import React from 'react';
import { Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
const mapStateToProps = state => ({
    rentInfo: state.rent.rentInfo
})

class RentPage extends React.Component {
    constructor(props) {
        super(props)
        const { query } = this.props.location
        this.id = query && query.id ? query.id : null
    }

    componentDidMount() {
        this.props.dispatch({ type: 'rent/fetchRent', payload: this.id })
    }
    render() {
        const rentInfo = this.props.rentInfo
        if (!rentInfo) return <PageHeaderWrapper><Spin /></PageHeaderWrapper>
        return <PageHeaderWrapper>
            <RentParams id={this.id} title={"重算租金表"} />
            <RentPlan rentInfo={rentInfo} />
        </PageHeaderWrapper>
    }
}

export default withRouter(connect(mapStateToProps)(RentPage))