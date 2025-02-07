"use client";

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {Equipement} from "@/app/models/equipement";
import { useParams } from 'next/navigation'
import {Card, CardContent, Typography, CircularProgress, Box, CardHeader, Divider} from '@mui/material'
import { styled } from '@mui/system';
import "@/app/styles/datas.css";

const StyledCard = styled(Card)({
    width: "100%",
    maxWidth: "600px",
    margin: "20px auto",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
});
const EquipementDetailsPage = () => {
    const params = useParams();
    const { id } = params;

    const [equipementData, setEquipementData] = useState<Equipement | null>(null);
    const [loading, setLoading] = useState(true);
    const [mapUrl, setMapUrl] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/api/data-info/${id}`);
                const data = await res.json();

                if (data?.equipements?.data && data.equipements.data.length > 0) {
                    const equipement = data.equipements.data[0];
                    setEquipementData(equipement);
                    if (equipement?.geo_point_2d?.lat && equipement?.geo_point_2d?.lon) {
                        const { lat, lon } = equipement.geo_point_2d;
                        setMapUrl(`https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`);
                    }
                } else {
                    setEquipementData(null);
                }

                setLoading(false);
            };

            fetchData();
        }
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!equipementData) {
        return <div>No data found for the given ID</div>;
    }

    return (
        <div className="page-container">
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <StyledCard>
            <Card>
                <CardHeader
                    title={equipementData.nom || 'Unknown Name'}
                    sx={{
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        textAlign: "center",
                        backgroundColor: "#f5f5f5",
                        padding: "16px",
                        borderRadius: "8px",
                    }}
                />
                <CardContent>
                    <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                        <strong>📍 Location:</strong> {equipementData?.adresse || 'No address available'}, {equipementData?.code_postal || 'No postal code'}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                        <strong>🔋 Type:</strong> {equipementData?.type || 'No type available'}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                        <strong>📈 Opening Status:</strong>
                        {equipementData.statut_ouverture?.trim() === 'Ouvert' ? 'Open' :
                            equipementData.statut_ouverture?.trim() === 'Eteint' ? 'Closed' : 'No Info'}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                        <strong>Opening Period:</strong> {equipementData?.horaires_periode || 'No period details available'}
                    </Typography>
                    {equipementData?.horaires_lundi || equipementData?.horaires_mardi || equipementData?.horaires_mercredi || equipementData?.horaires_jeudi ||
                    equipementData?.horaires_vendredi || equipementData?.horaires_samedi || equipementData?.horaires_dimanche ? (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6">🗓 Weekly Hours:</Typography>
                            <div className="calendar">
                                <Typography variant="body2">
                                    <strong>Lundi:</strong> {equipementData?.horaires_lundi || 'Closed'}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Mardi:</strong> {equipementData?.horaires_mardi || 'Closed'}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Mercredi:</strong> {equipementData?.horaires_mercredi || 'Closed'}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Jeudi:</strong> {equipementData?.horaires_jeudi || 'Closed'}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Vendredi:</strong> {equipementData?.horaires_vendredi || 'Closed'}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Samedi:</strong> {equipementData?.horaires_samedi || 'Closed'}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Dimanche:</strong> {equipementData?.horaires_dimanche || 'Closed'}
                                </Typography>
                            </div>
                        </>
                    ) : null}

                    <Typography variant="body1">
                        <strong>🤝 Paying:</strong>
                        <span style={{ color: equipementData?.payant === 'Oui' ? 'green' : 'red' }}>
              {equipementData?.payant === 'Oui' ? 'Paid Access' : 'Free'}
            </span>
                    </Typography>

                    {mapUrl && (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <iframe src={mapUrl} width="100%" height="300px" frameBorder="0" title="Map location" />
                        </>
                    )}

                    {equipementData?.geo_point_2d?.lat && equipementData?.geo_point_2d?.lon && (
                        <Typography variant="body1">
                            <strong>Location:</strong> See on the map for exact address.
                        </Typography>
                    )}
                </CardContent>
            </Card>
            </StyledCard>
        </Box>
        </div>
    );
};

export default EquipementDetailsPage;
