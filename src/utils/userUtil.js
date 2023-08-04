export const checkUserInfoIsCompleted = (user) => {
  if (user) {
    const { address, dob, gender, name } = user;
    if (address && dob && gender && name) {
      return true;
    }
    return false;
  }

  return false;
};
