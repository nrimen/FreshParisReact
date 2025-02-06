"use client";


import React, {useState, useEffect, useMemo, useCallback} from "react";
import "../../styles/datas.css";
import {FormControl, InputLabel, Select, MenuItem, TextField} from "@mui/material";
import {Equipement} from "@/app/models/equipement";

const DataComponent = () => {
    const [equipements, setEquipements] = useState<Equipement[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [limit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [searchFilter, setSearchFilter] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterStatutOuverture, setFilterStatutOuverture] = useState('');
    const [filterPayant, setFilterPayant] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchFilter);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchFilter]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                    search: debouncedSearch,
                });

                if (filterType) queryParams.append("filterType", filterType);
                if (filterStatutOuverture) queryParams.append("filterStatutOuverture", filterStatutOuverture);
                if (filterPayant) queryParams.append("filterPayant", filterPayant);

                const res = await fetch(`/api/data-info?${queryParams.toString()}`);
                const data = await res.json();
                setEquipements(data.equipements.data);
                setTotalCount(data.equipements.totalCount);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, limit, debouncedSearch, filterType, filterStatutOuverture, filterPayant]);

//The useEffect cause a component re-render every time dependencies change so its better to use useMemo so it computes  the filtered result without triggering re-renders.

    const filteredEquipements = useMemo(() => {
        return equipements.filter((equipement) => {
            const name = equipement.nom?.toLowerCase() || "";
            const type = equipement.type?.toLowerCase() || "";
            const statutOuverture = equipement.statut_ouverture?.toLowerCase() || "";
            const payant = equipement.payant?.toLowerCase() || "";

            return (
                (debouncedSearch ? name.includes(debouncedSearch.toLowerCase()) : true) &&
                (filterType ? type.includes(filterType.toLowerCase()) : true) &&
                (filterStatutOuverture ? statutOuverture.includes(filterStatutOuverture.toLowerCase()) : true) &&
                (filterPayant ? payant.includes(filterPayant.toLowerCase()) : true)
            );
        });
    }, [equipements, debouncedSearch, filterType, filterStatutOuverture, filterPayant]);


    const uniqueTypes = useMemo(() => {
        return [...new Set(equipements.map((item) => item.type))];
    }, [equipements]);


    // const handleNext = () => setPage((prev) => prev + 1);
    // const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 0));

//useCallback to memorize functions so they don't recreated unnecessarly
    const handleNext = useCallback(() => {
        setPage((prev) => prev + 1);
    }, []);

    const handlePrevious = useCallback(() => {
        setPage((prev) => Math.max(prev - 1, 0));
    }, []);

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
                <TextField variant="standard" label="Search by Name"
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="form-control search-field"
                />

            {/* Filters */}
                <FormControl variant="outlined" className="search-field">
                    <InputLabel>Filter by Type</InputLabel>
                    <Select
                        defaultValue=""
                        onChange={(e) => setFilterType(e.target.value)}
                        label="Filter by Type"
                    >

                    <MenuItem value="">All Types</MenuItem>
                        {uniqueTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className="search-field">
                    <InputLabel>Filter by Opening Status</InputLabel>
                    <Select
                        defaultValue=""
                        onChange={(e) => setFilterStatutOuverture(e.target.value)}
                        label="Filter by Opening Status"
                    >
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="ouvert">Open</MenuItem>
                        <MenuItem value="eteint">Closed</MenuItem>

                    </Select>
                </FormControl>
                <FormControl variant="outlined" className="search-field">
                    <InputLabel>Filter by Payment</InputLabel>
                    <Select
                        defaultValue=""
                        onChange={(e) => setFilterPayant(e.target.value)}
                        label="Filter by Opening Status"
                    >
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="OUI">Paid</MenuItem>
                        <MenuItem value="NON">Free Access</MenuItem>

                    </Select>
                </FormControl>

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
                    {filteredEquipements.map((equipement) => (
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

