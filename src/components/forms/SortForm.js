import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch, withRouter } from "react-router-dom";
import Select from "react-select";
import { useTranslation } from "react-i18next";

import { getListTasks } from "../../redux/tasks/actions";
import { sortFields } from "../../constants/sortFields";

const SortForm = ({ getListTasks }) => {
  const [value, setValue] = useState(sortFields[1].value);
  const handleSubmitForm = (values) => {
    setValue(values.value);
    const sortField = values.value;
    const model = { boardId, sortField };
    getListTasks(model);
  };
  const {
    params: { boardId },
  } = useRouteMatch("/board-details/:boardId");
  const { t } = useTranslation();
  return (
    <div>
      <p className="sortTitle">{t("sort.sort")}</p>
      <Select
        onChange={handleSubmitForm}
        options={sortFields}
        placeholder={t("sort.sort")}
        className="sortField"
      />
    </div>
  );
};
const mapStateToProps = () => ({});
export default withRouter(connect(mapStateToProps, { getListTasks })(SortForm));
