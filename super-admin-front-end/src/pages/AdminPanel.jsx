import { useState, useEffect } from 'react'

function AdminPanel() {
    const [orgs, setOrgs] = useState([])
    const [orgName, setOrgName] = useState("")
    const [editId, setEditId] = useState(null)
    const [editName, setEditName] = useState("")

    const API = "http://localhost:5000/api/organizations"
   
    // display all org GET
    const getOrgs = async () => {
        const response = await fetch(API, {
            credentials: "include"
        })
        const data = await response.json()
        setOrgs(data)
    }

    useEffect(() => {
        getOrgs();
    }, [])

    // create
    const createOrg = async (e) => {
        e.preventDefault();
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name: orgName })
        })
        setOrgName("");
        getOrgs();
    }

    // edit
    const updateOrg = async (id) => {
        await fetch(`${API}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name: editName })
        })
        setEditId(null);
        setEditName("");
        getOrgs();
    }

    // DELETE org
    const deleteOrg = async (id) => {
        await fetch(`${API}/${id}`, {
            method: "DELETE",
            credentials: "include"
        })
        getOrgs();
    }

    return (
        <div className="superAdminBg">
            <h1>Super Admin Panel</h1>

            <form onSubmit={createOrg}>
                <input
                    type="text"
                    placeholder="Organisation Name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>

            <ul>
                {orgs.map(org => (
                    <li key={org._id}>
                        {editId === org._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <button onClick={() => updateOrg(org._id)} className="saBtn">Save</button>
                                <button onClick={() => setEditId(null)} className="clBtn">Cancel</button>
                            </>
                        ) : (
                            <>
                                <p>{org.name}</p>
                                <button onClick={() => {
                                    setEditId(org._id)
                                    setEditName(org.name)
                                }} className="edBtn">Edit</button>
                                <button onClick={() => deleteOrg(org._id)} className="dlBtn">Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminPanel