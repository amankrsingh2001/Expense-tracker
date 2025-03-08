export const TotalAmount=(data:any)=>{
    const total = data.reduce((accumulator:number, currentValue:any)=>{
                    return accumulator+(currentValue.amount || currentValue.price)
                },0)
    return total
}

export const TotalUnit =(data:any)=>{
    const totalUnit = data.reduce((accumulator:number, currentValue:any)=>{
            return accumulator+currentValue.unit
    },0)
    return totalUnit
}

export const TotalActive = (data:any)=>{
    let val = 0
    const totalActive = data.map((it:any)=>{
        if(it.active){
            val++
        }
    })
    return val;
}

export const TotalActiveMonthly = (data:any)=>{
   
    let total = data
        .filter((item:any) => item.paid === "monthly") 
        .reduce((accumulator:number, currentValue:any) => accumulator + currentValue.price, 0); // Sum their prices

    return total;

    
}

export const TotalActiveYearly = (data:any)=>{    
    let total = data
        .filter((item:any) => item.paid === "yearly") 
        .reduce((accumulator:number, currentValue:any) => accumulator + currentValue.price, 0); 
    return total;

    
}