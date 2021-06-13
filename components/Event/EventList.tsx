import { EventItem } from '@/components/index';
import { IEventList } from '@/types/types';

const EventList = ({ events, token, isDashboard }: IEventList) => (
  <div className="flex flex-wrap flex-col md:flex-row space-x-2 justify-center items-center">
    {events.map((event) => (
      <EventItem key={event.id} {...event} token={token} isDashboard={isDashboard} />
    ))}
  </div>
);

export default EventList;
