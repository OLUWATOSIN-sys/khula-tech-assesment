import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styled from "styled-components";
import axios from "axios";
import { FaTimes } from "react-icons/fa";



const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const TopBarWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
`;


const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #c3c3c3;
    cursor: not-allowed;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 20px; /* Space between form and button */
  text-align: left; /* Align to the left */
`;

const NextButton = styled.button`
  padding: 8px 24px; /* Button padding for dimensions */
  background-color: #d0d0d0; /* Light gray color */
  width: 130px; /* Fixed width */
  color: white; 
  font-size: 14px; /* Font size for text */
  border: 1px solid #c0c0c0; /* Slight border for definition */
  border-radius: 8px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: background-color 0.3s;

  &:hover {
    background-color: #c3c3c3; /* Slightly darker gray on hover */
  }

  &:disabled {
    background-color: #f5f5f5; /* Lighter gray when disabled */
    cursor: not-allowed;
    color: #a0a0a0; /* Dimmed text */
  }
`;



const TopBar = styled.div`
  display: grid;
  grid-template-columns: auto repeat(5, 1fr);
  align-items: center;
  border: 1px solid #ddd;
  background-color: #fff;

  .close-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-right: 1px solid #ddd;

    .close-icon {
      font-size: 24px;
      color: #333;
      cursor: pointer;
    }

    .save-close {
      font-size: 12px;
      color: #555;
      margin-top: 5px;
    }
  }

  .step {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 15px;
    text-align: left;
    border-left: 1px solid #ddd;

    &.gray {
      background-color: #f7f7f7;
    }

    .step-number {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 2px;
      color: #333;
    }

    .step-text {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 3px;
    }

    .step-description {
      font-size: 12px;
      color: #555;
    }

    &.completed .step-number,
    &.completed .step-text {
      color: #28a745;
    }

    &.in-progress {
      border-bottom: 3px solid black;

      .loader-description {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    .loader {
      display: flex;
      gap: 4px;

      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: #ddd;
        border-radius: 50%;

        &.active {
          background-color: #28a745;
        }
      }
    }
  }
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  align-items: flex-start;
  background-color: #f9f9f9;
`;

const Sidebar = styled.div`
  padding: 20px;
  border-right: 1px solid #ddd;

  h3 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 3px;
    color: #333;
  }
     p {
    font-size: 14px;
    color: #555;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 12px;
      top: 20px;
      bottom: 0;
      width: 2px;
      background-color: #ccc;
      z-index: 0;
    }

    li {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
      font-size: 14px;
      position: relative;
      z-index: 1;

      .circle {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-right: 10px;
        position: relative;
        border: 1px solid #000;
        background-color: #fff;

        &.completed {
          background-color: #C2D7C4;

          &::after {
            content: "✔";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 14px;
            color: green;
          }
        }
      }

      .label {
        font-weight: bold;
        color: #333;
      }

      .status {
        font-size: 12px;
        color: #28a745;
        margin-top: 4px;
      }
    }
  }
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #fff;

  h2 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 30px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 20px;

  input,
  textarea {
    width: 100%;
    height: 300%;
    padding: 12px 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    background: #fff;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #000;
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: -6px;
      left: 10px;
      font-size: 12px;
      color: #000;
    }
  }

  label {
    position: absolute;
    top: -10px;
    left: 14px;
    background-color: #fff;
    padding: 0 4px;
    color: #888;
    font-size: 14px;
    pointer-events: none;
    transition: all 0.2s ease;
  }
`;
const FormRow = styled.div`
  display: flex;
  gap: 20px; /* Spacing between fields */
  margin-bottom: 20px; /* Space below the row */
`;

const FormGroupInline = styled.div`
  flex: 1; /* Equal width for both fields */
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
    color: #555;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 15px;

    &:focus {
      outline: none;
      border-color: #28a745;
    }
  }
`;


const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* Space between buttons */

  .option-button {
    flex: ${(props) => props.flex || 1}; /* Use props to adjust flex value */
    padding: ${(props) => props.padding || "18px 1px"}; /* Dynamic padding */
    border: 1px solid #28a745;
    border-radius: 6px;
    background-color: #fff;
    color: #28a745;
    cursor: pointer;
    font-size: 15px;
    text-align: center;

    &.active {
      background-color: #28a745;
      color: #fff;
    }

    &:hover {
      background-color: #28a745;
      color: #fff;
    }
  }
`;


  
  

const ApplicationPage = () => {
  const [farmName, setFarmName] = useState("");
  const [formData, setFormData] = useState({
    farmLocation: "",
    isFullTimeFarmer: "",
    farmBackground: "",
    ownershipStatus: "",
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://graph.khuladev.co.za/graphql",
          {
            query: `
              query {
                user {
                  name
                  surname
                  farmer {
                    farm {
                      name
                    }
                  }
                }
              }
            `,
          },
          {
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0NiwidXNlclJvbGVzIjpbeyJpZCI6MSwibmFtZSI6ImZhcm1lciJ9XSwiX19fX2todWxhX19zZWNyZXRfX19fIjoiNjIyMjIzMzM2NjQtMTY5ODI0ODI4MDYzNyIsImlhdCI6MTY5ODI0ODI4MH0.KH1SO9KpCveqI5sYKTBesoyjuce69ZKCbitdXChZTR0",
            },
          }
        );
        const farmNameFromResponse =
          response.data?.data?.user?.farmer?.farm?.name || "";
        setFarmName(farmNameFromResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextClick = () => {
    navigate("/landing-continue-khula"); // Navigate to the specified route
  };

  return (
    <PageWrapper>
      <TopBarWrapper>
        <TopBar>
          <div className="close-section">
            <FaTimes className="close-icon" />
            <div className="save-close">Save and close</div>
          </div>
          <div className="step completed">
            <div className="step-description">Complete</div>
            <div className="step-text">1. Credit Check</div>
            <div className="step-description">Check if you qualify</div>
          </div>
          <div className="step completed">
            <div className="step-description">Complete</div>
            <div className="step-text">2. KYC</div>
            <div className="step-description">Check if you qualify</div>
          </div>
          <div className="step in-progress">
            <div className="loader-description">
              <div className="loader">
                <span className="active"></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="step-description">In Progress</div>
            </div>
            <div className="step-text">3. Farm Profile</div>
            <div className="step-description">Check if you qualify</div>
          </div>
          <div className="step gray">
            <div className="step-description">Up Next</div>
            <div className="step-text">4. Financial Info</div>
            <div className="step-description">Check if you qualify</div>
          </div>
          <div className="step gray">
            <div className="step-description">Last Step</div>
            <div className="step-text">5. Uploads</div>
            <div className="step-description">Supporting Documents</div>
          </div>
        </TopBar>
      </TopBarWrapper>
      <MainContainer>

      <Sidebar>
          <h3>3. Farm Profile</h3>
          <p>Give us some basic farm details</p>
          <ul>
            <li>
              <div className="circle completed"></div>
              <div>
                <div className="label">Farm / Company Overview</div>
                <div className="status">Complete</div>
              </div>
            </li>
            <li>
              <div className="circle"></div>
              <div>
                <div className="label">3-year Production History</div>
                <div className="status">Complete</div>
              </div>
            </li>
            <li>
              <div className="circle"></div>
              <div>
                <div className="label">Production Plan 2024</div>
                <div className="status">Complete</div>
              </div>
            </li>
            <li>
              <div className="circle"></div>
              <div>
                <div className="label">Risks</div>
                <div className="status">Complete</div>
              </div>
            </li>
            <li>
              <div className="circle"></div>
              <div>
                <div className="label">Customers & Suppliers</div>
                <div className="status">Complete</div>
              </div>
            </li>
            <li>
              <div className="circle"></div>
              <div>
                <div className="label">Your Team</div>
                <div className="status">Complete</div>
              </div>
            </li>
          </ul>
        </Sidebar>

       
        <FormContainer>
  <h2>Farm / Company Overview</h2>
  <form>
    <FormGroup>
      <label htmlFor="farmName">Farm Name</label>
      <input
        type="text"
        id="farmName"
        name="farmName"
        value={farmName}
        readOnly
      />
    </FormGroup>
    <FormGroup>
      <label htmlFor="farmLocation">Farm Location</label>
      <input
        type="text"
        id="farmLocation"
        name="farmLocation"
        value={formData.farmLocation}
        onChange={handleChange}
      />
    </FormGroup>
    <FormGroup>
      <label>Are you a full-time farmer?</label><br />
      <ButtonGroup flex={1}>
  <button
    type="button"
    className={`option-button ${formData.isFullTimeFarmer === "Yes" ? "active" : ""}`}
    onClick={() => setFormData({ ...formData, isFullTimeFarmer: "Yes" })}
  >
    Yes
  </button>
  <button
    type="button"
    className={`option-button ${formData.isFullTimeFarmer === "No" ? "active" : ""}`}
    onClick={() => setFormData({ ...formData, isFullTimeFarmer: "No" })}
  >
    No
  </button>
</ButtonGroup>

    </FormGroup>
    <FormGroup>
      <label htmlFor="farmBackground">Describe your farm background</label>
      <textarea
        id="farmBackground"
        name="farmBackground"
        value={formData.farmBackground}
        onChange={handleChange}
      ></textarea>
    </FormGroup>
    <FormGroup>
      <label>Is your farm owned or leased?</label><br />
      <ButtonGroup>
        <button
          type="button"
          className={`option-button ${
            formData.ownershipStatus === "Owned" ? "active" : ""
          }`}
          onClick={() =>
            setFormData({ ...formData, ownershipStatus: "Owned" })
          }
        >
          Owned
        </button>
        <button
          type="button"
          className={`option-button ${
            formData.ownershipStatus === "Leased" ? "active" : ""
          }`}
          onClick={() =>
            setFormData({ ...formData, ownershipStatus: "Leased" })
          }
        >
          Leased
        </button>
        <button
          type="button"
          className={`option-button ${
            formData.ownershipStatus === "Both" ? "active" : ""
          }`}
          onClick={() =>
            setFormData({ ...formData, ownershipStatus: "Both" })
          }
        >
          Both
        </button>
      </ButtonGroup>
    </FormGroup>
    <h3>Leasing Information</h3><br />
    <div className="form-grid">
      <FormGroup>
        <label htmlFor="hectaresLeased">Hectares Leased</label>
        <input
          type="text"
          id="hectaresLeased"
          name="hectaresLeased"
          value={formData.hectaresLeased}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="lengthOfLease">Length of Lease</label>
        <input
          type="text"
          id="lengthOfLease"
          name="lengthOfLease"
          value={formData.lengthOfLease}
          onChange={handleChange}
        />
      </FormGroup>
    </div>
    <h3>Owned Land Information</h3><br />
    <FormGroup>
      <label htmlFor="hectaresOwned">Hectares Owned</label>
      <input
        type="text"
        id="hectaresOwned"
        name="hectaresOwned"
        value={formData.hectaresOwned}
        onChange={handleChange}
      />
    </FormGroup>
    <h3>Irrigation Details</h3><br />
    <div className="form-grid">
      <FormGroup>
        <label htmlFor="irrigatedHectares">Irrigated Hectares</label>
        <input
          type="text"
          id="irrigatedHectares"
          name="irrigatedHectares"
          value={formData.irrigatedHectares}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="drylandHectares">Dryland Hectares</label>
        <input
          type="text"
          id="drylandHectares"
          name="drylandHectares"
          value={formData.drylandHectares}
          onChange={handleChange}
        />
      </FormGroup>
    </div>

    
    <ButtonWrapper>
        <NextButton onClick={handleNextClick}>Next</NextButton>
      </ButtonWrapper>

  </form>
</FormContainer>


      </MainContainer>
    </PageWrapper>
  );
};

export default ApplicationPage;
