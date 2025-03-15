export const DateFormatter = (date:any)=>{

    const currDate:Date = new Date(date)
    const dd = String(currDate.getDate()).padStart(2,'0')
    const yy = String(currDate.getFullYear())
    const mm = date.toLocaleString("en-US", { month: "short" });
    const formatDate = `${dd} ${mm} ${yy}`
    return formatDate
}