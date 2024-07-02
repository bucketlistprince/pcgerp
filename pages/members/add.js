import Layout from "../../components/Layout";
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

  const [collapsedSections, setCollapsedSections] = useState({
    personalInformation: false,
    educationProfession: true,
    familyInformation: true,
    churchInformation: true,
  });

  const calculateGenerationalGroup = (age, sex) => {
    if (age >= 0 && age <= 11) return "CS";
    if (age >= 12 && age <= 17) return "JY";
    if (age >= 18 && age <= 29) return "YPG";
    if (age >= 30 && age <= 39) return "YAF";
    if (age >= 40) return sex === "Male" ? "MF" : "WF";
    return "";
  };

  const getDayBornGroup = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = date.getDay(); // getDay() returns 0 (Sunday) to 6 (Saturday)
    return daysOfWeek[dayIndex];
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    let updatedValue;
    if (type === "file") {
      updatedValue = files[0];
    } else {
      updatedValue = value;
    }

    const updatedMemberInfo = {
      ...memberInfo,
      [name]: updatedValue,
    };

    // Special logic for dateOfBirth and sex
    if (name === "dateOfBirth" || name === "sex") {
      if (updatedMemberInfo.dateOfBirth) {
        const birthDate = new Date(updatedMemberInfo.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        // Adjust age if birthday hasn't occurred yet this year
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          updatedMemberInfo.age = age - 1;
        } else {
          updatedMemberInfo.age = age;
        }

        updatedMemberInfo.dayBornGroup = getDayBornGroup(birthDate);
        updatedMemberInfo.generationalGroupName = calculateGenerationalGroup(
          updatedMemberInfo.age,
          updatedMemberInfo.sex
        );
      }
    }

    setMemberInfo(updatedMemberInfo);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log("Member added", memberInfo);
  };

  const handleClear = () => {
    setMemberInfo({
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
  };

  const router = useRouter();

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            className="text-sm bg-red-500 hover:bg-red-700 font-bold text-white py-1 px-2.5 rounded-full"
            onClick={() => router.push("/members")}
          >
            Close
          </button>
        </div>
        <div className="bg-white rounded p-4 rounded-lg shadow-md">
          <h1 className="font-bold mb-4">
            Member Admission Form
            <hr />
          </h1>
          <form className="mx-2" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="px-2 my-4">
              <h1
                className="font-bold mb-4 text-lg cursor-pointer flex"
                onClick={() => toggleSection("personalInformation")}
              >
                1. Personal Information
                {collapsedSections.personalInformation ? (
                  <h1 className="text-red-500"> ▼</h1>
                ) : (
                  <h1 className="text-green-500"> ▲</h1>
                )}
              </h1>
              {!collapsedSections.personalInformation && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="px-1 text-xs font-bold">
                      Passport Size Picture:
                    </label>
                    <input
                      type="file"
                      name="passportPicture"
                      onChange={handleChange}
                      className="input-gray bg-gray-200 rounded px-1 py-1 text-sm"
                    />
                  </div>
                  <div />
                  <div className="justify-end">
                    <select
                      name="title"
                      value={memberInfo.title}
                      onChange={handleChange}
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    >
                      <option value="">Select Title</option>
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Dr">Dr.</option>
                      <option value="Rev">Rev.</option>
                      <option value="Prof">Prof.</option>
                      <option value="Elder">Elder</option>
                      <option value="Pastor">Pastor</option>
                      <option value="Bishop">Bishop</option>
                      <option value="Apostle">Apostle</option>
                      <option value="Minister">Minister</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  <div />
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
                  <div>
                    <select
                      name="sex"
                      value={memberInfo.sex}
                      onChange={handleChange}
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    >
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
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
                      placeholder="Mobile No"
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="homeTelephoneNo"
                      value={memberInfo.homeTelephoneNo}
                      onChange={handleChange}
                      placeholder="Home Telephone No"
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="emailAddress"
                      value={memberInfo.emailAddress}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Education and Profession */}
            <div className="px-2 my-4">
              <h1
                className="font-bold mb-4 text-lg cursor-pointer flex"
                onClick={() => toggleSection("educationProfession")}
              >
                2. Education and Profession
                {collapsedSections.educationProfession ? (
                  <h1 className="text-red-500"> ▼</h1>
                ) : (
                  <h1 className="text-green-500"> ▲</h1>
                )}
              </h1>
              {!collapsedSections.educationProfession && (
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
                      placeholder="Occupation"
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
              )}
            </div>

            {/* Family Information */}
            <div className="px-2 my-4">
              <h1
                className="font-bold mb-4 text-lg cursor-pointer flex"
                onClick={() => toggleSection("familyInformation")}
              >
                3. Family Information
                {collapsedSections.familyInformation ? (
                  <h1 className="text-red-500"> ▼</h1>
                ) : (
                  <h1 className="text-green-500"> ▲</h1>
                )}
              </h1>
              {!collapsedSections.familyInformation && (
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
                    <select
                      name="relationType"
                      value={memberInfo.relationType}
                      onChange={handleChange}
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    >
                      <option value="">Select Relation Type</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Child">Child</option>
                      <option value="Cousin">Cousin</option>
                      <option value="Uncle">Uncle</option>
                      <option value="Aunt">Aunt</option>
                      <option value="Aunt">Other</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Church Information */}
            <div className="px-2 my-4">
              <h1
                className="font-bold mb-4 text-lg cursor-pointer flex"
                onClick={() => toggleSection("churchInformation")}
              >
                4. Church Information
                {collapsedSections.churchInformation ? (
                  <h1 className="text-red-500"> ▼</h1>
                ) : (
                  <h1 className="text-green-500"> ▲</h1>
                )}
              </h1>
              {!collapsedSections.churchInformation && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <select
                      name="dayBorn"
                      value={memberInfo.dayBorn}
                      onChange={handleChange}
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    >
                      <option value="">Select Day Born</option>
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>
                  <div>
                    <select
                      name="generationalGroupName"
                      value={memberInfo.generationalGroupName}
                      onChange={handleChange}
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    >
                      <option value="">Select Generational Group</option>
                      <option value="CS">Children's Service (CS)</option>
                      <option value="JY">Junior Youth (JY)</option>
                      <option value="YPG">Young People's Group (YPG)</option>
                      <option value="YAF">
                        Young Adults' Fellowship (YAF)
                      </option>
                      <option value="MF">Men's Fellowship (MF)</option>
                      <option value="WF">Women's Fellowship (WF)</option>
                    </select>
                  </div>
                  <div>
                    <select
                      name="serviceGroups"
                      value={memberInfo.serviceGroups}
                      onChange={handleChange}
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    >
                      <option value="">Select Service Group</option>
                      <option value="Ushering">Ushering</option>
                      <option value="Choir">Choir</option>
                      <option value="Bible Study">Bible Study</option>
                      <option value="Prayer Team">Prayer Team</option>
                      <option value="Youth Group">Youth Group</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  <div>
                    <select
                      name="communicantStatus"
                      value={memberInfo.communicantStatus}
                      onChange={handleChange}
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    >
                      <option value="">Select Communicant Status</option>
                      <option value="Communicant">Communicant</option>
                      <option value="Non-Communicant">Non-Communicant</option>
                    </select>
                  </div>
                  <div>
                    <label className="mx-1 text-xs font-bold">
                      Baptism Date:{" "}
                    </label>
                    <input
                      type="date"
                      name="dateOfBaptism"
                      value={memberInfo.dateOfBaptism}
                      onChange={handleChange}
                      placeholder="Date of Baptism"
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="baptismRev"
                      value={memberInfo.baptismRev}
                      onChange={handleChange}
                      placeholder="Baptised By"
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    />
                  </div>
                  <div>
                    <label className="mx-1 text-xs font-bold">
                      Confirmation Date:{" "}
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
                    <input
                      type="text"
                      name="confirmationRev"
                      value={memberInfo.confirmationRev}
                      onChange={handleChange}
                      placeholder="Confirmed By"
                      className="input-gray bg-gray-200 rounded px-1 py-1"
                    />
                  </div>
                  <div>
                    <label className="mx-1 text-xs font-bold">
                      Marriage Date:{" "}
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
                    <input
                      type="text"
                      name="marriageRev"
                      value={memberInfo.marriageRev}
                      onChange={handleChange}
                      placeholder="Married By"
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
                      pattern="\d{3}"
                      maxLength={3}
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
                      pattern="\d{2}"
                      maxLength={2}
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
          <hr className="mb-4" />
          <div className="space-x-4">
            <button
              type="submit"
              className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-2.5 rounded"
            >
              Add Member
            </button>
            <button
              type="button"
              className="text-sm hover:bg-red-300 bg-red-200 font-semibold text-black py-1 px-2.5 rounded"
              onClick={handleClear}
            >
              Clear Form
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddMember;
