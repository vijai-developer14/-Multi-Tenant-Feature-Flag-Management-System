import {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
function Home() {
  const[name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const[password, setPassword] = useState('');

  const navigate = useNavigate();

  const [toggle, SetToggle] = useState(true);
  const [orgs, setOrgs] = useState([]);
  const API = "http://localhost:5000/api/organizations/public"
  const options = { credentials: "include" }

  // get all org names
  const getOrgs = async () => {
    const response = await fetch(API, options)
    const data = await response.json()
    setOrgs(data)
  }
  // Signup function
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({userName: name, email: email, orgId: company, password: password })
    });
    const data = await response.json();
    !response.ok ?console.log("error") : null;
    if (data.message === "User created successfully") {
      SetToggle(true);
    }
  };

  // Login function
const handleLogin = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email, password: password })
    })
    const data = await response.json()
    if (response.ok) {
        navigate("/admin-panel", {replace:"true"}) 
    } else {
        console.log(data.message)
    }
}

  useEffect(() => {
      getOrgs();
  }, [])
  return (
    <div>
      
      {toggle ?
        <form className="formBg" onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
          />
          <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          <button type="submit" className="formsbmt">Login</button>
        </form>
      :
      <form className="formBg" onSubmit={handleSignup}>
        <h1>Signup</h1>
          <input 
          type="text" 
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          />
          <input 
          type="email" 
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          />
          <input 
          type="password" 
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          />
          <label>Select Your Company</label>
          <select placeholder="" onChange={(e) => setCompany(e.target.value)}>
          {orgs.map((company)=>(
            <option value={company._id} key={company._id}>
              {company.name}
            </option>
          ))
          }
          </select>
          <button type="submit" className="formsbmt">Signup</button>
      </form>
      }

      <div >
        <button onClick={() => SetToggle(false)} className="signbtn">Signup</button>
        <button onClick={() => SetToggle(true)} className="loginbtn">Login</button>
      </div>

    </div>
  )
}

export default Home
