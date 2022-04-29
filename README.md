# tylib-tools

A tiny library for handling json.

## Quick Start

```
npm install tylib-tools
或
yarn add tylib-tools
```

Use function directly:

##api

```text
import {arrayToTree, treeToArray,cascadeParents,cascadeParentKeys} from "tylib-tools";

import tyTools from "tylib-tools";


tyTools.arrayToTree ：数组转json树

tyTools.treeToArray ：json树转数组

tyTools.cascadeParents ：根据json树的子节点id找所有级联父级

tyTools.cascadeParentKeys ：根据json树的子节点id找所有级联父级并取某一项特定的值

```

```ts
import {arrayToTree, treeToArray,cascadeParents,cascadeParentKeys} from "tylib-tools";

/**
 * arrayToTree parameter declaration.
 */
interface treeToArray {
    // 元数据
    data: { [key: string]: any }[]
    //返回的数据默认值为空数组
    res: []
    // 子集可能未必是children也可能是childList 默认值为children
    childName: string,
    // 处理的回调
    pid?:string|Number,
    // 可能对每个元素进行处理 
    call?:Function

}
let data = [
    {"id":1,"title":"店铺1","parent_id":0},
    {"id":2,"title":"店铺2","parent_id":0,"children":[{"id":3,"title":"店铺2-1","parent_id":2,"children":[{"id":4,"title":"店铺3-1","parent_id":3,"children":[{"id":5,"title":"店铺4-1","parent_id":4}]}]},{"id":6,"title":"店铺2-2","parent_id":2}]}
]
console.log(treeToArray(data,'children',0,[]))

interface cascadeParents {
    // 元数据
    data: { [key: string]: any }[]
    //
    targetId: string|number
    // 子集可能未必是children也可能是childList 默认值为children
    childName: string,
    // 处理的回调
    id:string,
    // 可能对每个元素进行处理 

}
console.log(cascadeParents(data,'children',0,[]))






/**
 * arrayToTree parameter declaration.
 */
interface arrayToTree {
    // 元数据
    data: { [key: string]: any }[]
    //第一层的id 默认值0
    firstId: number
    // 配置信息 
    config: { id: 'id', pid: 'pid', children: 'children' },
    // 处理的回调
    call: Function|null

}

let flatArr = [
    {id: 1, title: "店铺1", parent_id: 0},
    {id: 2, title: '店铺2', parent_id: 0},
    {id: 3, title: '店铺2-1', parent_id: 2},
    {id: 4, title: '店铺3-1', parent_id: 3},
    {id: 5, title: '店铺4-1', parent_id: 4},
    {id: 6, title: '店铺2-2', parent_id: 2},
]
console.log(arrayToTree(data,0,{id:'id',pid:'pid',children:'children'},call))

```

## License

MIT
