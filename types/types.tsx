export interface IEventObj {
  token: string;
  event: {
    name: string;
    performers: string;
    venue: string;
    address: string;
    date: string;
    time: string;
    description: string;
    id: string;
    genre: string;
    featured: boolean;
    image: {
      formats: {
        medium: {
          url: string;
        };
        thumbnail: {
          url: string;
        };
      };
    };
  };
}

export interface IEvent {
  slug: string;
  id: number;
  name: string;
  date: string;
  token: string;
  genre: string;
  dashboard: boolean;
  image: {
    formats: {
      medium: {
        url: string;
      };
    };
  };
}

export interface IValues {
  name: string;
  performers: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  description: string;
  genre: string;
  featured: boolean;
}

export interface ILayout {
  children: React.ReactNode;
  title: string;
  keywords: string;
  description: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
