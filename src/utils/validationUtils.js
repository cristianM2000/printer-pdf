export const isValidURL = (url) => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  if (!urlRegex.test(url)) {
    return false;
  }
  return true;
};

export const ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
export const ERR_NOT_FOUND = 1;
