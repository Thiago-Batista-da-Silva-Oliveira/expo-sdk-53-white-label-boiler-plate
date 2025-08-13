import { IAppointment } from '@/types/trip';

const mockScheduledAppointments: IAppointment[] = [
  {
    id: '1',
    masterId: 'master-1',
    corporateName: 'Onecar Transportes',
    estimatedPrice: 45.50,
    distance: 12.5,
    travelTime: '25 min',
    driverId: 'driver-1',
    addressFrom: 'Rua das Flores, 123 - Centro',
    addressTo: 'Av. Paulista, 1578 - Bela Vista',
    cityOfOrigin: 'São Paulo',
    cityOfDestination: 'São Paulo',
    vehicleCategoryName: 'Executivo',
    passenger: 'João Silva',
    licensePlate: 'ABC-1234',
    driver: 'Carlos Santos',
    date: new Date('2024-01-20T14:30:00'),
    requestedAt: '2024-01-15T10:00:00',
    scheduledDate: '2024-01-20T14:30:00',
    status: 'scheduled',
    color: '#22c55e',
    background: '#dcfce7',
    recurringTrip: 'false',
    stopPoints: [],
    users: []
  },
  {
    id: '2',
    masterId: 'master-2',
    corporateName: 'Onecar Transportes',
    estimatedPrice: 32.75,
    distance: 8.2,
    travelTime: '18 min',
    driverId: '',
    addressFrom: 'Rua Augusta, 456 - Consolação',
    addressTo: 'Shopping Iguatemi - Faria Lima',
    cityOfOrigin: 'São Paulo',
    cityOfDestination: 'São Paulo',
    vehicleCategoryName: 'Confort',
    passenger: 'João Silva',
    licensePlate: '',
    driver: '',
    date: new Date('2024-01-22T09:15:00'),
    requestedAt: '2024-01-16T15:30:00',
    scheduledDate: '2024-01-22T09:15:00',
    status: 'requested',
    color: '#f59e0b',
    background: '#fef3c7',
    recurringTrip: 'false',
    stopPoints: [],
    users: []
  },
  {
    id: '3',
    masterId: 'master-3',
    corporateName: 'Onecar Transportes',
    estimatedPrice: 28.90,
    distance: 6.8,
    travelTime: '15 min',
    driverId: 'driver-3',
    addressFrom: 'Aeroporto de Guarulhos',
    addressTo: 'Hotel Copacabana - Ipanema',
    cityOfOrigin: 'Guarulhos',
    cityOfDestination: 'São Paulo',
    vehicleCategoryName: 'Premium',
    passenger: 'João Silva',
    licensePlate: 'XYZ-5678',
    driver: 'Maria Oliveira',
    date: new Date('2024-01-25T16:45:00'),
    requestedAt: '2024-01-18T12:20:00',
    scheduledDate: '2024-01-25T16:45:00',
    status: 'scheduled',
    color: '#22c55e',
    background: '#dcfce7',
    recurringTrip: 'false',
    stopPoints: [],
    users: []
  }
];

const mockRecurringAppointments: IAppointment[] = [
  {
    id: '4',
    masterId: 'master-4',
    corporateName: 'Onecar Transportes',
    estimatedPrice: 38.25,
    distance: 10.3,
    travelTime: '22 min',
    driverId: 'driver-2',
    addressFrom: 'Rua da Consolação, 789',
    addressTo: 'Escritório Central - Vila Olímpia',
    cityOfOrigin: 'São Paulo',
    cityOfDestination: 'São Paulo',
    vehicleCategoryName: 'Executivo',
    passenger: 'João Silva',
    licensePlate: 'DEF-9876',
    driver: 'Roberto Lima',
    date: new Date('2024-01-19T08:00:00'),
    requestedAt: '2024-01-10T14:00:00',
    scheduledDate: 'Segunda a Sexta - 08:00',
    status: 'scheduled',
    color: '#22c55e',
    background: '#dcfce7',
    recurringTrip: 'true',
    stopPoints: [],
    users: []
  },
  {
    id: '5',
    masterId: 'master-5',
    corporateName: 'Onecar Transportes',
    estimatedPrice: 42.10,
    distance: 11.7,
    travelTime: '28 min',
    driverId: '',
    addressFrom: 'Escritório Central - Vila Olímpia',
    addressTo: 'Rua da Consolação, 789',
    cityOfOrigin: 'São Paulo',
    cityOfDestination: 'São Paulo',
    vehicleCategoryName: 'Executivo',
    passenger: 'João Silva',
    licensePlate: '',
    driver: '',
    date: new Date('2024-01-19T18:30:00'),
    requestedAt: '2024-01-10T14:00:00',
    scheduledDate: 'Segunda a Sexta - 18:30',
    status: 'requested',
    color: '#f59e0b',
    background: '#fef3c7',
    recurringTrip: 'true',
    stopPoints: [],
    users: []
  }
];

export const appointmentMocks = {
  getPassengerTripsWithFilter: async (type: 'requests' | 'recurring'): Promise<IAppointment[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (type === 'recurring') {
      return mockRecurringAppointments;
    }
    
    return mockScheduledAppointments;
  },

  userCancelAppointment: async (id: string): Promise<{ success: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const scheduledIndex = mockScheduledAppointments.findIndex(apt => apt.id === id);
    const recurringIndex = mockRecurringAppointments.findIndex(apt => apt.id === id);
    
    if (scheduledIndex !== -1) {
      mockScheduledAppointments.splice(scheduledIndex, 1);
      return { success: true, message: 'Agendamento cancelado com sucesso!' };
    }
    
    if (recurringIndex !== -1) {
      mockRecurringAppointments.splice(recurringIndex, 1);
      return { success: true, message: 'Viagem recorrente cancelada com sucesso!' };
    }
    
    throw new Error('Agendamento não encontrado');
  }
};