import { EventItem } from '@/components/index';

const EventList = ({ items, token, dashboard }: { items?: []; token?: string; dashboard?: boolean }) => (
  <div className="flex flex-col md:flex-row justify-center items-center gap-5">
    {items.map((item) => (
      <EventItem key={item.id} {...item} token={token} dashboard={dashboard} />
    ))}
  </div>
);

export default EventList;
