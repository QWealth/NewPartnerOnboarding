// AccountForm.tsx
import React, { useState } from "react";

interface Account {
  accountNumber: string;
  accountType: "individual" | "joint";
  firstName: string;
  lastName: string;
  jointFirstName?: string;
  jointLastName?: string;
}

interface AccountFormProps {
  onAddAccount: (newAccount: Account) => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ onAddAccount }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState<"individual" | "joint">(
    "individual"
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jointFirstName, setJointFirstName] = useState("");
  const [jointLastName, setJointLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountNumber || !firstName || !lastName) {
      alert("Please fill in all required fields");
      return;
    }

    const newAccount: Account = {
      accountNumber,
      accountType,
      firstName,
      lastName,
      jointFirstName: accountType === "joint" ? jointFirstName : undefined,
      jointLastName: accountType === "joint" ? jointLastName : undefined,
    };

    // Pass the new account to the parent component
    onAddAccount(newAccount);

    // Clear the form
    setAccountNumber("");
    setAccountType("individual");
    setFirstName("");
    setLastName("");
    setJointFirstName("");
    setJointLastName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Account Number</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Account Type</label>
        <select
          value={accountType}
          onChange={(e) =>
            setAccountType(e.target.value as "individual" | "joint")
          }
        >
          <option value="individual">Individual</option>
          <option value="joint">Joint</option>
        </select>
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {accountType === "joint" && (
        <>
          <div>
            <label>Joint Account Holder First Name</label>
            <input
              type="text"
              value={jointFirstName}
              onChange={(e) => setJointFirstName(e.target.value)}
            />
          </div>
          <div>
            <label>Joint Account Holder Last Name</label>
            <input
              type="text"
              value={jointLastName}
              onChange={(e) => setJointLastName(e.target.value)}
            />
          </div>
        </>
      )}

      <button type="submit">Add Account</button>
    </form>
  );
};

export default AccountForm;
