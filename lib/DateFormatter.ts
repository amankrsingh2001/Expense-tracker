export const DateFormatter = (date:any)=>{
    // console.log(date)
    const currDate:Date = new Date(date)
    const dd = String(currDate.getDate()).padStart(2,'0')
    const yy = String(currDate.getFullYear())
    const mm = date.toLocaleString("en-US", { month: "short" });
    const formatDate = `${dd} ${mm} ${yy}`
    // console.log(formatDate)
    return formatDate
}