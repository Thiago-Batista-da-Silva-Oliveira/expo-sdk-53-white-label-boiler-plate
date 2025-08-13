import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { TravelHistoryItem } from '@/mocks/tripMocks';
import { format } from 'date-fns';

interface HistoryCardProps {
  trip: TravelHistoryItem;
  onViewDetails: () => void;
}

const CardContainer = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  padding: 16px;
  shadow-color: ${({ theme }) => theme.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const DateHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.border};
`;

const DateText = styled.Text`
  color: ${({ theme }) => theme.primary[500]};
  font-size: 14px;
  font-weight: 600;
`;

const StatusBadge = styled.View`
  background-color: ${({ theme }) => theme.success[100]};
  border-radius: 12px;
  padding: 4px 8px;
`;

const StatusText = styled.Text`
  color: ${({ theme }) => theme.success[700]};
  font-size: 12px;
  font-weight: 600;
`;

const AddressContainer = styled.View`
  margin-bottom: 12px;
`;

const AddressRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const AddressIndicator = styled.View<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
  margin-right: 12px;
`;

const AddressText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  flex: 1;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const InfoItem = styled.View`
  align-items: center;
  flex: 1;
`;

const InfoIcon = styled.Text`
  font-size: 16px;
  margin-bottom: 4px;
`;

const InfoLabel = styled.Text`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 12px;
  text-align: center;
`;

const InfoValue = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

const DetailsButton = styled.View`
  background-color: ${({ theme }) => theme.primary[100]};
  border-radius: 8px;
  padding: 8px 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

const DetailsButtonText = styled.Text`
  color: ${({ theme }) => theme.primary[700]};
  font-size: 14px;
  font-weight: 600;
  margin-left: 6px;
`;


const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}min`;
  }
  return `${mins}min`;
};

export const HistoryCard: React.FC<HistoryCardProps> = ({
  trip,
  onViewDetails,
}) => {
  return (
    <CardContainer onPress={onViewDetails} activeOpacity={0.7}>
      <DateHeader>
        <DateText>📅 {format(new Date(trip.tripFinalDate), 'dd/MM/yyyy HH:mm')}</DateText>
        <StatusBadge>
          <StatusText>✅ Concluída</StatusText>
        </StatusBadge>
      </DateHeader>

      <AddressContainer>
        <AddressRow>
          <AddressIndicator color="#22c55e" />
          <AddressText>{trip.addressFrom}</AddressText>
        </AddressRow>
        <AddressRow>
          <AddressIndicator color="#ef4444" />
          <AddressText>{trip.addressTo}</AddressText>
        </AddressRow>
      </AddressContainer>

      <InfoContainer>
        <InfoItem>
          <InfoIcon>👨‍✈️</InfoIcon>
          <InfoLabel>Motorista</InfoLabel>
          <InfoValue>{trip.driver?.user.name || 'Empresa externa'}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoIcon>⏱️</InfoIcon>
          <InfoLabel>Tempo</InfoLabel>
          <InfoValue>{(trip.travelTime && typeof trip.travelTime === 'number') ? formatTime(trip.travelTime): '-'}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoIcon>📏</InfoIcon>
          <InfoLabel>Distância</InfoLabel>
          <InfoValue>{trip.distance}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoIcon>👥</InfoIcon>
          <InfoLabel>Passageiros</InfoLabel>
          <InfoValue>{trip.passengers}</InfoValue>
        </InfoItem>
      </InfoContainer>

      <DetailsButton>
        <InfoIcon>🔍</InfoIcon>
        <DetailsButtonText>Ver detalhes</DetailsButtonText>
      </DetailsButton>
    </CardContainer>
  );
};