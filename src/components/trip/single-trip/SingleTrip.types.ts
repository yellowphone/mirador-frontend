import { ManyElementDataProps } from '../create-trip/CreateTrip.types';

export interface SingleTripProps {
  data: FindTripByIdObject;
  elements: ManyElementDataProps;
}

export interface FindTripByIdObject {
  pktrip: number;
  title: string;
  summary: string;
  mongoid: string;
  created_on: Date;
  public_identifier: string;
  user_trips: UserTrips;
  users: Users;
  trip_tags: ExperienceTags;
}

export interface ExperienceTags {
  pkblog_tag: number;
  tags: {
    tag: string;
  }[];
}

export interface UserTrips {
  users: {
    username: string;
  }[];
}

export interface Users {
  users: {
    pkuser: number;
  };
}
