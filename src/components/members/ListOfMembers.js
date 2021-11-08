import React from "react";
import { useTranslation } from "react-i18next";

const ListOfMembers = ({ savedMembers, membersFetched }) => {
  const members = !!savedMembers ? savedMembers : membersFetched;
  const { t } = useTranslation();
  return (
    <>
      {members.length > 0 && (
        <p className="listMembers">{t("members.listOfMembers")}</p>
      )}
      {members.map((member) => (
        <li key={member}>{member}</li>
      ))}
    </>
  );
};

export default ListOfMembers;
