// const DASHBOARD_BASE_URL = "http://localhost:3000/";
const DASHBOARD_BASE_URL = "https://article-quiz.orensayag.tech/";
export default {
  LOGIN: DASHBOARD_BASE_URL + "auth/login?loginFromExtension=true",
  GET_USER_INFO_ENDPOINT: DASHBOARD_BASE_URL + "api/me",
  UPDATE_ENABLED_SITES_ENDPOINT: DASHBOARD_BASE_URL + "api/enabled-sites",
  QUIZ_ENDPOINT: DASHBOARD_BASE_URL + "api/quiz",
  HISTORY_ENDPOINT: DASHBOARD_BASE_URL + "api/quizzes-history",
  TICKETS_ENDPOINT: DASHBOARD_BASE_URL + "dashboard/support",
};
