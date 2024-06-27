import Layout from "../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const AddMember = () => {
  const [memberInfo, setMemberInfo] = useState({
    title: "",
    surname: "",
    otherNames: "",
    maidenName: "",
    sex: "",
    dateOfBirth: "",
    nextBirthday: "",
    address: "",
    sectionOfTown: "",
    mobileNo: "",
    homeTelephoneNo: "",
    emailAddress: "",
    passportPicture: null,
    profession: "",
    occupation: "",
    businessAddress: "",
    spouseName: "",
    churchRelativeName: "",
    relationType: "",
    dayBornGroup: "",
    generationalGroupName: "",
    serviceGroups: "",
    dateOfBaptism: "",
    baptismRev: "",
    dateOfConfirmation: "",
    confirmationRev: "",
    dateOfMarriage: "",
    marriageRev: "",
    communicantStatus: "",
    congregationName: "",
    congregationCode: "",
    districtName: "",
    districtCode: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setMemberInfo({
      ...memberInfo,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log("Member added", memberInfo);
  };

  const router = useRouter();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            className="text-sm bg-red-500 hover:bg-red-700 font-bold text-white py-1 px-2.5 rounded-full"
            onClick={() => router.push("/members")}
          >
            Close
          </button>
        </div>
        <div className="bg-white rounded p-4 rounded-lg shadow-md">
          <h1 className="text-sm font-bold mb-4">Add New Member</h1>
          <form className="mx-2" onSubmit={handleSubmit}>
            <div>
              <h1 className="font-bold mb-4 mx-4 text-lg">
                Personal Infomation
                <hr class="border-b"></hr>
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="title"
                    value={memberInfo.title}
                    onChange={handleChange}
                    placeholder="Mr, Mrs, Doctor, etc"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="surname"
                    value={memberInfo.surname}
                    onChange={handleChange}
                    placeholder="Surname"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="otherNames"
                    value={memberInfo.otherNames}
                    onChange={handleChange}
                    placeholder="Other Names"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div className="flex items-center">
                  <label className="mx-1 text-xs font-bold">
                    Date of Birth:{" "}
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={memberInfo.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Date Of Birth"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="placeOfBirth"
                    value={memberInfo.placeOfBirth}
                    onChange={handleChange}
                    placeholder="Place Of Birth"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="address"
                    value={memberInfo.address}
                    onChange={handleChange}
                    placeholder="House/Residential Address"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="sectionOfTown"
                    value={memberInfo.sectionOfTown}
                    onChange={handleChange}
                    placeholder="Section of Town"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="mobileNo"
                    value={memberInfo.mobileNo}
                    onChange={handleChange}
                    placeholder="Mobile No."
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="homeTelephoneNo"
                    value={memberInfo.homeTelephoneNo}
                    onChange={handleChange}
                    placeholder="Home Telephone No."
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="emailAddress"
                    value={memberInfo.emailAddress}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <label className="mx-1 text-xs font-bold">
                    Passport Picture:{" "}
                  </label>
                  <input
                    type="file"
                    name="passportPicture"
                    onChange={handleChange}
                    className="input-gray rounded px-1 py-1"
                  />
                </div>
              </div>

              <h1 className="font-bold my-4 mx-4 text-lg">
                Education/Profession
                <hr class="border-b"></hr>
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="profession"
                    value={memberInfo.profession}
                    onChange={handleChange}
                    placeholder="Profession"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="occupation"
                    value={memberInfo.occupation}
                    onChange={handleChange}
                    placeholder="Occupation (Current Job)"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="businessAddress"
                    value={memberInfo.businessAddress}
                    onChange={handleChange}
                    placeholder="Business Address"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
              </div>
              <h1 className="font-bold my-4 mx-4 text-lg">
                Family Information
                <hr class="border-b"></hr>
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="spouseName"
                    value={memberInfo.spouseName}
                    onChange={handleChange}
                    placeholder="Spouse Name"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="churchRelativeName"
                    value={memberInfo.churchRelativeName}
                    onChange={handleChange}
                    placeholder="Church Relative Name"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="relationType"
                    value={memberInfo.relationType}
                    onChange={handleChange}
                    placeholder="Type of Relation"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
              </div>
              <h1 className="font-bold my-4 mx-4 text-lg">
                Church Infomation
                <hr class="border-b"></hr>
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="dayBornGroup"
                    value={memberInfo.dayBornGroup}
                    onChange={handleChange}
                    placeholder="Day Born Group"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="generationalGroupName"
                    value={memberInfo.generationalGroupName}
                    onChange={handleChange}
                    placeholder="Generational Group Name"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="serviceGroups"
                    value={memberInfo.serviceGroups}
                    onChange={handleChange}
                    placeholder="Service/Other Groups"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="communicantStatus"
                    value={memberInfo.communicantStatus}
                    onChange={handleChange}
                    placeholder="Communicant/Non-communicant"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>

                <div>
                  <label className="mx-1 text-xs font-bold">
                    Date of Baptism:{" "}
                  </label>
                  <input
                    type="date"
                    name="dateOfBaptism"
                    value={memberInfo.dateOfBaptism}
                    onChange={handleChange}
                    placeholder="Date of Baptism"
                    className="input-gray bg-gray-200 rounded px-1 py-1s"
                  />
                </div>
                <div>
                  <label className="mx-1 text-xs font-bold">
                    Baptised By:{" "}
                  </label>
                  <input
                    type="text"
                    name="baptismRev"
                    value={memberInfo.baptismRev}
                    onChange={handleChange}
                    placeholder="Rev. "
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <label className="mx-1 text-xs font-bold">
                    Date of Confirmation:{" "}
                  </label>
                  <input
                    type="date"
                    name="dateOfConfirmation"
                    value={memberInfo.dateOfConfirmation}
                    onChange={handleChange}
                    placeholder="Date of Confirmation"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <label className="mx-1 text-xs font-bold">Confirmed By</label>
                  <input
                    type="text"
                    name="confirmationRev"
                    value={memberInfo.confirmationRev}
                    onChange={handleChange}
                    placeholder="Rev. "
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <label className="mx-1 text-xs font-bold">
                    Date Of Marriage:{" "}
                  </label>
                  <input
                    type="date"
                    name="dateOfMarriage"
                    value={memberInfo.dateOfMarriage}
                    onChange={handleChange}
                    placeholder="Date of Marriage"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <label className="mx-1 text-xs font-bold">Married By: </label>
                  <input
                    type="text"
                    name="marriageRev"
                    value={memberInfo.marriageRev}
                    onChange={handleChange}
                    placeholder="Rev. "
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="congregationName"
                    value={memberInfo.congregationName}
                    onChange={handleChange}
                    placeholder="Congregation Name"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="congregationCode"
                    value={memberInfo.congregationCode}
                    onChange={handleChange}
                    placeholder="Congregation Code"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="districtName"
                    value={memberInfo.districtName}
                    onChange={handleChange}
                    placeholder="District Name"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="districtCode"
                    value={memberInfo.districtCode}
                    onChange={handleChange}
                    placeholder="District Code"
                    className="input-gray bg-gray-200 rounded px-1 py-1"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex mt-4">
        <button className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded">
            Add New Member
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddMember;
