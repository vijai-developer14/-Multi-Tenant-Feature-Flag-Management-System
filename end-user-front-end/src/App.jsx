import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [companyList , setCompanyList] = useState([]);
  const [featureLists , setFeatureLists] = useState([]);

  const getCompany = async ()=>{
    const API = "http://localhost:5000/api/organizations/public"
    const response = await fetch(API,{
      method:"GET",
      headers:{"Content-Type":"application/json"}
    })
    
    if(!response.ok) {console.error("error while getting company list")}
    const data = await response.json();
    console.log(data)
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
    console.log(data)
    setFeatureLists(data);
  }
  const checkFeature = () => {
    
  }

  useEffect(()=>{
    getCompany();
    getFeature();
  },[])

    return (
    <>
      <form action="">
        <select name="" id="">
          <option value="">Select Company</option>
          {
          
            companyList.map((company)=>(
              <option value={company._id}>{company.name}</option>
            )) 
            
          }
        </select>
          {
          
            featureLists.map((feature)=>(
            <div>
              <label htmlFor="checkbox">{feature.feature_key}</label>
              <input type="checkbox" id="checkbox"/>
            </div>
            )) 
            
          }
        
      
      </form>
    </>
  )
}

export default App
