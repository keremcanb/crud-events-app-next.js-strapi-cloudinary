import { EventItem } from '@/components/index';
import { Events } from '@/types/event';

const EventList = ({ events, token, isDashboard }: { events: Events; token: string; isDashboard: boolean }) => (
  <div className="flex flex-wrap flex-col md:flex-row space-x-2 justify-center items-center">
    {events.map((event) => (
      <EventItem key={event.id} {...event} token={token} isDashboard={isDashboard} />
    ))}
  </div>
);

export default EventList;
