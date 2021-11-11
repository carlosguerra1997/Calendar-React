import React, { useState } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { Calendar, momentLocalizer } from 'react-big-calendar'

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';

import moment from 'moment';
import 'moment/locale/es';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventSetActive } from '../../actions/calendar';
import { AddNewFav } from '../ui/AddNewFav';
import { DeleteEventFav } from '../ui/DeleteEventFav';
moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

   const dispatch = useDispatch();
   const { events, activeEvent } = useSelector( state => state.calendar );
   const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

   const onDoubleClick = (e) => {
      dispatch( uiOpenModal() );
   }

   const onSelectEvent = (e) => {
      dispatch( eventSetActive(e) );
   }

   const onViewChange = (e) => {
      setLastView(e);
      localStorage.setItem('lastView', e);
   }

   const onSelectSlot =(e) => {
      dispatch( eventClearActive() );
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
            onSelectSlot={onSelectSlot}
            selectable={true}
            onView={ onViewChange }
            view={lastView}
            components={{ event: CalendarEvent }} />

            <AddNewFav />
            { ( activeEvent ) && <DeleteEventFav /> }

         <CalendarModal />
      </div>
   )
}