import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createService, updateService, deleteService, getServices } from '../redux/actions/servicos_actions';
import { RootState } from '../redux/store';
import { AppDispatch } from '../redux/store';

export const ServicosAlterar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading, error } = useSelector((state: RootState) => state.services);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Carregar os serviços ao montar o componente
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedService) {
      // Se um serviço foi selecionado, chama a função de atualizar
      dispatch(updateService({ id: selectedService, name, description }));
    } else {
      // Caso contrário, chama a função de criar um novo serviço
      dispatch(createService({ name, description }));
    }
    resetForm();
  };

  const handleEdit = (serviceId: string, currentName: string, currentDescription: string) => {
    setSelectedService(serviceId);
    setName(currentName);
    setDescription(currentDescription);
  };

  const handleDelete = (serviceId: string) => {
    dispatch(deleteService(serviceId));
  };

  const resetForm = () => {
    setSelectedService(null);
    setName('');
    setDescription('');
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h2>{selectedService ? 'Editar Serviço' : 'Criar Serviço'}</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Nome do Serviço' required />
        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Descrição' required />
        <button type='submit'>{selectedService ? 'Atualizar' : 'Criar'}</button>
        {selectedService && (
          <button type='button' onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <h3>Lista de Serviços</h3>
      <ul>
        {services.map((service: { id: string; name: string; description: string }) => (
          <li key={service.id}>
            {service.name} - {service.description}
            <button onClick={() => handleEdit(service.id, service.name, service.description)}>Editar</button>
            <button onClick={() => handleDelete(service.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicosAlterar;
