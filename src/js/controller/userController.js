import { getCurrentUser } from "../model/services/login";
import View from "../view/View";
export const controlUser = async function () {
  try {
    const user = await getCurrentUser();
    !user && new View().redirectLogin();
    user && new View().redirectApp();
  } catch (error) {
    console.log(error);
  }
};
