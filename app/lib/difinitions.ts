export interface PostType {
  id: number;
  title: string;
  description: string;
  date: Date;
}

export interface State {
  errors?: {
    title?: string[];
    description?: string[];
  };
  message?: string | null;
};