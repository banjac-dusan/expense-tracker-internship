import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const TableData = (props) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShow = () => setShow(true);
  const [edit, setEdit] = useState("");

  const findEditItem = (editId) => {
    const idemEditFound = data?.find((element) => element.id === editId);
    return idemEditFound;
  };
  console.log(findEditItem(editId)?.amount);

  const [validated, setValidated] = useState(false);
  const [nameEdit, setNameEdit] = useState("");
  const [amountEdit, setAmountEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/${props.url}`)
      .then((response) => setData(response.data));
  }, []);

  const handleOpenDeleteModal = (ID) => {
    setDeleteId(ID);
    setShow(true);
  };

  const handleShowEdit = (ID) => {
    setEditId(ID);
    setShowEdit(true);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/${props.url}/${deleteId}`)
      .then((response) => {
        axios
          .get(`http://localhost:3000/${props.url}`)
          .then((response) => setData(response.data))
          .finally(handleClose());
      });
  };

  useEffect(() => {
    setAmountEdit(findEditItem(editId)?.amount);
  }, [editId]);

  useEffect(() => {
    setNameEdit(findEditItem(editId)?.name);
  }, [editId]);

  useEffect(() => {
    setDescriptionEdit(findEditItem(editId)?.description);
  }, [editId]);

  const onNameEditChange = (event) => {
    setNameEdit(event.target.value);
  };

  const onDescriptionEditChange = (event) => {
    setDescriptionEdit(event.target.value);
  };

  const onAmountEditChange = (event) => {
    setAmountEdit(event.target.value);
  };

  const setDataEdit = (data) => {
    console.log(data);
  };

  const onSubmit = () => {
    const time = `${new Date().toLocaleDateString(
      "en-GB"
    )} ${new Date().toLocaleTimeString("en-GB")}`;
    axios
      .put(`http://localhost:3000/${props.url}/${editId}`, {
        name: nameEdit,
        description: descriptionEdit,
        amount: amountEdit,
        time,
      })
      .then((response) => {
        axios
          .get(`http://localhost:3000/${props.url}`)
          .then((response) => setData(response.data))
          .finally(handleCloseEdit());
      });
  };

  // EDIT MODAL

  return (
    <>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Editor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={onNameEditChange}
                required
                type="text"
                value={nameEdit}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Name not specified
              </Form.Control.Feedback>

              <Form.Label>Amount</Form.Label>
              <Form.Control
                onChange={onAmountEditChange}
                required
                type="number"
                value={amountEdit}
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
                onChange={onDescriptionEditChange}
                required
                type="text"
                value={descriptionEdit}
                as="textarea"
                rows={2}
              />
              <Form.Control.Feedback type="invalid">
                Description not specified
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseEdit}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/*       
      // MODAL DELETE */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Amount €</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((value, key) => {
            return (
              <tr key={key}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.description}</td>
                <td>{value.amount}</td>
                <td>{value.time}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleShowEdit(value.id)}
                  >
                    EDIT
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleOpenDeleteModal(value.id)}
                  >
                    DELETE
                  </Button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TableData;
