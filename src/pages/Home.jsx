// Prettier extension adds trailing commas in objects. I did not add these deliberately.

import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
 
  const [contactList, setContactList] = useState([
    {
      name: "Mariana David",
      phone: "123-456-7980",
      email: "e@mail.com",
      address: "100 rice st",
      id: 1,
    },
  ]);

  const createAgenda = () => {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        slug: "agendaMariana",
        id: 0,
      }),
    };
    fetch(store.baseURL + "/agendas/agendaMariana", options)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data.detail);
        console.log("createAgenda data :".data);
      });
  };

  const createDemoContacts = () => {
    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Your name",
        phone: "Your phone",
        email: "Your email",
        address: "Your address",
      }),
    };
    fetch(store.baseURL + "/agendas/agendaMariana/contacts", options)
      .then((resp) => resp.json())
      .then((data) => console.log("Data of Contacts: ", data));
  };

  const getContacts = () => {
    fetch(store.baseURL + "/agendas/agendaMariana/contacts")
      .then((resp) => resp.json())
      .then((data) => {
        setContactList(data.contacts);
      });
  };

  const deleteContact = (contactId) => {
    const options = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
    fetch(
      store.baseURL + "/agendas/agendaMariana/contacts/" + contactId,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setContactList(data.contacts);
        getContacts();
      });
  };



  useEffect(
    () => {
      createAgenda();
      getContacts();
    },
    []
  );

  return (
    <div className="text-center mt-5">
      <h1>My Contacts</h1>
      {/* {user} */}
      <button className="btn btn-success text-white">
        <Link to="/createcontact">Create new contact</Link>
      </button>

      <ul>
        {contactList.map((contactData) => {
          return (
            <li key={contactData.id}>
              <h2 className="row">
                <span className="col-10">
                  <i className="fa-regular fa-circle-user"></i>
                  {" " + contactData.name}
                </span>
                <span className="col-1">
                  <Link to="/changecontact">
                    <button className="transparentButton"
                    onClick={()=>{
                      dispatch({
                        type: "set-contactToChange",
                        payload: contactData
                      })
                    }}
                    >
                      <i className="fa-solid fa-pencil editIcon"></i>
                    </button>
                  </Link>
                </span>
                <span className="col-1">
                  <button className="transparentButton">
                    <i
                      className="fa-solid fa-trash-can editIcon"
                      onClick={() => {
                        contactList.length == 1 && createDemoContacts();
                        deleteContact(contactData.id);
                        window.location.reload();
                      }}
                    ></i>
                  </button>
                </span>
              </h2>
              <h3>
                <i className="fa-solid fa-location-dot"></i>
                {" " + contactData.address}
              </h3>
              <h3>
                <i className="fa-solid fa-phone"></i>
                {" " + contactData.phone}
              </h3>
              <h3>
                <i className="fa-solid fa-envelope"></i>
                {" " + contactData.email}
              </h3>
            </li>
          );
        })}
      </ul>

     
    </div>
  );
};