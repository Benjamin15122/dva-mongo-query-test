import request from 'umi-request';

const dataSource = [
  {
    content1: 'c1',
    content2: 'c1',
    content3: 'c1',
  },{
    content1: 'c2',
    content2: 'c2',
    content3: 'c2',
  },{
    content1: 'c3',
    content2: 'c3',
    content3: 'c3',
  },
];

export default{
    namespace: 'table',
    state:{
        indexData: [],
        cost: null,
    },
    reducers:{
        updateColumn(state, {payload}){
            const {indexData} = state
            const {column,map,cost} = payload
            let newState = {
                ...state,
                cost: cost
            }
            newState[column] = map
            return newState
        },
        updateIndex(_, {payload}){
            const {newDataIndex,cost} = payload
            return {
                indexData: newDataIndex,
                cost: cost
            }
        },
    },
    effects:{
        *fetchIndexData({payload},{call,put}){
            return
        },
        *insertData({payload},{call,put}){
            const {length} = payload
            let i = 0
            const d1 = new Date()
            for(i=0;i<length;i++){
                const timestamp = new Date().getTime()
                const content1 = yield call(request.post,'/content1/api/cashFlows/new',{
                    body: "content1-"+timestamp
                })
                const content2 = yield call(request.post,'/content2/api/cashFlows/new',{
                    body: "content2-"+timestamp
                })
                const content3 = yield call(request.post,'/content3/api/cashFlows/new',{
                    body: "content1-"+timestamp
                })
                yield call(request.post,'/contract/api/contract/contracts/new',{
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content:{
                            content1: content1.id,
                            content2: content2.id,
                            content3: content3.id
                        }
                    })
                })
            }
            const d2 = new Date()
            const cost = parseFloat(d2-d1)
            const response = yield call(request.get,'/contract/api/contract/contracts')
            const newDataIndex = response.map((item)=>item.content)
            yield put({type: 'updateIndex', payload: {newDataIndex,cost}})
        },
        *fetchColumn({payload},{call,put}){
            const {column,list} = payload
            const d1 = new Date()
            const response = yield call(request.post,'/content2/api/cashFlows',{
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(list)
            })
            const d2 = new Date()
            const cost = parseFloat(d2-d1)
            yield put({type: 'updateColumn', payload:{
                column: column,
                map: response,
                cost
            }})
        }
    }
}