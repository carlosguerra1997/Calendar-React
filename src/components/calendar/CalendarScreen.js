import React, { useState } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { Calendar, momentLocalizer } from 'react-big-calendar'

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';

import moment from 'moment';
import 'moment/locale/es';
import { CalendarModal } from './CalendarModal';
moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

   const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

   const onDoubleClick = (e) => {

   }

   const onSelectEvent = (e) => {

   }

   const onViewChange = (e) => {
      setLastView(e);
      localStorage.setItem('lastView', e);
   }

   const eventStyleGetter = (event, start, end, isSelected) => {
      const style = {
         backgroundColor: '#367CF7',
         borderRadius: '0px',
         opacity: 0.8,
         display: 'block',
         color: 'white'
      }
      return { style };
   }

   const events = [{
      title: 'Cumpleaños del jefe',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgcolor: '#fafafa',
      notes: 'Comprar el pastel',
      user: { _id: '123', name: 'Carlos' }
   }];

   return (
      <div className="calendar-screen">
         <Navbar />
         <Calendar 
            localizer={localizer} 
            events={events} 
            startAccesor="start" 
            endAccesor="end" 
            messages={messages} 
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={ onDoubleClick }
            onSelectEvent= { onSelectEvent }
            onView={ onViewChange }
            view={lastView}
            components={{ event: CalendarEvent }} />

         <CalendarModal />
      </div>
   )
}