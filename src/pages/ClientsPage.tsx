/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ClientsService } from '../services/ClientsService';

export default function ClientsPage() {
    const [clients, setClients] = useState<any[]>([]);

    const loadClients = async () => {
        try {
            const data = await ClientsService.getClients();
            console.log('Clientes:', data);
            setClients(data ?? []);
        } catch (error) {
            console.error('Error cargando clientes:', error);
        }
    };

    useEffect(() => {
        loadClients();
    }, []);

    const remove = async (id: number) => {
        const ok = window.confirm('¿Seguro que quieres eliminar este cliente?');
        if (!ok) return;
        try {
            await ClientsService.deleteClient(id);
            await loadClients();
        } catch (error) {
            console.error('Error eliminando cliente:', error);
            alert('No se pudo eliminar el cliente');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Clientes</h2>
            <Link to="/addclients" className="btn btn-primary mb-3">Nuevo Cliente</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>
                                <Link
                                    to={`/editclient/${client.id}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Editar
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => remove(client.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

