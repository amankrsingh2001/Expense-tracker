export const TotalAmount=(data:any)=>{
    const total = data.reduce((accumulator:number, currentValue:any)=>{
                    return accumulator+(currentValue.amount || currentValue.price)
                },0)
    return total
}
