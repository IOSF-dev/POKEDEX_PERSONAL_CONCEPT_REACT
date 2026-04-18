const SESSION_KEY = "pdx_user";

export const  getSession = ()=> {
  const raw = localStorage.getItem(SESSION_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export const saveSession = (payload) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
}

export const clearSession = ()=> {
  localStorage.removeItem(SESSION_KEY);
}