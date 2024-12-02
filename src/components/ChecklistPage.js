import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  padding: 40px;
  max-width: 0 auto;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  background-color: #fff; /* Ensures the background is white */
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  text-align: left;
  margin: 5px 0 15px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  width: 200px;

  &:hover {
    background-color: #218838;
  }
`;

const ChecklistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Five equal columns */
  gap: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Column = styled.div`
  border-right: 1px solid #ddd;
  padding: 10px;

  &:last-child {
    border-right: none;
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px; /* Adjusted spacing for better alignment */
    color: #333;
  }

  p {
    font-size: 14px;
    color: #888;
    margin-bottom: 15px; /* Matches the prototype spacing */
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 20px; /* Adjusted spacing for clarity */

      label {
        margin-left: 10px;
        font-size: 14px;
        color: #555;
        cursor: pointer;
      }

      input[type='radio'] {
        appearance: none;
        border: 2px solid #ccc;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        outline: none;
        cursor: pointer;

        &:checked {
          background-color: #28a745;
          border-color: #28a745;
        }
      }

      &:not(:last-child)::after {
        content: '';
        position: absolute;
        left: 9px; /* Aligns with the center of the radio button */
        top: 22px; /* Adjusted for spacing */
        width: 2px;
        height: 15px; /* Adjusted line height */
        background-color: #ddd;
      }
    }
  }
`;

const ChecklistPage = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSelect = (column, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [column]: item,
    }));
  };

  const handleStartApplication = () => {
    navigate('/farmer-profile'); // Redirect to FarmerProfile route
  };

  return (
    <PageWrapper>
      <HeaderWrapper>
        <div>
          <Title>Your Application Checklist</Title>
          <Subtitle>Complete the following to submit an application</Subtitle>
        </div>
        <ActionButton onClick={handleStartApplication}>
          Start Application
        </ActionButton>
      </HeaderWrapper>
      <ChecklistContainer>
        <Column>
          <h2>1. Credit Check</h2>
          <p>Check if you qualify</p>
          <ul>
            {[].map(
              (item) => (
                <li key={item}>
                  <input
                    type="radio"
                    name="creditCheck"
                    checked={selectedItems['creditCheck'] === item}
                    onChange={() => handleSelect('creditCheck', item)}
                  />
                  <label>{item}</label>
                </li>
              )
            )}
          </ul>
        </Column>
        <Column>
          <h2>2. KYC</h2>
          <p>Check if you qualify</p>
          <ul>
            {['Applicant Details', 'Company Details', 'Director Details', 'Banking Details', '3-year Production History'].map(
              (item) => (
                <li key={item}>
                  <input
                    type="radio"
                    name="kyc"
                    checked={selectedItems['kyc'] === item}
                    onChange={() => handleSelect('kyc', item)}
                  />
                  <label>{item}</label>
                </li>
              )
            )}
          </ul>
        </Column>
        <Column>
          <h2>3. Farm Profile</h2>
          <p>Check if you qualify</p>
          <ul>
            {['Farm/Company Overview', 'Farm Description', 'Machinery and Equipment', '3-year Production History', 'Production Plan 2024'].map(
              (item) => (
                <li key={item}>
                  <input
                    type="radio"
                    name="farmProfile"
                    checked={selectedItems['farmProfile'] === item}
                    onChange={() => handleSelect('farmProfile', item)}
                  />
                  <label>{item}</label>
                </li>
              )
            )}
          </ul>
        </Column>
        <Column>
          <h2>4. Financial Information</h2>
          <p>Check if you qualify</p>
          <ul>
            {['Historical Performance', 'Cashflow - Revenue', 'Cashflow - Production', 'Assets', 'Liabilities', 'CAPEX', 'Funding Ask'].map(
              (item) => (
                <li key={item}>
                  <input
                    type="radio"
                    name="financialInfo"
                    checked={selectedItems['financialInfo'] === item}
                    onChange={() => handleSelect('financialInfo', item)}
                  />
                  <label>{item}</label>
                </li>
              )
            )}
          </ul>
        </Column>
        <Column>
          <h2>5. Uploads</h2>
          <p>Supporting Documents</p>
          <ul>
            {['COR 14.3', '2022 AFS', '2023 AFS', '2024 AFS', '6 months bank statements', "Directors ID's", 'Applicant ID', 'Water Rights'].map(
              (item) => (
                <li key={item}>
                  <input
                    type="radio"
                    name="uploads"
                    checked={selectedItems['uploads'] === item}
                    onChange={() => handleSelect('uploads', item)}
                  />
                  <label>{item}</label>
                </li>
              )
            )}
          </ul>
        </Column>
      </ChecklistContainer>
    </PageWrapper>
  );
};

export default ChecklistPage;
