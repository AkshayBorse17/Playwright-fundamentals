let data=[2,4,5,6]

let value=function(data:number[]):number{
    let sum=0
    for(let item of data){
        sum=sum+item
    }
    return sum
}

console.log(value(data))