import React, { useEffect, useState } from "react";
import Modal from 'react-modal';

import moment from "moment";
import DateTimePicker from 'react-datetime-picker';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import { eventAddNew, eventClearActive, eventUpdated } from "../../actions/calendar";

const customStyles = {
   content: {
     top: '50%',
     left: '50%',
     right: 'auto',
     bottom: 'auto',
     marginRight: '-50%',
     transform: 'translate(-50%, -50%)',
   },
 };

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
   title: '',
   notes: '',
   start: now.toDate(),      
   end: nowPlus1.toDate()
}

export const CalendarModal = () => {

   const { modalOpen } = useSelector(state => state.ui );
   const { activeEvent } = useSelector(state => state.calendar );
   const dispatch = useDispatch();

   const [ dateStart, setDateStart ] = useState( now.toDate() );
   const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
   const [ titleValid, setTitleValid ] = useState(true);

   const [formValues, setFormValues] = useState(initEvent);   
   const { title, notes, start, end } = formValues;

   useEffect( () => {
      if (activeEvent) setFormValues(activeEvent);
      else setFormValues(initEvent);
   }, [activeEvent])

   const handleInputChange = ({ target }) => {
      setFormValues({
         ...formValues,
         [target.name]: target.value
      })
   }

   const handleStartDate = (e) => {
      setDateStart(e);
      setFormValues({
         ...formValues,
         start: e
      });
   }

   const handleFinishDate = (e) => {
      setDateEnd(e);
      setFormValues({
         ...formValues,
         end: e
      });
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      const momentStart = moment(start);
      const momentEnd = moment(end);

      if ( momentStart.isSameOrAfter(momentEnd) ) return Swal.fire('ERROR', 'La fecha de fin debe de ser mayor a la de inicio', 'error');
      else if (momentStart._isValid === false) return Swal.fire('ERROR', 'La fecha de inicio no puede estar vacía', 'error'); 

      if (title.trim().length < 2) return setTitleValid(false);

      setTitleValid(true);

      // Comprobamos si hay un evento activo para saber si hay que actualizar o añadir un nuevo evento.
      if (activeEvent) dispatch( eventUpdated(formValues) )
      else {
         dispatch( eventAddNew({ ...formValues, id: new Date().getTime(), user: { id: 123, name: 'Carlos' } }) );
      }
      closeModal();
   }

   const closeModal = () => {
      dispatch( uiCloseModal() );
      dispatch( eventClearActive() );
      setFormValues(initEvent);
   }

   return (
      <Modal className="modal" overlayClassName="modal-fondo" isOpen={ modalOpen }  /*onAfterOpen={ afterOpenModal } */ onRequestClose={ closeModal } closeTimeoutMS={200} style={customStyles}>

         { ( activeEvent ) ? <h1>Editar evento</h1> : <h1>Nuevo evento</h1> }
         <form className="container" onSubmit={ handleSubmit }>

            <div className="form-group">
               <label>Fecha y hora inicio</label>
               <DateTimePicker className="form-control" onChange={ handleStartDate } value={ dateStart } />
            </div>

            <div className="form-group">
               <label>Fecha y hora fin</label>
               <DateTimePicker className="form-control" value={ dateEnd } minDate={ dateStart } onChange={ handleFinishDate } />
            </div>

            <div className="form-group">
               <label>Titulo y notas</label>
               <input type="text" className={`form-control ${ !titleValid && 'is-invalid' }`} placeholder="Título del evento" name="title" value={ title } onChange={ handleInputChange } autoComplete="off"/>
               <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
               <textarea type="text" className="form-control" name="notes" value={ notes } onChange={ handleInputChange } placeholder="Notas" rows="5"></textarea>
               <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button type="submit" className="btn btn-outline-primary btn-block">
               <i className="far fa-save"></i>
               <span> Guardar</span>
            </button>

         </form>
      </Modal>
   )
}