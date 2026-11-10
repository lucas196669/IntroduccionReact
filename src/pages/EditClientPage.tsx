/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Client } from '../interfaces/Client';
import { ClientsService } from '../services/ClientsService';

export default function EditClientPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState<Client>({
        name: '',
        email: '',
        phone: ''
    });

    // Consultar
    const loadClient = async () => {
        try {
            const data = await ClientsService.getClient(Number(id));
            setClient({
                name: data.name ?? '',
                email: data.email ?? '',
                phone: data.phone ?? ''
            });
        } catch (error) {
            console.error('Error cargando cliente:', error);
        }
    };

    // Carga inicial
    useEffect(() => {
        loadClient();
    }, [id]);

    // Actualizar + Redirección
    const update = async () => {
        try {
            await ClientsService.updateClient(Number(id), client);
            navigate('/clients');
        } catch (error) {
            console.error('Error actualizando cliente:', error);
            alert('No se pudo actualizar el cliente');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Editar Cliente</h2>
            <input className="form-control mb-2" placeholder="Nombre" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
            <input className="form-control mb-2" placeholder="Email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} />
            <input className="form-control mb-2" placeholder="Teléfono" value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} />
            <button className="btn btn-success me-2" onClick={update}>Actualizar</button>
            <button className="btn btn-secondary" onClick={() => navigate('/clients')}>Cancelar</button>
        </div>
    );
}
