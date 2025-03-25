import React, { useState } from 'react';

interface TaxResidencyFormProps {
  name: string;
}

interface CountryInput {
  countryName: string;
  itinNumber: string;
}

const TaxResidencyForm: React.FC<TaxResidencyFormProps> = ({ name }) => {
  const [hasTaxResidency, setHasTaxResidency] = useState(false);
  const [countries, setCountries] = useState<CountryInput[]>([]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasTaxResidency(e.target.checked);
    if (!e.target.checked) {
      setCountries([]); // Clear countries list if checkbox is unchecked
    }
  };

  const handleAddCountry = () => {
    setCountries([...countries, { countryName: '', itinNumber: '' }]);
  };

  const handleCountryChange = (index: number, field: keyof CountryInput, value: string) => {
    const newCountries = [...countries];
    newCountries[index] = { ...newCountries[index], [field]: value };
    setCountries(newCountries);
  };

  const handleRemoveCountry = (index: number) => {
    const newCountries = countries.filter((_, i) => i !== index);
    setCountries(newCountries);
  };

  return (
    <div>
      <h2>{name}</h2>
      <div>
        <label>
          Do you have tax residency outside Canada?
          <input type="checkbox" checked={hasTaxResidency} onChange={handleCheckboxChange} />
        </label>
      </div>

      {hasTaxResidency && (
        <div>
          <button onClick={handleAddCountry}>Add Country</button>
          {countries.map((country, index) => (
            <div key={index} style={{ marginTop: '10px' }}>
              <h3>Country {index + 1}</h3>
              <div>
                <label>Country Name:</label>
                <input
                  type="text"
                  value={country.countryName}
                  onChange={(e) => handleCountryChange(index, 'countryName', e.target.value)}
                />
              </div>
              <div>
                <label>ITIN Number:</label>
                <input
                  type="text"
                  value={country.itinNumber}
                  onChange={(e) => handleCountryChange(index, 'itinNumber', e.target.value)}
                />
              </div>
              <button onClick={() => handleRemoveCountry(index)}>Remove Country</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaxResidencyForm;

