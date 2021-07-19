import ToastrService from "../services/ToastrService";

export const statusesArrayEdditing = (statuses, newStatus) => {
  if (statuses.includes(newStatus)) {
    ToastrService.warn("column already exists");
    return false;
  }
  statuses.push(newStatus);
  return statuses;
};
