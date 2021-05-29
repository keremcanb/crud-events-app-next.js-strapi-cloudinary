export default interface IEvent {
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
};
