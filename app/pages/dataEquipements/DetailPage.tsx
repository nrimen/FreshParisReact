import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import {Equipement} from "@/app/models/equipement";

const DetailPage = () => {
    const { identifiant } = useParams(); // Récupérer l'ID depuis l'URL
    // const [data, setData] = useState(null);
    const [equipement, setEquipement] = useState<Equipement>();

    useEffect(() => {
        // Exemple : Charger les détails depuis une API ou un tableau local
        fetch(`/api/data-info/${identifiant}`)
            .then((response) => response.json())
            .then((result) => setEquipement(result))
            .catch((error) => console.error("Erreur lors du chargement", error));
    }, [identifiant]);

    if (!equipement) {
        return <p>Chargement des détails...</p>;
    }

    return (
        <div>
            <h2>Détails de l'élément {identifiant}</h2>
            <p>Nom : {equipement.nom}</p>
            {/* Ajoute d'autres champs selon les données */}
        </div>
    );
};

export default DetailPage;
