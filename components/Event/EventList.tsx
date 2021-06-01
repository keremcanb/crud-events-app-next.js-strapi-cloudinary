import { EventItem } from '@/components/index';

const EventList = ({ items, token, dashboard }: { items?: []; token?: string; dashboard?: boolean }) => (
  <div className="flex flex-wrap flex-col md:flex-row gap-x-2 gap-y-5 justify-center items-center">
    {items.map((item) => (
      <EventItem key={item.id} {...item} token={token} dashboard={dashboard} />
    ))}
  </div>
);

export default EventList;