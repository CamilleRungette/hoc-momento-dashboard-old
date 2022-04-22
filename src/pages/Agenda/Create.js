import React, { useState } from 'react';
import {Button, Form, Input, DatePicker, Space} from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const {RangePicker} = DatePicker;


const FormItem = Form.Item;
const {TextArea} = Input;

const CreateEvent = () => {
  
  const [dates, setDates] = useState([]);
  const [picture, setPicture] = useState();
  
  function onChange(value, dateString, key) {
    let array = [... dates];
    array[key] = {startDate: dateString[0], endDate: dateString[1]};
    setDates(array);
  };
  
  const fileSelectedHandler = e => {
    setPicture(e.target.files[0]);
  };

  const saveInfo = values => {
    let newEvent = {
      title: values.title, 
      description: values.description,
      dates: values.dates.map(date => {
        return {
          address: date.address, 
          place: date.address, 
          city: date.city, 
        }
      }),
    };

    newEvent.dates.forEach((date, i) => {
      date.startDate = dates[i].startDate;
      date.endDate = dates[i].endDate;
    });
  };

  
  return (
    <div  className='create-event'>
      <h3> Créer un événement </h3>
    
      <Form name="dynamic_form_nest_item" className='form-create-event'  onFinish={saveInfo} >
        <FormItem className='input'
        // rules={[{required: true, message: 'Please input your username!\'}'}]} 
        name="title">
          <Input
              placeholder="Titre" />
        </FormItem>
        <FormItem 
        // rules={[{required: true, message: 'Please input your username!\'}'}]} 
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
                    rules={[{ required: true, message: 'Missing first name' }]}
                    className="input"
                  >
                    <Input placeholder="Lieu" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'city']}
                    rules={[{ required: true, message: 'Missing last name' }]}
                    className="input"
                    >
                    <Input placeholder="Ville" />
                  </Form.Item>
                 
                </Space>
                <Form.Item
                {...restField}
                name={[name, 'address']}
                rules={[{ required: true, message: 'Missing first name' }]}
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

        <div className="upload-picture">
          <input onChange={fileSelectedHandler} type="file" name="file" id="file" className="inputfile" />
          <label htmlFor="file" className='label'>
          <PlusOutlined className='plus-icon' />
            Ajouter</label>
        </div>

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