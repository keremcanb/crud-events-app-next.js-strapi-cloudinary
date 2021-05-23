import { EventItem } from '@/components/index';

const EventList = ({ items }) => (
  <>
    {items.map((item) => (
      <EventItem key={item.id} {...item} />
    ))}
  </>
);

export default EventList;
