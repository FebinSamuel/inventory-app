import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Button, Modal } from "react-bootstrap";
import databaseServices from "../components/services/database.services";
import { useReactToPrint } from "react-to-print";

export default function Invoice({ id }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ error: false, msg: "" });
  const componentRef = useRef();
  useEffect(() => {
    editHandler();
  }, []);

  const editHandler = async () => {
    try {
      const docSnap = await databaseServices.getPolicy(id);
      console.log(docSnap.data());
      setFormData(docSnap.data());
    } catch (error) {
      setMessage({ error: true, msg: error.message });
      //   setShowAlert(true)
    }
  };
  console.log(formData);
  const handleShow = () => setShow(true);
  const closeModal = () => {
    setShow(false);
    // window.location.reload();
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="btn btn-sm btn-success"
      >
        Bill
      </Button>
      <Modal show={show} onHide={closeModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Sales Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBContainer className="py-5 ">
            <MDBCard className="p-4 ml-10" ref={componentRef}>
              <MDBCardBody>
                <MDBContainer className="mb-2 mt-3">
                  <MDBRow className="d-flex align-items-baseline">
                    <MDBCol xl="9">
                      <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                        Invoice &gt; &gt;{" "}
                        <strong>ID: #{formData.orderId}</strong>
                      </p>
                    </MDBCol>
                    <MDBCol xl="3" className="float-end">
                      {/* <MDBBtn
                        color="light"
                        ripple="dark"
                        className="text-capitalize border-0"
                        onClick={handlePrint}
                      >
                        <MDBIcon
                          fas
                          icon="print"
                          color="primary"
                          className="me-1"
                        />
                        Print
                      </MDBBtn> */}
                       <MDBBtn
        color="light"
        ripple="dark"
        className="text-capitalize border-0"
        onClick={handlePrint}
      >
        <MDBIcon fas icon="print" color="primary" className="me-1" />
        Print
      </MDBBtn>
                      <ReactToPrint
                        trigger={() => (
                          <MDBBtn
                            color="light"
                            ripple="dark"
                            className="text-capitalize border-0 ms-2"
                          >
                            <MDBIcon
                              far
                              icon="file-pdf"
                              color="danger"
                              className="me-1"
                            />
                            Export 
                          </MDBBtn>
                        )}
                        content={() => componentRef.current}
                      />
                      <hr />
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
                <MDBContainer>
                  <MDBCol md="12" className="text-center">
                    <MDBIcon
                      fab
                      icon="mdb"
                      size="4x"
                      className="ms-0 "
                      style={{ color: "#5d9fc5" }}
                    />
                    <p className="pt-0 fw-bold fs-4">Shakya Handicraft</p>
                  </MDBCol>
                </MDBContainer>
                <MDBRow>
                  <MDBCol xl="8">
                    <MDBTypography listUnStyled>
                      <li className="text-muted">
                        To:{" "}
                        <span style={{ color: "#5d9fc5" }}>
                          {formData.customerName}
                        </span>
                      </li>
                      {/* <li className="text-muted">Street, City</li> */}
                      <li className="text-muted">lalitpur,Nepal</li>
                      <li className="text-muted">
                        <MDBIcon fas icon="phone-alt" /> {formData.phoneNumber}
                      </li>
                    </MDBTypography>
                  </MDBCol>
                  <MDBCol xl="4">
                    <p className="text-muted">Invoice</p>
                    <MDBTypography listUnStyled>
                      <li className="text-muted">
                        <MDBIcon
                          fas
                          icon="circle"
                          style={{ color: "#84B0CA" }}
                        />
                        <span className="fw-bold ms-1">ID:</span>#
                        {formData.orderId}
                      </li>
                      <li className="text-muted">
                        <MDBIcon
                          fas
                          icon="circle"
                          style={{ color: "#84B0CA" }}
                        />
                        <span className="fw-bold ms-1">Creation Date: </span>
                        {formData.salesDate}
                      </li>
                      <li className="text-muted">
                        <MDBIcon
                          fas
                          icon="circle"
                          style={{ color: "#84B0CA" }}
                        />
                        <span className="fw-bold ms-1">Payment method: </span>
                        {formData.paymentMethod}
                      </li>
                      <li className="text-muted">
                        <MDBIcon
                          fas
                          icon="circle"
                          style={{ color: "#84B0CA" }}
                        />
                        <span className="fw-bold ms-1">Status:</span>
                        <span className="badge bg-success text-black fw-bold ms-1">
                          {formData.payment}
                        </span>
                      </li>
                    </MDBTypography>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="my-2 mx-1 justify-content-center">
                  <MDBTable striped borderless>
                    <MDBTableHead
                      className="text-white"
                      style={{ backgroundColor: "#84B0CA" }}
                    >
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <th scope="row">1</th>
                        <td>{formData.itemsName}</td>
                        <td>{formData.itemSold}</td>
                        <td>Rs. {formData.itemCost}</td>
                        <td>Rs. {formData.salesTotal}</td>
                      </tr>
                      {/* <tr>
                        <th scope="row">2</th>
                        <td>Web hosting</td>
                        <td>1</td>
                        <td>$10</td>
                        <td>$10</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Consulting</td>
                        <td>1 year</td>
                        <td>$300</td>
                        <td>$300</td>
                      </tr> */}
                    </MDBTableBody>
                  </MDBTable>
                </MDBRow>
                <MDBRow>
                  <MDBCol xl="8">
                    <p className="ms-3">
                      Add additional notes and payment information
                    </p>
                  </MDBCol>
                  <MDBCol xl="3">
                    <MDBTypography listUnStyled>
                      <li className="text-muted ms-3">
                        <span class="text-black me-4">SubTotal</span>Rs.{" "}
                        {formData.salesTotal}
                      </li>
                      <li className="text-muted ms-3 mt-2">
                        <span class="text-black me-4">Tax(0%)</span>-
                      </li>
                    </MDBTypography>
                    <p className="text-black float-start">
                      <span className="text-black me-3"> Total Amount</span>
                      <span style={{ fontSize: "25px" }}>
                        Rs. {formData.salesTotal}
                      </span>
                    </p>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol xl="10">
                    <p>Thank you for your purchase</p>
                  </MDBCol>
                  <MDBCol xl="2">
                    {/* <MDBBtn
                      className="text-capitalize"
                      style={{ backgroundColor: "#60bdf3" }}
                    >
                      Pay Now
                    </MDBBtn> */}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </Modal.Body>
      </Modal>
    </>
  );
}
