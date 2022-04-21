import React, { useState } from 'react';
import {Button, Form, Input, DatePicker, Space, Card,  Modal, Upload} from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;


const FormItem = Form.Item;
const {TextArea} = Input;

const CreateEvent = () => {

  const [picture, setPicture] = useState({
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: '',
      status: '',
    }],
  })
  const [event, setEvent] = useState({
    city: "",
    address: "",
    place: ""
  });

  const saveInfo = values => {
    console.log(values);
  };

  const handleCancel = () => setPicture({...picture, previewVisible: false});

  const handlePreview = (file) => {
    console.log(file);
    setPicture({ ... picture,
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  const handleChange = ({fileList}) => setPicture({...picture, fileList: fileList});
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  console.log(event);
  return (
    <div  className='create-event'>
      <h3> Créer un événement </h3>
    
      <Form name="dynamic_form_nest_item" className='form-create-event'  onFinish={saveInfo} >
        <FormItem rules={[{required: true, message: 'Please input your username!\'}'}]} name="title">
          <Input
              placeholder="Titre" />
        </FormItem>
        <FormItem rules={[{required: true, message: 'Please input your username!\'}'}]} name="description">
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
                rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <RangePicker className="gx-mb-3 gx-w-75" />
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Form.Item>
                <Space  >
                  <Form.Item
                    {...restField}
                    name={[name, 'place']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                  >
                    <Input placeholder="Lieu" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'city']}
                    rules={[{ required: true, message: 'Missing last name' }]}
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
                Add field
              </Button>
            </Form.Item>
            </>
          )}
        </Form.List>


        <Card title="UploadPicture" className="gx-card clearfix">
          <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            fileList={picture.fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {picture.fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Modal visible={picture.previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{width: '100%'}} src={picture.previewImage}/>
          </Modal>
        </Card>

        <FormItem>
          <Button className="gx-mb-0"
                  type="primary"
                  htmlType="submit"
          >
            Log in
          </Button>
        </FormItem>


      </Form>
    </div>
  )
};

export default CreateEvent