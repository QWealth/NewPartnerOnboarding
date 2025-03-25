import { useState, useEffect } from "react";
import "./App.css";
import AccountForm from "./components/AccountForm";
import TaxResidencyForm from "./components/TaxResidencyForm";
import IdentificationUpload from "./components/IdentificationUpload";

interface Account {
  accountNumber: string;
  accountType: "individual" | "joint";
  firstName: string;
  lastName: string;
  jointFirstName?: string;
  jointLastName?: string;
}

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [namesSet, setNamesSet] = useState<Set<string>>(new Set());

  const addAccount = (newAccount: Account) => {
    setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
  };

  useEffect(() => {
    const newNamesSet = new Set<string>();

    accounts.forEach((account) => {
      // Add the individual account name
      newNamesSet.add(`${account.firstName} ${account.lastName}`);

      // If it's a joint account, add the joint account name
      if (account.jointFirstName && account.jointLastName) {
        newNamesSet.add(`${account.jointFirstName} ${account.jointLastName}`);
      }
    });

    setNamesSet(newNamesSet); // Update state with the new set
  }, [accounts]);

  return (
    <>
      <div>
        <h1>Account Management</h1>
        <AccountForm onAddAccount={addAccount} />
        <h2>Accounts</h2>
        <ul>
          {accounts.map((account, index) => (
            <li key={index}>
              Account Number: {account.accountNumber} | Type:{" "}
              {account.accountType} | Holder: {account.firstName}{" "}
              {account.lastName}
              {account.accountType === "joint" &&
                ` | Joint Holder: ${account.jointFirstName} ${account.jointLastName}`}
            </li>
          ))}
        </ul>
        {Array.from(namesSet).map((name, index) => (
          <div key={index}>
            <TaxResidencyForm key={index} name={name} />
            <IdentificationUpload name={name} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
