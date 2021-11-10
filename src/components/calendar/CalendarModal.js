import React, { useState } from "react";
import Modal from 'react-modal';

import moment from "moment";
import DateTimePicker from 'react-datetime-picker';

import Swal from 'sweetalert2';

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

export const CalendarModal = () => {

   const [ dateStart, setDateStart ] = useState( now.toDate() );
   const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
   const [ titleValid, setTitleValid ] = useState(true);

   const [formValues, setFormValues] = useState({
      title: 'Evento',
      notes: '',
      start: now.toDate(),
      end: nowPlus1.toDate()
   });   

   const { title, notes, start, end } = formValues;

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
      closeModal();
   }

   const closeModal = () => {

   }

   return (
      <Modal className="modal" overlayClassName="modal-fondo" isOpen={ true }  /*onAfterOpen={ afterOpenModal } */ onRequestClose={ closeModal } closeTimeoutMS={200} style={customStyles}>

         <h1> Nuevo evento </h1>
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