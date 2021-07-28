import React from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

const initialValues = {
  language: "en",
};

const FilterForm = () => {
  const { i18n } = useTranslation();
  const handleSubmitForm = (value) => {
    i18n.changeLanguage(value.language);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
      {({ values: { language }, handleChange, submitForm }) => {
        return (
          <select
            name="language"
            value={language}
            onChange={(e) => {
              handleChange(e);
              setTimeout(() => {
                submitForm();
              });
            }}
          >
            <option value="en">EN</option>
            <option value="ru">RU</option>
          </select>
        );
      }}
    </Formik>
  );
};

export default FilterForm;
