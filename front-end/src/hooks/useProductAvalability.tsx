import dayjs from "dayjs"

export const useProductAvalability = (date: string | null): [boolean, string] => {
    const utcAvalabilityDate = dayjs.utc(date)
    const utcPresentDate = dayjs.utc()
    const isAvaliable =  utcAvalabilityDate.isBefore(utcPresentDate) || utcAvalabilityDate.isSame(utcPresentDate)
    const localAvaliableFrom = utcAvalabilityDate.local().format('YYYY-MM-DD')

    return [isAvaliable, localAvaliableFrom]
}