import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import './info.css';

class AppointmentScheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: {},
      showModal: false, // Состояние для отображения/скрытия модального окна
      scheduledTime: '', // Состояние для времени, на которое записался пользователь
      currentDate: new Date() // Добавляем текущую дату в состояние компонента
    };
  }

  componentDidMount() {
    this.getAppointments();
  }

  getAppointments = () => {
    axios.get('https://polar-ridge-93106-f8dd6874faea.herokuapp.com/appointments')
      .then(response => {
        this.setState({ appointments: response.data });
      })
      .catch(error => {
        console.error('Ошибка при получении данных о записях на прием:', error);
      });
  };

  scheduleAppointment = (timeSlot) => {
    const { currentDate } = this.state;
    // Проверяем, является ли текущий день воскресеньем
    const isSunday = currentDate.getDay() === 0;

    if (isSunday) {
      this.setState({ showModal: true });
      return;
    }

    axios.post('https://polar-ridge-93106-f8dd6874faea.herokuapp.com/appointments', { timeSlot })
      .then(() => {
        const { appointments } = this.state;
        appointments[timeSlot] = 'busy';
        this.setState({ showModal: true, scheduledTime: timeSlot, appointments });
      })
      .catch(error => {
        console.error('Ошибка при записи на прием:', error);
      });
  };

  render() {
    const { appointments, showModal, scheduledTime, currentDate } = this.state;
    const dayNamesShort = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    const formattedDate = currentDate.toLocaleDateString('ru-RU', { year: 'numeric', month: 'short', day: '2-digit' });
    const formattedTime = currentDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    return (
      <div className="appointment-container_2">
        <div className='checking'>Записаться на прием</div>
        <div className="current-date">
          <span className="day">{dayNamesShort[currentDate.getDay()]}</span>
          <span className="date">{formattedDate}</span>
          <span className="time">{formattedTime}</span>
        </div>
        <div className="time-slots">
          {Object.keys(appointments).map(timeSlot => (
            <div key={timeSlot} className="time-slot">
              <p className="time-label">{timeSlot}</p>
              <button
                className={`btn_2 ${appointments[timeSlot] === 'busy' ? 'btn-busy_2' : ''}`}
                onClick={() => this.scheduleAppointment(timeSlot)}
                disabled={appointments[timeSlot] === 'busy'}
              >
                {appointments[timeSlot] === 'free' ? 'занять' : 'занято'}
              </button>
            </div>
          ))}
        </div>
        <Modal show={showModal} onHide={() => this.setState({ showModal: false })}>
          <Modal.Header closeButton>
            <Modal.Title>{currentDate.getDay() === 0 ? 'Сегодня не работаем!' : 'Вы записались на прием'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentDate.getDay() === 0 ? (
              <p>В воскресенье не работаем.</p>
            ) : (
              <>
                <p>Время: {scheduledTime}</p>
                <p>Дата: {formattedDate}</p>
                <p>День недели: {dayNamesShort[currentDate.getDay()]}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>Закрыть</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AppointmentScheduler;
