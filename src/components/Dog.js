import { useState } from 'react';

const Dog = ({ dog, handleDeleteDog, handleUpdateDog }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDog, setEditedDog] = useState(dog);

    const handleInputChange = (event) => {
        setEditedDog({ ...editedDog, [event.target.name]: event.target.value })
    };

    const handleEditing = (id) => {
        setIsEditing(!isEditing);
        if (isEditing) handleUpdateDog(id, editedDog);
    }

    return (
        <div className="card">
            {isEditing ? 
            <>
                <input name="name" value={editedDog.name} onChange={handleInputChange} />
                <input name="age" value={editedDog.age} onChange={handleInputChange} />
                <input name="img_url" value={editedDog.img_url} onChange={handleInputChange} />
            </>
                :
            <>
                <img className="dog-image" src={editedDog.img_url} alt={editedDog.name}/>
                <h2>{editedDog.name}</h2>
                <h3>Age: {editedDog.age}</h3>
            </>
            }
            <button onClick={() => handleEditing(dog._id)}>{isEditing ? 'Save' : 'Edit'}</button>
            <button onClick={() => handleDeleteDog(dog._id)}>Delete dog</button>
        </div>
    )
}

export default Dog;