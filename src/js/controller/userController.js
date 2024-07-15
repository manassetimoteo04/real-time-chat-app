import { getCurrentUser } from "../model/services/login";
import View from "../view/View";
export const controlUser = async function () {
  const user = await getCurrentUser();
  !user?.role && View.redirectLogin();
  user?.role && View.redirectApp();
};
