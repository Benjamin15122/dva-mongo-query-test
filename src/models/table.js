import request from 'umi-request';

const dataSource = [
  {
    cashFlow1: 'content1',
    cashFlow2: 'content1',
    cashFlow3: 'content1',
  },{
    cashFlow1: 'content2',
    cashFlow2: 'content2',
    cashFlow3: 'content2',
  },{
    cashFlow1: 'content3',
    cashFlow2: 'content3',
    cashFlow3: 'content3',
  },
];

export default{
    namespace: 'table',
    state:{
        indexData: [],
        dataSource: dataSource,
    },
    reducers:{
        updateColumn(state, payload){
            const {indexData} = state
            const {column,map} = payload
            const newDataSource = indexData
            newDataSource.forEach((item)=>{
                item[column] = map[column]
            })
            return {
                ...state,
                dataSource: newDataSource
            }
        },
        updateIndex(state, payload){
            return {
                ...state,
                indexData: payload
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
            const response = yield call(request.get,'/contract/api/contract/contracts')
            yield put({type: 'updateIndex', payload: response.map((item)=>item.content)})
        },
        *fetchColum({payload},{call,put}){
            const {column} = payload
            
        }
    }
}