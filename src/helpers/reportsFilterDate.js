import ToastrService from "../services/ToastrService";
import {
    FINISH_DATE_IS_INCORRECT,
    DATE_RANGE_IS_INCORRECT,
} from "../constants/validationErrors";
import { MILLISECONDS_IN_24HOURS } from "../constants/timeConstants";

const filterDates = (values) => {
    const { startDate, finishDate } = values;
    if (finishDate - startDate < 0) {
        ToastrService.warn(FINISH_DATE_IS_INCORRECT);
        return false;
    }
    if ((finishDate - startDate) / MILLISECONDS_IN_24HOURS > 32) {
        ToastrService.warn(DATE_RANGE_IS_INCORRECT);
        return false;
    }
    return true;
};

export default filterDates;
