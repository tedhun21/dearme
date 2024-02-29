export const setCookie = (access_token: string) => {
  document.cookie = `access_token=${access_token}; Max-Age=3600; path=/;`;
};

export const getCookie = (cookieName: string) => {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return value;
      }
    }
    return null;
  }
};

export const deleteCookie = () => {};
