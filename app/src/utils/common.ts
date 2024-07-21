import { formatDistanceToNow, fromUnixTime } from "date-fns";
import { Dimensions } from "react-native";

const layoutDimension = Dimensions.get('window')

const portTimeFormat = (time: number) => {
    return formatDistanceToNow(fromUnixTime(time), { addSuffix: true })
}

const formatTimeLocale = (time: number) => {
    return new Date(time * 1000).toLocaleString()
}

export {layoutDimension, portTimeFormat, formatTimeLocale}
