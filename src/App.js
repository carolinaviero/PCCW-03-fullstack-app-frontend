import './App.css';
import { useEffect, useState } from 'react';
import Dog from './components/Dog';

const App = () => {
  const [dogs, setDogs] = useState(null);
  const [newDog, setNewDog] = useState({
    name: '',
    age: undefined,
    img_url: ''  
  })

  const fetchDogs = () => {
    fetch('/dogs')
    .then(response => response.json())
    .then(data => setDogs(data))
  };

  const handleAddDog = () => {
    console.log(newDog)
    fetch('/dogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDog)
      }
    )
    .then(response => response.json())
    .then(data => setDogs([...dogs, data]))

    setNewDog({ name: '', age: '', img_url: '' })
  }

  const handleDeleteDog = (id) => {
    fetch(`/dogs/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

    const remainingDogs = dogs.filter(dog => dog._id !== id)
    setDogs(remainingDogs);
  }

  const handleUpdateDog = (id, updatedDog) => {
    fetch(`/dogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDog)
    })
  }

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <>
      <h1>Welcome to our dog shelter!</h1>
      <input name="name" placeholder='Dog name' onChange={(e) => setNewDog({ ...newDog, name: e.target.value })} value={newDog.name} />
      <input name="age" placeholder='Dog age' onChange={(e) => setNewDog({ ...newDog, age: Number(e.target.value) })} value={newDog.age} />
      <input name="img_url" placeholder='Dog image' onChange={(e) => setNewDog({ ...newDog, img_url: e.target.value })} value={newDog.img_url} />
      <button onClick={handleAddDog}>Submit</button>
      <div className="app">
      {dogs?.map(dog => <Dog key={dog._id} dog={dog} handleDeleteDog={handleDeleteDog} handleUpdateDog={handleUpdateDog} />)}
    </div>
    </>
  );
}

export default App;
