import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Space, notification } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import { url } from './_index';
import { Redirect } from "react-router-dom"

const { RangePicker } = DatePicker;


const FormItem = Form.Item;
const {TextArea} = Input;

const CreateEvent = ({closeModal}) => {
  
  const [dates, setDates] = useState([]);
  const [picture, setPicture] = useState();
  const [pictureName, setPictureName] = useState();
  const [redirect, setRedirect] = useState(false);
  
  const onChange = (value, dateString, key) => {
    let array = [... dates];
    array[key] = {startDate: dateString[0], endDate: dateString[1]};
    setDates(array);
  };
  
  const fileSelectedHandler = e => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'njetrqy4');
    formData.append('folder', "hoc-momento")
    setPicture(formData);

    setPictureName(e.target.files[0].name);
  };  

  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  const saveInfo = values => {
    let newEvent = {
      title: values.title, 
      description: values.description,
      dates: values.dates?.length ? values.dates.map(date => {
        return {
          address: date.address, 
          place: date.place, 
          city: date.city, 
        }
      }) : null,
      photo: null
    };

    newEvent.dates && newEvent.dates.forEach((date, i) => {
      date.startDate = dates[i].startDate;
      date.endDate = dates[i].endDate;
    });
    if (!newEvent.title || (!newEvent.dates || !newEvent.dates[0].startDate)){
      openNotificationWithIcon("warning", "Attention", 'Les champs "Titre" et "Dates" (début et fin) sont obligatoires')
    } else {
      if (picture) {  
        axios.post(process.env.REACT_APP_CLOUDINARY_URL, picture)
        .then(res => {
          newEvent.photo = res.data.secure_url;
          console.log(newEvent);

          axios.post(`${url}/dashboard/create-event`, newEvent)
          .then(res => {
            // ajouter event à redux;
            setPicture();
            setPictureName();
            closeModal();
            setRedirect(true);
          })
          .catch(error => {
            openNotificationWithIcon("error", "Erreur", "Erreur lors de la création de l'événement, veuillez réessayer plus tard")
            console.log(error);
          });
        })
        .catch(error => {
          openNotificationWithIcon("error", "Erreur", "Erreur lors du chargement de la photo, veuillez réessayer plus tard")
          console.log(error);
        })
      } else {
          axios.post(`${url}/dashboard/create-event`, newEvent)
          .then(res => {
            // ajouter event à redux;
            setPicture();
            setPictureName();
            closeModal();
            setRedirect(true);
          })
          .catch(error => {
            console.log(error);
          });
      };
    };
  };

  if (redirect) 
    return (<Redirect to="/agenda" />)
  else 
  
  return (
    <div  className='create-event'>
      <h3> Créer un événement </h3>
    
      <Form name="dynamic_form_nest_item" className='form-create-event'  onFinish={saveInfo} >
        <FormItem className='input'
        name="title">
          <Input
              placeholder="Titre" />
        </FormItem>
        <FormItem 
        name="description">
          <TextArea rows={4} placeholder="description" />
        </FormItem>

        <h4>Dates</h4> 
        <Form.List name="dates">
          {(fields, {add, remove}) => (
            <>
            {fields.map(({key, name, ...restField}) => (
              <div key={key}>
                <Form.Item
                {...restField}
                name={[name, 'date']}
                className="first-line-div"
                >
                  <RangePicker className="range-picker"
                   showTime={{format: 'HH:mm'}}
                   format="YYYY-MM-DD HH:mm"
                   placeholder={['Début', 'Fin']}
                   onChange={(value, dateString) => onChange(value, dateString, key)}
                  />

                  <MinusCircleOutlined className='delete-date' onClick={() => remove(name)} />
                </Form.Item>
                <Space className='address-space' >
                  <Form.Item
                    {...restField}
                    name={[name, 'place']}
                    className="input"
                  >
                    <Input placeholder="Lieu" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'city']}
                    className="input"
                    >
                    <Input placeholder="Ville" />
                  </Form.Item>
                 
                </Space>
                <Form.Item
                {...restField}
                name={[name, 'address']}
                >
                  <Input placeholder="Adresse" />
                </Form.Item>
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Ajouter une date
              </Button>
            </Form.Item>
            </>
          )}
        </Form.List>

        
        <h4>Télécharger une photo</h4> 
        
        {!pictureName ? 
          <div className="upload-picture">
            <input onChange={fileSelectedHandler} type="file" name="file" id="file" className="inputfile" />
            <label htmlFor="file" className='label'>
            <PlusOutlined className='plus-icon' />
              Ajouter</label>
          </div>
        :
        <div>
          <p>{pictureName} </p>
        </div>
          }

        <FormItem  className='button-div'>
          <Button className="gx-mb-0"
                  type="primary"
                  htmlType="submit"
          >
            Créer
          </Button>
        </FormItem>


      </Form>
    </div>
  )
};

export default CreateEvent