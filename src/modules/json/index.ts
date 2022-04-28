export type callFun = (...args:any)=>any

export interface ConfigInterface{
    id: string,
    pid:string,
    children:string
}
/*数组转JSON
 * @param  {[type]} data   扁平数据
 * @param  {[type]} config {id:'id', pid:'pid', children:'children'}
 *                         id 数据里的id string类型
 *                         pid 数据里的父id string类型
 *                         children 生成结果中子节点的字段名 string类型
 * @return {[type]}        [description]
* */
export const arrayToTree = (data:{[key:string]:any}[],firstId:number = 0, config:ConfigInterface = {id:'id',pid:'pid',children:'children'}, call?:callFun|null)=>{
    let id = config.id || 'id', pid = config.pid || 'pid', children = config.children || 'children'
    const res = [];
    const map = data.reduce((res, v) => (res[v[id]] = v, res), {});
    for (const item of data) {
        if (item[pid] === firstId) {
            if (call){
                res.push(call(item));
            }else{
                res.push(item);
            }
            continue;
        }
        if (item[pid] in map) {
            const parent = map[item[pid]];
            parent[children] = parent[children] || [];
            if (call){
                parent[children].push(call(item));
            }else{
                parent[children].push(item);
            }

        }
    }
    return res;
}
/*json树平铺
* * @param  {[type]} data json树
 *                         res 返回结果
 *                         childName 默认值children
 *                         pid 父节点id
 *                         call 参数的回调处理
 * @return {[type]}        [description]
*
* */
export const treeToArray = (data:{[key:string]:any}[],res:{[key:string]:any}[] = [], childName:string = 'children', pid?:string|Number , call?:callFun|null)=>{
    data.forEach(item => {
        if (call){
            res.push(call(item,pid))
        }else {
            res.push(item);
        }
        if(item[childName] && item[childName].length !== 0) {
            treeToArray(item[childName],res,childName,item.id,call);
        }
        delete  item[childName]
    });
    return res;
}

/*json树 获取某个节点的所有父级id
* * @param  {[type]} data json树
 *                         id 参数的回调处理
 * @return {[type]}        [description]
*
* */
export const cascadeParentKeys = (data:{[key:string]:any}[],targetId:string|number,id:string='id',key:string='id',childName:string='children'):any=>{
    for (const i in data) {
        if (data[i][id] === targetId) {
            return [data[i][key]]
        }
        if (data[i][childName]) {
            const result = cascadeParentKeys(data[i][childName], targetId,key,childName)
            if (result !== undefined) {
                return result.concat(data[i][key])
            }
        }
    }
}

export const cascadeParents = (data:{[key:string]:any}[],targetId:string|number,id:string='id',childName:string='children'):any=>{
    for (const i in data) {
        if (data[i][id] === targetId) {
            return [data[i]]
        }
        if (data[i][childName]) {
            const result = cascadeParents(data[i][childName], targetId,id,childName)
            if (result !== undefined) {
                return result.concat(data[i])
            }
        }
    }
}