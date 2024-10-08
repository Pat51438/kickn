// src/pages/MyEvents.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DataStore } from "@aws-amplify/datastore";
import { Event } from "../models";

const MyEventsContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const EventCard = styled.div`
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
`;

const MyEvents: React.FC = () => {
    const userId = '1';
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const userEvents = await DataStore.query(Event);
                setEvents(userEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();

        const subscription = DataStore.observe(Event).subscribe(() => fetchEvents());

        return () => subscription.unsubscribe();
    }, []);

    return (
        <MyEventsContainer>
            <h2>My Events</h2>
            {events.map((event: Event) => (
                <EventCard key={event.id}>
                    <h3>{event.activity}</h3>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.locationID}</p>
                </EventCard>
            ))}
        </MyEventsContainer>
    );
};

export default MyEvents;
