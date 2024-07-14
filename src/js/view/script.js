feather.replace();
const messageContainer = document.querySelector(".conversation-box");
messageContainer.scrollTop = messageContainer.scrollHeight;
import { supabase } from "../model/createClient";
console.log(supabase);
