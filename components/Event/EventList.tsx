import { EventItem } from '@/components/index';

const EventList = ({ items, token, dashboard }: { items?: any; token?: string; dashboard?: boolean }) => (
  <>
    {items.map((item) => (
      <EventItem key={item.id} {...item} token={token} dashboard={dashboard} />
    ))}
  </>
);

export default EventList;
