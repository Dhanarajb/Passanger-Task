import { useState } from 'react';
import './App.css';

function App() {
  const [passenger, setPassenger] = useState([]);
  const [newPassanger, setNewPassanger] = useState({
    name: '',
    age: '',
    birthPreference: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassanger({ ...newPassanger, [name]: value });
    setError(''); 
  };

  const handleAddPassanger = () => {
    const { name, age, birthPreference } = newPassanger;

    if (!name || !age || !birthPreference) {
      setError('All fields are required');
      return;
    }

    if (isNaN(age) || age <= 0) {
      setError('Age must be a positive number');
      return;
    }

    const duplicate = passenger.some(
      (pass) => pass.name === name && pass.birthPreference === birthPreference
    );
    if (duplicate) {
      setError(
        'Passenger with the same name and birth preference already exists'
      );
      return;
    }

    
    setPassenger([...passenger, newPassanger]);
    setNewPassanger({ name: '', age: '', birthPreference: '' });
    setError(''); 
  };

  const handleDeletePassenger = (index) => {
    const updatedPassengers = passenger.filter((_, i) => i !== index);
    setPassenger(updatedPassengers);
  };

  const handleSavePass = () => {
    console.log('Saved passengers:', passenger);
  };

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={newPassanger.name}
          placeholder="Enter name"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          value={newPassanger.age}
          placeholder="Enter age"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="birthPreference">Birth Preference</label>
        <select
          name="birthPreference"
          value={newPassanger.birthPreference}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Upper">Upper</option>
          <option value="Middle">Middle</option>
          <option value="Lower">Lower</option>
        </select>
      </div>
      <button onClick={handleAddPassanger}>Add Passenger</button>

      {error && <p className="error">{error}</p>}

      <ul className="passenger-list">
        {passenger.map((pass, index) => (
          <li key={index}>
            <span>
              {pass.name}, Age: {pass.age}, Birth Preference:{' '}
              {pass.birthPreference}
            </span>
            <button onClick={() => handleDeletePassenger(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {passenger.length > 0 && (
        <button onClick={handleSavePass}>Save Passenger</button>
      )}
    </div>
  );
}

export default App;
