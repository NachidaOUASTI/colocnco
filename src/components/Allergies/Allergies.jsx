import './Allergies.scss';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const getRandomColor = () => {
  // Générer une couleur hexadécimale aléatoire
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export default function Allergies() {
  const [newAllergy, setNewAllergy] = useState('');
  const [allergies, setAllergies] = useState([
    {
      id: 1,
      label: 'Gluten',
      color: getRandomColor(),
    },
    {
      id: 13,
      label: 'Lactose',
      color: getRandomColor(),
    },
    {
      id: 4,
      label: 'Oeufs',
      color: getRandomColor(),
    },
    {
      id: 8,
      label: "Poils d'animaux",
      color: getRandomColor(),
    },
  ]);
  function handleSubmit(e) {
    e.preventDefault();
    const newAllergyToAdd = {
      id: uuidv4(),
      label: newAllergy,
      color: getRandomColor(),
    };
    const newAllergyList = [...allergies];
    newAllergyList.push(newAllergyToAdd);
    setAllergies(newAllergyList);
    console.log('newTaskToAdd', newAllergyToAdd);
  }

  const handleDeleteAllergy = (allergyId) => {
    const updatedAllergies = allergies.filter(
      (allergy) => allergy.id !== allergyId
    );
    setAllergies(updatedAllergies);
  };

  return (
    <div className="listContainer">
      <form className="listContainer__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newAllergy}
          className="listContainer__form__new__allergy"
          placeholder="Ajouter une Allergie"
          onChange={(e) => setNewAllergy(e.target.value)}
        />
      </form>
      <div className="listContainer__list">
        <ul>
          {allergies.map((allergy) => (
            <li
              className="listContainer__list__allergies"
              key={allergy.id}
              style={{
                backgroundColor: allergy.color,
                padding: '8px',
                margin: '4px',
                borderRadius: '20px',
                color: 'white',
              }}
            >
              {allergy.label}
              <button
                type="button"
                onClick={() => handleDeleteAllergy(allergy.id)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
