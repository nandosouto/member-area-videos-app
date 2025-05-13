
export interface Lesson {
  id: number;
  title: string;
  coverImage: string;
  videoUrl: string;
  isWistia: boolean;
  mediaId?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
