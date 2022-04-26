import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { url, BasicModal, CreateEvent } from "./_index.js";
import {Collapse, Card} from "antd";

const Panel = Collapse.Panel;

const Agenda = () => {

  const modalRef = useRef();

  const [events, setEvents] = useState([]);
  const [eventsYear, setEventsYear] = useState([]);
  const date = new Date();
  const thisYear = date.getFullYear();
  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020,  2019, 2018];
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]


  useEffect(() => {
    axios.get(`${url}/events`)
    .then(res => {
      if (res.status === 200) {
        setEvents(res.data);
        let array = [];
        res.data.forEach(event => {
          array.push(new Date(event?.dates[0].startDate).getFullYear());
        });
        setEventsYear(array);
      };
    })
    .catch(err => {
      console.log("error:", err);
    })
  },[]);

  const showModal = () => {
    modalRef.current.showModal()
  };

  const closeModal = () => {
    modalRef.current.closeModal();
  };

  return (
      <Card className="gx-card agenda-main " title="Agenda">
      <i className="icon icon-add" onClick={showModal} />
        {years.map((year, i) => (
          eventsYear.includes(year) &&
          <div className='year' key={year+1}>
            <h3>{year} </h3>
            <Collapse defaultActiveKey={i}  >
              {events.map(event => (
                new Date(event.dates[0].startDate).getFullYear() === year &&
                <Panel header={event.title} key={event._id}>
                  {event.dates.map(date => (
                    <div key={Math.floor(Math.random() * 10000)} className='event-date'>
                      <div className='date'>
                        <p>
                          {new Date(date.startDate).getDate() === new Date(date.endDate).getDate() ?
                            <span>Le {new Date(date.startDate).getDate()} {months[new Date(date.startDate).getMonth() +1]} </span>
                          : 
                          <span>
                            Du {new Date(date.startDate).getDate()} 
                              {new Date(date.startDate).getMonth() !== new Date(date.endDate).getMonth() ? (
                              <span> {months[new Date(date.startDate).getMonth() +1]} </span>
                              ):( <> </>)}
                            au {new Date(date.endDate).getDate()} {months[new Date(date.endDate).getMonth() +1]}
                          </span>}
                        </p>
                        
                        <p>{date.place} </p>

                        <p>{date.address ? <span>{date.address},</span> : <></>} {date.city ? date.city : <></>}</p>

                      </div>
                        <div className='event-presentation'>
                          <p>{event.description}</p>

                          <div className='div-img'>
                            <img src={event.photo} alt={event.title} />
                          </div>
                        </div>
                    </div>
                  ))}
                </Panel>
              ))}
            </Collapse>
          </div>
        ))}
        <BasicModal ref={modalRef} content={<CreateEvent closeModal={closeModal} />} />
    </Card>
  )
};

export default Agenda;