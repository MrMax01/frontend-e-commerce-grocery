import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import { Button, Card, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

const ProfileSettings = () => {
  const myToken = useSelector((state) => state.userToken.content);
  const [profile, setProfile] = useState(null);
  const [urlImg, setUrlImg] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const previewImg = (event) => {
    console.log(event);
    const [file] = event.target.files;
    if (file) {
      setUrlImg(URL.createObjectURL(file));
    }
  };
  const photoInput = useRef(null);

  const handleClick = () => {
    photoInput.current.click();
  };
  const handleSubmitPhoto = (event) => {
    event.preventDefault();
    const form = document.querySelector(`#photoForm`);
    const formData = new FormData(form);
    console.log(formData);

    // dispatch(pictureForMyProduct(myToken, formData, productId));

    handleClose();
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    //dispatch(updateMyProduct(myToken, savedProduct, productId));
    console.log(profile);
  };
  useEffect(() => {
    fetch("http://localhost:8080/me", {
      headers: {
        Authorization: "Bearer " + myToken,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nella risposta del server");
        }
      })
      .then((me) => {
        console.log(me);
        setProfile({
          name: me.name,
          partitaIva: me.partita_iva,
          email: me.email,
          telephone: me.telephone,
          surname: me.surname,
          region: me.region,
          city: me.city,
          via: me.via,
          company_name: me.company_name,
        });
        setUrlImg(me.avatar);
      })
      .catch((error) => {
        console.error("Errore durante la richiesta del profilo:", error);
        // Puoi gestire gli errori qui se necessario
      });
  }, [myToken]);

  return (
    <>
      <NavBar />

      <Container fluid className="bg-dashborad-color d-flex pb-5 min-height-100">
        {profile && (
          <Row xs={1} lg={2} className="mt-2 w-100">
            <Col>
              <Card className="shadow mt-2">
                <Card.Img variant="top" src={urlImg} />
                <Card.Body>
                  <Button className="primary-button" onClick={handleShow}>
                    Upload
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="card-style w-100 my-2 shadow border-0">
                <Form onSubmit={handleSumbit}>
                  <Card.Body>
                    <Card.Title>
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={profile.name}
                        defaultValue={profile.name}
                        onChange={(e) => {
                          setProfile({ ...profile, name: e.target.value });
                        }}
                      />
                    </Card.Title>
                    <Card.Title>
                      <Form.Label>surname</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={profile.surname}
                        defaultValue={profile.surname}
                        onChange={(e) => {
                          setProfile({ ...profile, surname: e.target.value });
                        }}
                      />
                    </Card.Title>
                    <Card.Title>
                      <Form.Label>email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={profile.email}
                        defaultValue={profile.email}
                        onChange={(e) => {
                          setProfile({ ...profile, email: e.target.value });
                        }}
                      />
                    </Card.Title>
                    <Card.Title>
                      <Form.Label>Company name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={profile.company_name}
                        defaultValue={profile.company_name}
                        onChange={(e) => {
                          setProfile({ ...profile, company_name: e.target.value });
                        }}
                      />
                    </Card.Title>
                    <Card.Title>
                      <Form.Label>Telephone</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder={profile.telephone}
                        defaultValue={profile.telephone}
                        onChange={(e) => {
                          setProfile({ ...profile, telephone: e.target.value });
                        }}
                      />
                    </Card.Title>
                    <Card.Title>
                      <Form.Label>Partita IVA</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder={profile.partitaIva}
                        defaultValue={profile.partitaIva}
                        onChange={(e) => {
                          setProfile({ ...profile, partitaIva: e.target.value });
                        }}
                      />
                    </Card.Title>

                    <Button type="submit" className="primary-button">
                      Salva
                    </Button>
                  </Card.Body>
                </Form>
              </Card>
            </Col>
            <Modal show={show} onHide={handleClose} className="mt-3" keyboard={true}>
              <Form onSubmit={handleSubmitPhoto} id="photoForm">
                <Modal.Header closeButton>
                  <Modal.Title>
                    <p>Carica una Immagine</p>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Image src={urlImg} alt="Preview" className="w-100" />
                </Modal.Body>
                <Modal.Footer>
                  <Form.Control type="file" className="d-none" name="avatar" onChange={previewImg} ref={photoInput} />
                  <Button onClick={handleClick}>Add Photo</Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </Row>
        )}
      </Container>
    </>
  );
};
export default ProfileSettings;
