import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../Context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImgPreview, setdocImgPreview] = useState(null); // for preview
  const [docImg, setdocImg] = useState(null); // for uploading
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [experience, setexperience] = useState("1 year");
  const [fee, setfee] = useState("");
  const [about, setabout] = useState("");
  const [Speciality, setSpeciality] = useState("General Physician");
  const [degree, setdegree] = useState("");
  const [address1, setaddress1] = useState("");
  const [address2, setaddress2] = useState("");

  const { aToken, BackendURL } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!docImg) {
      toast.error("Image Not Selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fee", Number(fee));
      formData.append("about", about);
      formData.append("speciality", Speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify({line1:address1,line2:address2}));
     console.log("Sending Token:", aToken); // or token

const {data} = await axios.post(BackendURL+'/api/admin/add-doctor',formData,{headers: {
  atoken: aToken, // ✅ lowercased key
  'Content-Type': 'multipart/form-data',
}})


      if (data.success) {
        toast.success("Doctor Added Successfully");
        // Optionally reset form
        setname("");
        setEmail("");
        setpassword("");
        setexperience("1 year");
        setfee("");
        setabout("");
        setSpeciality("General Physician");
        setdegree("");
        setaddress1("");
        setaddress2("");
        setdocImg(null);
        setdocImgPreview(null);
      } else {
        console.log(data.message)
        toast.error(data.message || "Failed to add doctor");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <form className="m-5 w-full" onSubmit={handleSubmit}>
        <p className="mb-3 text-lg font-medium">Add Doctor</p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
          <div className="flex items-center gap-4 text-gray-500 mb-8">
            <label htmlFor="doc-img">
              <img
                className="w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer"
                src={docImgPreview ? docImgPreview : assets.upload_area}
                alt="doctor"
              />
            </label>
            <input
              onChange={(e) => {
                setdocImg(e.target.files[0]);
                setdocImgPreview(URL.createObjectURL(e.target.files[0]));
              }}
              type="file"
              id="doc-img"
              hidden
              accept="image/*"
            />
            <p>Upload doctor picture</p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            {/* Left Column */}
            <div className="w-full lg:flex-1 flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Name</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Email</p>
                <input
                  className="border rounded px-3 py-2"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Password</p>
                <input
                  className="border rounded px-3 py-2"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Experience</p>
                <select
                  className="border rounded px-3 py-2"
                  value={experience}
                  onChange={(e) => setexperience(e.target.value)}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={`${i + 1} year`}>
                      {i + 1} year
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Fee</p>
                <input
                  className="border rounded px-3 py-2"
                  type="number"
                  placeholder="Fee"
                  value={fee}
                  onChange={(e) => setfee(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <p>Speciality</p>
                <select
                  className="border rounded px-3 py-2"
                  value={Speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                >
                  <option value="General Physician">General Physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Education</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Education"
                  value={degree}
                  onChange={(e) => setdegree(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Address</p>
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Address 1"
                  value={address1}
                  onChange={(e) => setaddress1(e.target.value)}
                  required
                />
                <input
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Address 2"
                  value={address2}
                  onChange={(e) => setaddress2(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* About Doctor */}
          <div className="flex-1 flex flex-col gap-1">
            <p className="mt-4 mb-2">About Doctor</p>
            <textarea
              className="w-full px-4 pt-2 border rounded"
              placeholder="Write about doctor"
              rows={5}
              value={about}
              onChange={(e) => setabout(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 px-10 py-3 mt-4 text-white rounded-full"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
