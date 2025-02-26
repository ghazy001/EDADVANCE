import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"; // Import CSS file for styling
import HeaderOne from "../../layouts/headers/HeaderOne";
import FooterOne from "../../layouts/footers/FooterOne";
import SEO from '../SEO';

// Define the Module type
interface Module {
  _id: string;
  title: string;
  description: string;
}

function ModuleList() {
  // Use the Module type in useState
  const [modules, setModules] = useState<Module[]>([]);  // Initialize modules state

  useEffect(() => {
    axios.get<Module[]>("http://localhost:3000/modules")  // Use your backend URL here
      .then((response) => {
        setModules(response.data);  // Now TypeScript knows the structure
      })
      .catch((error) => {
        console.error("Error fetching modules:", error);
      });
  }, []);

  return (
    <> 
      <HeaderOne />
      <SEO pageTitle={'EdAdvance Modules'} />
      <div className="cours-list-container">
      <link href="https://fonts.googleapis.com/css2?family=Arial&display=swap" rel="stylesheet">
    </link>
        <h2 className="cours-list-title">Our Modules</h2>
        <ul className="cours-list">
          {modules.map((module) => (
           <li key={module._id} className="module-item">
           <h3 className="module-item-title">{module.title}</h3>
           <p className="module-item-description">{module.description}</p>
           <a href={`/module/${module._id}`} className="module-item-button">
             View Module
           </a>
         </li>
         
         
          ))}
        </ul>
      </div>
      <FooterOne style={false} style_2={false} />
    </> 
  );
}

export default ModuleList;
