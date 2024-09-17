import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../redux/actions/servicos_actions';
import { RootState, AppDispatch } from '../redux/store';

export const ServicosListar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading, error } = useSelector((state: RootState) => state.services);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h3>Lista de Serviços</h3>
      <ul>
        {services.map((service: { id: string; name: string; description: string }) => (
          <li key={service.id}>
            {service.name} - {service.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicosListar;
