import dayjs from "dayjs"

export const setDate = (date, format = 'DD/MM/YYYY')=>{
    return dayjs(date).format(format)
}