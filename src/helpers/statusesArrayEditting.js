import ToastrService from "../services/ToastrService";

export const statusesArrayEdditing = (statuses, newStatus) => {
  if (statuses.includes(newStatus)) {
    ToastrService.warn("column already exists");
    return false;
  }
  statuses.push(newStatus);
  return statuses;
};

export const removeStatusesFromArray = (statuses, currentStatus) => {
  if (statuses.length < 2) {
    ToastrService.warn("The last column cannot be deleted");
    return false;
  }
  let index = statuses.indexOf(currentStatus);
  if (index > -1) {
    statuses.splice(index, 1);
  }
  return statuses;
};
