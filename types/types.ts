import { IEvent, IEvents } from '@/types/event';

export interface IEventsPage {
  events: IEvents;
  page: number;
  total: number;
}

export interface IEventList {
  events: IEvents;
  token?: string;
  isDashboard?: boolean;
}

export interface IDashboard {
  events: IEvents;
  token: string;
}

export interface IEventsIndex {
  eventsASC: IEvents;
  eventsDESC: IEvents;
}

export interface IEdit {
  event: IEvent;
  token: string;
}

export interface ISearch {
  events: IEvents;
  term: string;
}

export interface IFilter {
  handleFilter: (year: string, month: string) => void;
}

export interface IUpload {
  eventId: number;
  token: string;
  imagePreview: () => void;
}

export interface ILayout {
  children: React.ReactNode;
  title: string;
  keywords: string;
  description: string;
}

export interface IPagination {
  page: number;
  total: number;
}

export interface IBtnLink {
  link: string;
  text: string;
  color: string;
}

export interface IBtnOnClick {
  text: string;
  color: string;
  onClick?: () => void;
}

export interface IBtnSpinner {
  text: string;
  textLoading: string;
}
