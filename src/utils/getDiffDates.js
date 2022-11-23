import dayjs from "dayjs";

export const getDiffDates = (date) => dayjs(date).diff(dayjs());