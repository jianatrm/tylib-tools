import {arrayToTree,treeToArray} from "../dist";

let  array = [
    {id: 1, title: "店铺1", parent_id: 0},
    {id: 2, title: '店铺2', parent_id: 0},
    {id: 3, title: '店铺2-1', parent_id: 2},
    {id: 4, title: '店铺3-1', parent_id: 3},
    {id: 5, title: '店铺4-1', parent_id: 4},
    {id: 6, title: '店铺2-2', parent_id: 2},
]

let json = [{"id":1,"title":"店铺1","parent_id":0},{"id":2,"title":"店铺2","parent_id":0,"children":[{"id":3,"title":"店铺2-1","parent_id":2,"children":[{"id":4,"title":"店铺3-1","parent_id":3,"children":[{"id":5,"title":"店铺4-1","parent_id":4}]}]},{"id":6,"title":"店铺2-2","parent_id":2}]}]
describe('Utils:json',() => {
    it('arrayToJson', () => {
        expect(arrayToTree(array,0,{id:'id',pid:'parent_id',children:'children'})).toStrictEqual(json)
    })

    it('treeToArray', () => {
        expect(treeToArray(json,[],'children',0)).toStrictEqual(array)
    })
})