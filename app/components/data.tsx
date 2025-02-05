"use client";


import React, { useState, useEffect } from "react";
import "../styles/datas.css";

const DataComponent = () => {
    const [equipements, setEquipements] = useState([]);

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [searchFilter, setSearchFilter] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterStatutOuverture, setFilterStatutOuverture] = useState('');
    const [filterPayant, setFilterPayant] = useState('');
    const [filteredEquipements, setFilteredEquipements] = useState([]);




    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/data-info?page=${page}&limit=${limit}`);
                const data = await res.json();
                setEquipements(data.equipements.data);
                setTotalCount(data.equipements.totalCount);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, limit]);
    useEffect(() => {
        const filteredData = equipements.filter((equipement) => {
            const name = equipement.nom?.toLowerCase() || '';
            const type = equipement.type?.toLowerCase() || '';
            const statutOuverture = equipement.statut_ouverture?.toLowerCase() || '';
            const payant = equipement.payant?.toLowerCase() || '';

            return (
                (searchFilter ? name.includes(searchFilter.toLowerCase()) : true) &&
                (filterType ? type.includes(filterType.toLowerCase()) : true) &&
                (filterStatutOuverture ? statutOuverture.includes(filterStatutOuverture.toLowerCase()) : true) &&
                (filterPayant ? payant.includes(filterPayant.toLowerCase()) : true)
            );
        });

        setFilteredEquipements(filteredData);
    }, [equipements, searchFilter, filterType, filterStatutOuverture, filterPayant]);

    const handleNext = () => setPage((prev) => prev + 1);
    const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 0));

    if (loading) return <p>Loading...</p>;

    const start = page * limit + 1;
    const end = Math.min((page + 1) * limit, totalCount);
    return (
        <div className="page-container">
            <div className="intro-section">
                <h2>Explore Paris’ Refreshing Spots & Activities 🌿</h2>
                <p>
                    Paris offers a range of refreshing spots and activities to enjoy your day! From the charming Musique
                    stations to the relaxing pools , you'll find perfect places for every moment. 🌳
                </p>
                <p>
                    Use the filters to find the best spots by type, or search by name to narrow down your search!
                    Whether you're looking for free access or paid experiences, there's something for everyone in the
                    city. 🔍💚
                </p>
            </div>
            <div className="search-container">
            <input
                type="text"
                placeholder="Search by Name"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="form-control search-input"
            />

            {/* Filters */}
            <select onChange={(e) => setFilterType(e.target.value)} className="search-field">
                <option value="">All Types</option>
            </select>

            <select onChange={(e) => setFilterStatutOuverture(e.target.value)} className="search-field">
                <option value="">All</option>
                <option value="ouvert">Open</option>
                <option value="eteint">Closed</option>
            </select>

            <select onChange={(e) => setFilterPayant(e.target.value)} className="search-field">
                <option value="">All</option>
                <option value="OUI">Paid</option>
                <option value="NON">Free Access</option>
            </select>
            </div>

            <div className="table-container">
                <table className="table-auto border-collapse w-full">
                    <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Adress</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Opening Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {equipements.map((equipement) => (
                        <tr key={equipement.identifiant}>
                            <td className="border p-2">{equipement.nom}</td>
                            <td className="border p-2">{equipement.adresse}</td>
                            <td className="border p-2">{equipement.type}</td>
                            <td className="border p-2">{equipement.statut_ouverture}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


            <div className="mt-4 flex justify-between">
                <button
                    onClick={handlePrevious}
                    disabled={page <= 0}
                    className="button"
                >
                    Previous
                </button>
                <div className="pagination-info">
                    <p>{`${start} - ${end} of ${totalCount}`}</p>
                </div>
                <button onClick={handleNext} className="button">
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataComponent;

