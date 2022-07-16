export const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }

  return false;
};

export const checkAdmin = () => {
  if (checkAuth()) {
    const token = JSON.parse(localStorage.getItem("userInfo"));
    if (token.is_admin) {
      return true;
    } else return false;
  } else return false;
};
