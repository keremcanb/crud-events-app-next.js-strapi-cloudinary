export type Event = {
  id: number;
  name: string;
  slug: string;
  performers: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  description: string;
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
  // token: string;
  // isDashboard: boolean;
};

export interface Events {
  events: Event[];
  length: number;
  // page: number;
  // total: number;
  // map: any;
  // filter: any;
}
