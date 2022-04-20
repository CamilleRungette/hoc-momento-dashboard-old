import React, { useEffect, useState } from 'react';
import axios from "axios";
import { url, Card, Collapse } from "./_index.js";

const Panel = Collapse.Panel;


const Agenda = () => {

  const [events, setEvents] = useState([]);
  const [eventsYear, setEventsYear] = useState([]);
  const date = new Date();
  const thisYear = date.getFullYear();
  const years = [2023, 2022, 2021, 2020,  2019, 2018];
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]


  useEffect(() => {
    axios.get(`${url}/events`)
    .then(res => {
      if (res.status === 200) {
        setEvents(res.data);
        let array = [];
        res.data.forEach(event => {
          array.push(new Date(event.show[0].startDate).getFullYear());
        });
        setEventsYear(array);
      };
    })
    .catch(err => {
      console.log("error:", err);
    })
  },[]);

  console.log(events);

  return (
    <div className='agenda-main'>
      <Card className="gx-card" title="Agenda">
        {years.map(year => (
          eventsYear.includes(year) &&
          <div>
            <h3>{year} </h3>
            <Collapse defaultActiveKey={['1']} key={year} >
              {events.map(event => (
                new Date(event.show[0].startDate).getFullYear() === year &&
                <Panel header={event.title} key={event._id}>
                  {event.show.map(date => (
                    <div className='event-date'>
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
    </Card>
    </div>
  )
};

export default Agenda;