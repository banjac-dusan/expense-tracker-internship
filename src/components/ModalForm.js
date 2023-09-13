import React, { useId, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
const url = "http://localhost:3000/";

function ModalForm() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [select, setSelect] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const time = `${new Date().toLocaleDateString(
    "en-GB"
  )} ${new Date().toLocaleTimeString("en-GB")}`;
  const id = useId();

  const urlExtension = select === "expense" ? "expenses" : "incomes";

  const onSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    try {
      const res = await axios.post(`${url}${urlExtension}`, {
        id,
        name,
        description,
        amount,
        time,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setShow(false);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSelectChange = (event) => {
    setSelect(event.target.value);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Expense/Income
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Form.Select
              aria-label="Default select example"
              required
              onChange={onSelectChange}
            >
              <option value="">Select Group</option>
              <option value="expense">Expense Group</option>
              <option value="income">Income Group</option>
            </Form.Select>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={onNameChange}
                required
                type="text"
                placeholder="Please full the empty field"
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Name not specified
              </Form.Control.Feedback>

              <Form.Label>Amount</Form.Label>
              <Form.Control
                onChange={onAmountChange}
                required
                type="number"
                placeholder="Please enter amount €..."
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Amount not specified
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Desciption</Form.Label>
              <Form.Control
                onChange={onDescriptionChange}
                required
                type="text"
                placeholder="Please enter a description..."
                as="textarea"
                rows={2}
              />
              <Form.Control.Feedback type="invalid">
                Description not specified
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalForm;
