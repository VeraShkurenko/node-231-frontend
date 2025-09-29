import { useState } from 'react';
import './App.css'

function App() {
  const [txt, setTxt] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");



  const testGet = () => {
    fetch(
      "http://localhost:81/api/client"
    ).then(r => r.text()).then(j => {
      setTxt(j);
    })
  };
  const testPut = () => {
    fetch(
      "http://localhost:81/api/client", {
      method: 'Put'
    }
    ).then(r => r.text()).then(j => {
      setTxt(j);
    })
  };

    const testPatch = () => {
    fetch(
      "http://localhost:81/api/client", {
      method: 'Patch'
    }
    ).then(r => r.text()).then(j => {
      setTxt(j);
    })
  };

  const testDelete = () => {
    fetch(
      "http://localhost:81/api/client", {
      method: 'Delete'
    }
    ).then(r => r.text()).then(j => {
      setTxt(j);
    })
  };

  // POST /api/client

  const testPost = () => {
    console.log(name, email, phone);
    fetch("http://localhost:81/api/client", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({name, email, phone})
    })
      .then(r => {
        // console.log(r.headers.get("Content-Type"));
        if (r.status != 200) {
         setTxt(`Сервер відповів помилкою ${r.status}`);
        }
        else {
          let ct = r.headers.get("Content-Type");
          if (typeof ct == 'string' && ct.startsWith("application/json")) {
            r.json().then(j => setTxt(JSON.stringify(j)));
          }
          else {
            setTxt(`Відповідь Сервера не є JSON '${ct}'`);
          }
        }
      });
  };

  return <>
    <h1>Випробування API</h1>
    <button onClick={testGet}>GET</button>
    <div style={{ border: "1px solid lightgray", margin: "10px 0", padding: "5px" }}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} /> <br />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} /> <br />
      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} /> <br />
      <button onClick={testPut}>PUT</button>
      <button onClick={testPost}>POST</button>
      <button onClick={testPatch}>PATCH</button>
      <button onClick={testDelete}>DELETE</button>
    </div>
    <p>{txt}</p>
  </>;
}

export default App