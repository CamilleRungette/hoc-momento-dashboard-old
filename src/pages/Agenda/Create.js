import React from 'react';
import {Button, Form, Card, Input} from "antd";

const FormItem = Form.Item;

const CreateEvent = () => {

  return (
    <div  className='create-event'>
      <h3> Créer un événement </h3>
    
      <Form>
      <FormItem  name="uaername">

<Input 
       placeholder="Username"/>
</FormItem>

      </Form>
    </div>
  )
};

export default CreateEvent