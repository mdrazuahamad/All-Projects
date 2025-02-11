import React, { useEffect, useState } from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/custom.css";

import { Link } from "react-router-dom";

const Register = () => {
  const [isGuest, setisGuest] = useState(false);
  const [userCreate, setUserCreate] = useState(false);
  const [userFailed, setUserFailed] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [prefix, setPrefix] = useState("Mr");
  const [state, setState] = useState({
    createdDate: new Date(),
    userName: "",
    userEmail: "",
    userMobile: "",
    memberType: 0,
    membershipNumber: '',
    haveGuest: 0,
    userRole: "user",
    payment: 0,
    userPassword: "123456",
  });
  const [guest, setGuest] = useState({
    guestName: "",
    relation: "",
    gender: "",
    age: 0,
  });
  const registerUser = (e) => {
    e.preventDefault();
    const sendData = {...state, ...guest};
    const option = {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(sendData),
    };
    fetch("http://localhost:3095/user/create/", option)
    .then((response) => response.json())
    .then((res) => {
      if(res.success === true){
        setUserCreate(res.success);
        setResponseMessage(res.message);
      }else if (res.success === false){
        setUserFailed(false);
        setResponseMessage(res.message);
      }
    });
  };
  useEffect(() => {
    setState({
      createdDate: new Date(),
      userName: "",
      userEmail: "",
      userMobile: "",
      memberType: 0,
      membershipNumber: 0,
      haveGuest: 0,
      userRole: "user",
      payment: 0,
      userPassword: "123456",
    });
    setGuest({
      guestName: "",
      relation: "",
      gender: "",
      age: 0,
    });
    setisGuest(false);
  },[userCreate]);

  return (
    <>
      <Header />
      {/* <div className="container p-3 mt-3">
        <div className="row">
          <div className="col-md-12 mb-2 my-auto">
            <div className="p-4 border rounded shadow">
              <div className="text-center">
                <h5>
                  <b>Please Fill Name and Contact Info Here</b>
                </h5>
              </div>
              {userCreate && (
                <>
                  <div className={`alert alert-${userCreate ? "success" : "danger"
                  }`}
                  role="alert"
                  >
                    {responseMessage}
                  </div>
                </>
              )}
             {userFailed && (
              <>
                <div className={`alert alert-danger`}
                  role="alert"
                >
                  {responseMessage}
                </div>
              </>
             )}
              <hr />
              <form onSubmit={registerUser}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstName">First Name</label>
                    <select
                      onChange={(e) => setPrefix(e.target.value)}
                      value={prefix}
                      className="custom-select my-1 mr-sm-2"
                      id="firstName"
                    >
                      <option selected>Choose Prefix</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="yourName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      aria-describedby="emailHelp"
                      placeholder="Enter Name"
                      value={state?.userName}
                      onChange={(e) => 
                        setState({...state, 
                        userName:e.target.value
                      })
                    }
                    />
                  </div>
                </div>
                <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="yourName">Mobile No</label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputMobile"
                      aria-describedby="emailHelp"
                      placeholder="Enter Mobile Number"
                      value={state?.userMobile}
                      onChange={(e) => 
                        setState({...state, 
                        userMobile:e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="yourName">Email ID</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputFullName"
                      aria-describedby="emailHelp"
                      placeholder="Email Address"
                      value={state?.userEmail}
                      onChange={(e) => 
                        setState({...state, 
                        userEmail:e.target.value
                        })
                      }
                    />
                  </div>
                  
                  <div className="form-group col-md-6">
                    <label htmlFor="yourName">Member Type</label>
                    <select
                      className="custom-select my-1 mr-sm-2"
                      id="inlineFormCustomSelectPref"
                      value={state?.memberType}
                      onChange={(e) => 
                        setState({...state, 
                        memberType:e.target.value
                      })
                    }
                    >
                      <option selected>Choose Member Type</option>
                      <option value={1}>Patron Member</option>
                      <option value={2}>Lifetime Member</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="yourName">Membership Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail"
                      placeholder="Enter Membership Number"
                      value={state?.membershipNumber}
                      onChange={(e) => 
                        setState({...state, 
                        membershipNumber:e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="form-group col-md-12 text-center">
                    <label className="font-bold" htmlFor="guest">
                      Will you have guest with you ?
                    </label>
                    <input
                      type="radio"
                      id="male"
                      name="yes"
                      value="yes"
                      className="ml-2"
                      checked={isGuest === true}
                      onChange={() => {
                        setisGuest(true);
                        setState({...state, haveGuest: 1})
                      }}
                    />{""}
                    Yes
                    <input
                      type="radio"
                      id="male"
                      name="no"
                      value="no"
                      className="ml-2"
                      checked={isGuest === false}
                      onChange={() => {
                        setisGuest(false);
                        setState({...state, haveGuest:0})
                      }}
                    />{""}
                    No
                  </div>
                  {isGuest && (
                    <>
                    <div className="form-group col-md-6">
                      <label htmlFor="yourName">Guest Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail"
                        placeholder="Enter Name"
                        onChange={(e) => 
                          setGuest({...guest, guestName:e.target.value
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="relation">Relation</label>
                      <select
                        className="custom-select my-1 mr-sm-2"
                        id="inlineFormCustomSelectPref"
                        value={guest?.relation}
                       onChange={(e) => 
                        setGuest({...guest, relation:e.target.value
                        })
                      }
                      >
                        <option selected>Choose Relation</option>
                        <option value="Sopuse">Sopuse</option>
                        <option value="Children">Children</option>
                        <option value="Friend">Friend</option>
                        <option value="Relative">Relative</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="gender">Gender</label>
                      <select
                        className="custom-select my-1 mr-sm-2"
                        id="gender"
                        value={guest?.gender}
                        onChange={(e) => 
                          setGuest({...guest, gender:e.target.value
                          })
                        }
                      >
                        <option selected>Choose Member Type</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="age">Age</label>
                      <input
                        type="number"
                        className="form-control"
                        id="age"
                        placeholder="Enter Age"
                        onChange={(e) => 
                          setGuest({...guest, age:e.target.value
                          })
                        }
                      />
                    </div>
                  </>
                  )} 
                </div>
                <button
                  type="submit"
                  className="offset-2 col-8 btn btn-primary btn-block"
                >
                  Register Now
                </button>
              </form>
              <hr />
              <div className="row">
                <div className="col-12 text-center">
                  <small>
                    Already Registered? <Link to="/login">Login Now</Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <section className="bg-primary text-white text-center py-4">
        <h2>Event Management <br />Registration</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
    </section> */}
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 manegment">
          <div className="text text-center text-white py-4">
            <h1>Event Managment <br />Registered</h1>
            <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.</p>
          </div>
        </div>
        </div>
     </div>
     <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 manegment-event">
          <div className="text text-center text-black py-4">
            <h1>Join Our Event!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        </div>
     </div>
    
   <div className="container p-3 mt-3">
        <div className="row">
          <div className="col-md-12 mb-2 my-auto absolute top-3rem">
            <div className="p-4 border rounded shadow">
              <div className="text-center">
                <h5>
                  <b>Registration Form</b>
                </h5>
              </div>
              {userCreate && (
                <>
                  <div className={`alert alert-${userCreate ? "success" : "danger"
                  }`}
                  role="alert"
                  >
                    {responseMessage}
                  </div>
                </>
              )}
             {userFailed && (
              <>
                <div className={`alert alert-danger`}
                  role="alert"
                >
                  {responseMessage}
                </div>
              </>
             )}
              <hr />
              <form onSubmit={registerUser}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstName">First Name</label>
                    <select
                      onChange={(e) => setPrefix(e.target.value)}
                      value={prefix}
                      className="custom-select my-1 mr-sm-2"
                      id="firstName"
                    >
                      <option selected>Choose Prefix</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="yourName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      aria-describedby="emailHelp"
                      placeholder="Enter Name"
                      value={state?.userName}
                      onChange={(e) => 
                        setState({...state, 
                        userName:e.target.value
                      })
                    }
                    />
                  </div>
                </div>
                <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="yourName">Mobile No</label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputMobile"
                      aria-describedby="emailHelp"
                      placeholder="Enter Mobile Number"
                      value={state?.userMobile}
                      onChange={(e) => 
                        setState({...state, 
                        userMobile:e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="yourName">Email ID</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputFullName"
                      aria-describedby="emailHelp"
                      placeholder="Email Address"
                      value={state?.userEmail}
                      onChange={(e) => 
                        setState({...state, 
                        userEmail:e.target.value
                        })
                      }
                    />
                  </div>
                  
                  <div className="form-group col-md-6">
                    <label htmlFor="yourName">Member Type</label>
                    <select
                      className="custom-select my-1 mr-sm-2"
                      id="inlineFormCustomSelectPref"
                      value={state?.memberType}
                      onChange={(e) => 
                        setState({...state, 
                        memberType:e.target.value
                      })
                    }
                    >
                      <option selected>Choose Member Type</option>
                      <option value={1}>Patron Member</option>
                      <option value={2}>Lifetime Member</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="yourName">Membership Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail"
                      placeholder="Enter Membership Number"
                      value={state?.membershipNumber}
                      onChange={(e) => 
                        setState({...state, 
                        membershipNumber:e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="form-group col-md-12 text-center">
                    <label className="font-bold" htmlFor="guest">
                      Will you have guest with you ? 
                    </label>
                    <br/>
                    <input
                      type="radio"
                      id="male"
                      name="yes"
                      value="yes"
                      className="ml-2"
                      checked={isGuest === true}
                      onChange={() => {
                        setisGuest(true);
                        setState({...state, haveGuest: 1})
                      }}
                    />{""}
                    Yes
                    <input
                      type="radio"
                      id="male"
                      name="no"
                      value="no"
                      className="ml-2"
                      checked={isGuest === false}
                      onChange={() => {
                        setisGuest(false);
                        setState({...state, haveGuest:0})
                      }}
                    />{""}
                    No
                  </div>
                  {isGuest && (
                    <>
                    <div className="form-group col-md-6">
                      <label htmlFor="yourName">Guest Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail"
                        placeholder="Enter Name"
                        onChange={(e) => 
                          setGuest({...guest, guestName:e.target.value
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="relation">Relation</label>
                      <select
                        className="custom-select my-1 mr-sm-2"
                        id="inlineFormCustomSelectPref"
                        value={guest?.relation}
                       onChange={(e) => 
                        setGuest({...guest, relation:e.target.value
                        })
                      }
                      >
                        <option selected>Choose Relation</option>
                        <option value="Sopuse">Sopuse</option>
                        <option value="Children">Children</option>
                        <option value="Friend">Friend</option>
                        <option value="Relative">Relative</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="gender">Gender</label>
                      <select
                        className="custom-select my-1 mr-sm-2"
                        id="gender"
                        value={guest?.gender}
                        onChange={(e) => 
                          setGuest({...guest, gender:e.target.value
                          })
                        }
                      >
                        <option selected>Choose Member Type</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="age">Age</label>
                      <input
                        type="number"
                        className="form-control"
                        id="age"
                        placeholder="Enter Age"
                        onChange={(e) => 
                          setGuest({...guest, age:e.target.value
                          })
                        }
                      />
                    </div>
                  </>
                  )} 
                </div>
                <button
                  type="submit"
                  className="offset-2 col-8 btn btn-primary btn-block"
                >
                  Register Now
                </button>
              </form>
              <hr />
              <div className="row">
                <div className="col-12 text-center">
                  <small>
                    Already Registered? <Link to="/login">Login Now</Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-image mb-4">
        <div className="container">
        <div className="row">
          <div className="col-md-12 ">
            <div className="mazban-text text-center text-white py-4 font-weight-bold font-italic">
              <h1>মেজবান ও মিলনমেলা - ২০২৫ <br />চন্দনাইশবাসী</h1>

              <p>১৮ জানুয়ারী ২০২৫, রোজঃ শনিবার</p>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="paragraph-text border rounded p-3 mt-2 shadow-sm">
                <p>আসসালামু আলাইকুম,</p>
                <p>আপনার নিশ্চয়ই অবগত হয়েছেন যে প্রতিবারের ন্যায় এবারও আয়োজন করতে যাচ্ছে মেজবান ও মিলনমেলা, ২০২৫ ।</p>
                <p>
                  সমিতির সদস্যবৃন্দের সন্তান যারা এসএসসি/এইসএসসি ও সমমান পরীক্ষা
                  ২০২৩/২০২৪ এ গৌরবোজ্জ্বল ফলাফল করেছেন এবং যারা কোরআনে হাফেজ হয়েছেন এ
                  অনুষ্ঠানে সংবর্ধনা জানানোর মাধ্যমে তাদেরকে উৎসাহিত করা হবে,যা তাদের
                  ভবিষ্যৎ জীবন এগিয়ে নিতে অনুঘটকের কাজ করবে আশা করি।
                </p>
                <p>
                  যারা ঢাকায় অবস্থান করছেন,কিন্তু এখনও চন্দনাইশ সমিতি -ঢাকা'র সদস্যফরম
                  পূরণ করেননি,তাদেরকে নিম্নে যোগাযোগ করার অনুরোধ রইলো।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">  
        <div className="container">
        <button className="btn-central">যোগাযোগ</button>
          <div className="row">
            <div className="col-md-12 mb-5">
              <div className="paragraph-text border rounded p-3 mt-2 shadow-sm">
              <p className="">১। জনাব মুহাম্মদ জাকের হোসাইন<br /> ০১৭১১১১০১২৮</p>
              <p className="">২। জনাব মোঃ রহিম উদ্দীন<br /> ০১৭১১৪০৬৬৮৬</p>
              <p className="">৩। জনাব মোঃ জিয়া উদ্দিন<br />০১৮২৯ ৮৯১৩৯৫</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-5">
              <div className="paragraph-text border rounded p-3 mt-2 shadow-sm">
                <p>পৃষ্টপোষক সদস্য -১০,০০০৳</p>
                <p>এককালীন আজীবন সদস্য -২০০০৳</p>
                <p>
                  পৃষ্ঠপোষক ও আজীবন সদস্য ফি নিম্নোক্ত হিসাবের মাধ্যমে প্রদান করা
                  হবে।
                </p>
                <div className="row">
                  <div className="col-md-4">
                    <p>১। ব্যাংক হিসাব নংঃ</p>
                  </div>
                  <div className="col-md-8">
                  <p>
                   Chandanaish Samaity-Dhaka, <br />A/c. No:
                  0013201000012176<br /> United Commercial Bank-PLC, <br />Principal Branch,
                  Dhaka.
                </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p>২। মোবাইল ব্যাংকিংঃ</p>
                  </div>
                  <div className="col-md-8">
                  <p> Bkash/Nagad (Personal): <br />01829 891 395, Md. Zia Uddin</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 footer">
            <div className="mazban-text text-center text-white py-4 font-italic">
              <h1>মেজবান ও মিলনমেলা - ২০২৫ <br />চন্দনাইশবাসী</h1>
              <p>আপনাদের অংশগ্রহণই আমাদের পথচলা</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;


// import React from 'react'
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Header from './Header';

// const Register = () => {
//   return (
//     <>
//     <Header />
//     <div className='container p-3 mt-3'>
//       <div className='row'>
//         <div className='col-md-12 mb-2 my-auto'>
//           <div className='p-4 border rounded shadow'>
//             <div className='text-center'>
//               <h5>
//                 <b>Please Fill Name and COntact Info Here</b>
//               </h5>
//             </div>
//             <hr />
//             <form>
//               <div className='row'>
//                 <div className='form-group col-md-6'>
//                   <label htmlFor='firstName'>First Name</label>
//                   <select>
//                     <option>Choose Prefix</option>
//                     <option>Mr.</option>
//                     <option>Mrs.</option>
//                   </select>
//                 </div>
//                 <div className='form-group col-md-6'>
//                   <label htmlFor='yourName'>Last Name</label>
//                   <input 
//                     type='text'
//                     className='form-control'
//                     id='exampleInputName'
//                     aria-describedby='emailHelp'
//                     placeholder='Enter Name'
//                   />
//                 </div>
//               </div>
//               <div className='row'>
//               <div className='form-group col-md-6'>
//                   <label htmlFor='yourName'>Mobile No</label>
//                   <input 
//                     type='number'
//                     className='form-control'
//                     id='exampleInputMobile'
//                     aria-describedby='emailHelp'
//                     placeholder='Enter Mobile Number'
//                   />
//                 </div>
//                 <div className='form-group col-md-6'>
//                   <label htmlFor='yourName'>Email ID</label>
//                   <input 
//                     type='email'
//                     className='form-control'
//                     id='exampleInputName'
//                     aria-describedby='emailHelp'
//                     placeholder='Email Address'
//                   />
//                 </div>
//                 <div className='form-group col-md-6'>
//                   <label htmlFor='firstName'>Member Type</label>
//                   <select>
//                     <option>Choose Member Type</option>
//                     <option>Patron Member</option>
//                     <option>Lifetime Member</option>
//                   </select>
//                 </div>
//                 <div className='form-group col-md-6'>
//                   <label htmlFor='yourName'>Email ID</label>
//                   <input 
//                     type='text'
//                     className='form-control'
//                     id='exampleInputName'
//                     placeholder='Enter Membership Number'
//                   />
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }

// export default Register

