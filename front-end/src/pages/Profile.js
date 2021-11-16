// import axios from 'axios'
// import React, { useState } from 'react'
// import Select from 'react-select'
// import { selectOptions } from '../helpers/options.js'


// const Profile = () => {
//     const [formData, setFormData] = useState({
//         bio: '',
//         skills: '',
//         experience: '',
//         technologies: []
//     })


//     const handlesubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const { data } = await axios.post('api/profile')           
//         } catch (err) {
//             console.log(err)
            
//         }
//     }

//     const handleMultiChange = (selected, name) => {
//         console.log('SELECTED - ', selected)
//         const values = selected ? selected.map((item) => item.value) : []
//         setFormData({ ...formData, [name]: [...selected] })
//         console.log(values)
//         console.log(formData)
//       }

//     return (
//         <div>
//             <div>
//                 <form onsubmit={handlesubmit}>
//                     <input
//                         placeholder="Enter a bio"
//                         type="text"
//                         name="bio"
//                         value={formData.bio}
//                         onchange={handleChange}
//                     />
//                     <input
//                         placeholder="Enter your skills"
//                         type="text"
//                         name="skills"
//                         value={formData.skills}
//                         onchange={handleChange}
//                     />
//                     <input
//                         placeholder="Enter your experience"
//                         type="text"
//                         name="experience"
//                         value={formData.experience}
//                         onchange={handleChange}
//                     />
//                     <Select
//                         isMulti
//                         name="technologies"
//                         options={selectOptions}
//                         className="basic-multi-select"
//                         classNamePrefix="select"
//                         value={formData.technologies}
//                         onChange={(selected) => handleMultiChange(selected, 'technologies')}
//                     />
//                 </form>
//             </div>
//         </div>
//     )
// }

