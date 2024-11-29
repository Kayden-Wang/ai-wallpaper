export type Wallpaper = {
  id?: string;
  img_url: string;
  img_size?: string;
  description?: string;
  user_nickname?: string;
  user_avatar?: string;
  model_used?: string;
  user_email: string;
  model_parameters?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
};
