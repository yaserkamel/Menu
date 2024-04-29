import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/template1/HomePage";
import List from "./components/template1/List";
import MealDetails from "./components/template1/MealDetails";
// import NavBarMenu from "./components/template1/NavBarMenu";
import Ratings from "./components/template1/Ratings";
// import ProtectedRoute from "./components/utility/ProtectedRoute";
import { useContext, useEffect, useRef } from "react";
import { AdminContext } from "./context/AdminProvider";
import HomePage2 from './components/template2/HomePage'
import Categories from "./components/template2/Categories";
import Items from "./components/template2/Items";
import Home from "./components/template3/Home";
import Home4 from './components/template4/Home'
import Temp3Items from "./components/template3/Temp3Items";
import SubCategories from "./components/template3/SubCategories";
import SubCatTemp4 from "./components/template4/SubCatTemp4";
import Temp4Items from "./components/template4/Temp4Items";
import HomeTemp5 from "./components/template5/HomeTemp5";
import CategoriesTemp5 from "./components/template5/CategoriesTemp5";
import SubCategoriesTemp5 from "./components/template5/SubCategoriesTemp5";
import Temp5Items from "./components/template5/Temp5Items";
import SubCatTemp2 from "./components/template2/SubCatTemp2";
import Test from "./components/Test";
import FirstHomePage from "./components/template1/FirstHomePage";

function App() {
  const { adminDetails } = useContext(AdminContext);
  const selectedTemplate = useRef()
  // console.log(adminDetails?.menu_id)

  useEffect(()=>{
    selectedTemplate.current = adminDetails?.menu_id
  },[adminDetails])
  
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
        {
          // <Route index  element={<Test />} /> 
          <Route  path="/:username/rating" element={<Ratings />} /> 
        }
          <Route  path="/:username" element={<FirstHomePage />} /> 
        
          <Route path="/:username/template/1/home" element={<HomePage />} />
          <Route path="/:username/template/1/category/:id" element={<List />} />
          
          {
            // <Route path="/:username/template/2/home" element={<HomePage2 />} />
          }
          <Route path="/:username/template/2/home" element={<Categories />} />
          <Route path="/:username/template/2/category/:id" element={<SubCatTemp2 />} />
          <Route path="/:username/template/2/category/:id/sub-category/:id2" element={<Items />} />


          <Route path="/:username/template/3/home" element={<Home />} />
          <Route path="/:username/template/3/category/:id" element={<SubCategories />} />
          <Route path="/:username/template/3/category/:id/sub-category/:id2" element={<Temp3Items />} />
          
          <Route path="/:username/template/4/home" element={<Home4 />} />
          <Route path="/:username/template/4/category/:id" element={<SubCatTemp4 />} />
          <Route path="/:username/template/4/category/:id/sub-category/:id2" element={<Temp4Items/>} />
          {
            // <Route path="/:username/template/5/home" element={<HomeTemp5 />} />
          }
          <Route path="/:username/template/5/home" element={<CategoriesTemp5 />} />
          <Route path="/:username/template/5/category/:id" element={<SubCategoriesTemp5 />} />
          <Route path="/:username/template/5/category/:id/sub-category/:id2" element={<Temp5Items/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
