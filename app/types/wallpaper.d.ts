import { User } from "./user";

export type Wallpaper = {
  id?: string;
  img_url: string;
  img_size?: string;
  description?: string;
  model_used?: string;
  model_parameters?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  user?: User;
};
