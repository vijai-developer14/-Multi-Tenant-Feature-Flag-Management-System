import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [companyList , setCompanyList] = useState([]);
  const [featureLists , setFeatureLists] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [featureId, setFeatureId] = useState("");
  const [featureMessage, setFeatureMessage] =useState();

  const getCompany = async ()=>{
    const API = "http://localhost:5000/api/organizations/public"
    const response = await fetch(API,{
      method:"GET",
      headers:{"Content-Type":"application/json"}
    })
    
    if(!response.ok) {console.error("error while getting company list")}
    const data = await response.json();
    // console.log(data)
    setCompanyList(data);
    
  }

  const getFeature = async ()=>{
    const API = "http://localhost:5000/feature-flags/public/featurtes"
    const response = await fetch(API,{
      method:"GET",
      headers:{"Content-Type":"application/json"}
    })
    
    if(!response.ok) {console.error("error while getting feature list")}
    const data = await response.json();
    // console.log(data)
    setFeatureLists(data);
  }

  // check feature is available or not
  const checkFeature = async (e) => {
    e.preventDefault();
    const API = "http://localhost:5000/users/end-user"
    const response = await fetch(API,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({featureId: featureId, orgId: companyId})
    })
    if(!response.ok){
      console.log("end user response not ok")
    }
    const result = await response.json();
    setFeatureMessage(result.message)
    // console.log(result)
    // console.log(featureId, companyId)
  }

  useEffect(()=>{
    getCompany();
    getFeature();
  },[])

    return (
    <>
    <h2>Check Feature</h2>
      <form action="" onSubmit={checkFeature}>
        <select name="" id="" onChange={(e)=>setCompanyId(e.target.value)}>
          <option value="">Select Company</option>
          {
          
            companyList.map((company)=>(
              <option value={company._id} >{company.name}</option>
            )) 
            
          }
        </select>
          {
            
            featureLists.map((feature)=>(
              feature.orgId === companyId && 
            (<div key={feature._id} className='checkbxBg'>
              <label htmlFor="checkbox">{feature.feature_key}</label>
              <input type="checkbox" id="checkbox" value={feature._id} onChange={(e)=>setFeatureId(e.target.value)}/>
            </div>)

            
            
            
            )) 
            
          }
          <button type="submit">Check</button>
      
      </form>
      {
      featureMessage ? 
      <p>{featureMessage}</p> : null
    
      }
    </>
  )
}

export default App
