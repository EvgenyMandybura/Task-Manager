import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import stylesDatePicker from "./formikStyles.scss";

const DatesPicker = ({ field, form }) => {
  const { setFieldValue } = form;
  const [date, setDate] = useState(new Date());
  const handleChange = (date) => {
    setDate(date);
    setFieldValue(field.name, date);
  };
  return (
    <DatePicker selected={date} onChange={handleChange} label="Set Due date" />
  );
};

export default DatesPicker;
