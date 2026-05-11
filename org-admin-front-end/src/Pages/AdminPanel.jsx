import { useState, useEffect } from 'react'

function AdminPanel() {
    const [feature, setFeature] = useState([])
    const [newFeature, setNewFeature] = useState([])
    const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);
    const [editId, setEditId] = useState(null)
    const [editFeature, setEditFeature] = useState("")

    const API = "http://localhost:5000/feature-flags/features"

    const getFeatures = async () => {
        const response = await fetch(API, {
            credentials: "include"
        })
        const data = await response.json()
        setFeature(data)
    }

    useEffect(() => {
        getFeatures();
    }, [])

    // create
    const createFeature = async (e) => {
        e.preventDefault();
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ key: newFeature, isEnabled: isFeatureEnabled })
        });
        setNewFeature("")
       
    
    }

    // edit
    const updatefeature = async (id) => {
        await fetch(`${API}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name: editFeature })
        })
        setEditId(null);
        setEditFeature("");
        getFeatures();
    }

    // DELETE feature
    const deleteFeature = async (id) => {
        await fetch(`${API}/${id}`, {
            method: "DELETE",
            credentials: "include"
        })
        getFeatures();
    }

    return (
        <div className="superAdminBg">
            <h1>Super Admin Panel</h1>

            <form onSubmit={createFeature}>
                <input
                    type="text"
                    placeholder="Feature Key"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>

            <ul>
                {feature.map(ft => (
                    <li key={ft._id}>
                        {editId === ft._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editFeature}
                                    onChange={(e) => setEditFeature(e.target.value)}
                                />
                                <button onClick={() => updatefeature(ft._id)} className="saBtn">Save</button>
                                <button onClick={() => setEditId(null)} className="clBtn">Cancel</button>
                            </>
                        ) : (
                            <>
                                <p>{ft.name}</p>
                                <button onClick={() => {
                                    setEditId(ft._id)
                                    setEditFeature(ft.name)
                                }} className="edBtn">Edit</button>
                                <button onClick={() => deleteFeature(ft._id)} className="dlBtn">Delete</button>
                                <button onClick={() => setIsFeatureEnabled(!isFeatureEnabled)} className="enBtn">
                                    {isFeatureEnabled ? "Disable" : "Enable"}
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminPanel