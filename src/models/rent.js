import request from 'umi-request'
import moment from 'moment'

const DateFormat = (response) => {
    if (response === "") return response
    const rentCells = response.rentCells.map(
        (item) => {
            return {
                ...item,
                payDate: item.payDate.year + "-" + item.payDate.monthOfYear + "-" + item.payDate.dayOfMonth
            }
        }
    )
    return {
        ...response,
        rentCells: rentCells
    }
}

const ScheduleMerge = (oldSchedule, newSchedule) => {
    const split = moment(newSchedule.rentCells[0].payDate)
    const oldCells = oldSchedule.rentCells.filter(
        (item) => {
            const date = moment(item.payDate)
            return date < split
        }
    )
    const newCells = newSchedule.rentCells
    return {
        ...oldSchedule,
        rentCells: oldCells.concat(newCells)
    }
}

export default {
    namespace: 'rent',
    state: {},
    reducers: {
        updateData(state, { payload }) {
            debugger
            return {
                ...state,
                rentInfo: payload
            }
        },
        updateList(state, { payload }) {
            return {
                ...state,
                rentList: payload
            }
        }
    },
    effects: {
        *fetchRent({ payload }, { call, put }) {
            const response = yield call(request.get, `/rent/api/rent/${payload}`)
            const newData = DateFormat(response)
            yield put({ type: 'updateData', payload: newData })
        },
        *fetchList(_, { call, put }) {
            const response = yield call(request.get, '/rent/api/rent')
            yield put({ type: 'updateList', payload: response })
        },
        *createRent({ payload }, { call, put }) {
            const response = yield call(request.post, `/rent/api/rent/new`, {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            const newData = DateFormat(response)
            yield put({ type: 'updateData', payload: newData })
            const newList = yield call(request.get, '/rent/api/rent')
            yield put({ type: 'updateList', payload: newList })
        },
        *recalculate({ payload }, { call, put }) {
            const newInfo = yield call(request.post, `/rent/api/rent/calc`, {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload.params)
            })
            const newData = ScheduleMerge(payload.rentInfo, DateFormat(newInfo))
            yield put({ type: 'updateData', payload: newData})
        }
    }
}