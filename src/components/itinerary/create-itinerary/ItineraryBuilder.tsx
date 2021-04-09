import React, { useState, FC } from 'react';
import { EmptyItinerary } from './EmptyItinerary';
import { ActiveItinerary } from './ActiveItinerary';

export type Itinerary = {
  content: string[];
  date: string;
};

export const ItineraryBuilder: FC = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  const onItineraryCreate = (input: { start: string; end: string }) => {
    if (input.start <= input.end) {
      const start = new Date(input.start);
      const end = new Date(input.end);
      start.setDate(start.getDate() + 1);
      end.setDate(end.getDate() + 1);
      for (start; start <= end; start.setDate(start.getDate() + 1)) {
        const newDate = new Date(start);
        const month = ('0' + (newDate.getMonth() + 1).toString()).slice(-2),
          day = ('0' + newDate.getDate().toString()).slice(-2),
          year = newDate.getFullYear().toString();
        setItineraries(obj => [
          ...obj,
          { date: `${month}/${day}/${year}`, content: [] },
        ]);
      }
    } else {
      alert('Date range is not valid! Try again!');
    }
    console.log(input);
  };

  return itineraries.length === 0 ? (
    <EmptyItinerary onItineraryCreate={onItineraryCreate} />
  ) : (
    <ActiveItinerary
      itineraries={itineraries}
      setItineraries={setItineraries}
    />
  );
};
