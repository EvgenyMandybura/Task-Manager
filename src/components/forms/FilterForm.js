import React from "react";
import { connect } from "react-redux";
import { useRouteMatch, withRouter } from "react-router-dom";
import { filterTasks } from "../../redux/tasks/actions";
import createMemberArrayForSelect from "../../helpers/createMenberArrayForSelectFormik";
import { allStatus } from "../../constants/taskStatuses";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const FilterForm = ({ members, filterTasks }) => {
  const filterByStatus = (val) => {
    const values = { status: val.value, assignee: "" };
    const model = { values, boardId };
    filterTasks(model);
  };
  const filterByAssignee = (val) => {
    const values = { status: "", assignee: val.value };
    const model = { values, boardId };
    filterTasks(model);
  };
  const {
    params: { boardId },
  } = useRouteMatch("/board-details/:boardId");
  const { t } = useTranslation();
  return (
    <div className="filters">
      <div>
        <p className="sortTitle">{t("filterForm.filterByStatus")}</p>
        <Select
          placeholder={t("filterForm.filter")}
          options={allStatus}
          onChange={filterByStatus}
          className="sortField"
        />
      </div>
      <div>
        <p className="sortTitle">{t("filterForm.filterByAssignee")}</p>
        <Select
          placeholder={t("filterForm.status")}
          options={createMemberArrayForSelect(members)}
          onChange={filterByAssignee}
          className="sortField"
        />
      </div>
    </div>
  );
};
const mapStateToProps = () => ({});
export default withRouter(
  connect(mapStateToProps, { filterTasks })(FilterForm)
);
