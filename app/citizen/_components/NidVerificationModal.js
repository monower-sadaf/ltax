'use client';

import NidVerifyform from '@/app/_components/FormControl/NidVerifyform';
import Login from '@/app/_components/Login';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

export default function NidVerificationModal() {
  const [openModal, setOpenModal] = useState(0);
  const props = { openModal, setOpenModal };

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [submittedData, setSubmittedData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form data here if needed

    // Create an object with the form data
    const formData = {
      name: name,
      dateOfBirth: dateOfBirth,
    };

    // Update the submittedData state with the new form data
    setSubmittedData([...submittedData, formData]);

    // Display submitted data in an alert message (optional)
    alert(`Submitted Data:\nName: ${name}\nDate of Birth: ${dateOfBirth}`);

    // Clear the form fields after submission
    setName('');
    setDateOfBirth('');
  };

  return (
    <>
    
      <Button onClick={() => props.setOpenModal('default')} 
            className="text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] text-primary border border-primary px-5 py-2 rounded-lg">যাচাই করুন</Button>
            
      <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>জাতীয় পরিচয়পত্রের তথ্য ভেরিফাই</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
                  <NidVerifyform/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)} className="text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] text-primary border border-danger px-5 py-2 rounded-lg">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


