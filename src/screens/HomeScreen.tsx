import React from 'react';
import {
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const HomeScreen: React.FC = () => {
  return (
    <Container>
        <Text>Hello</Text>
    </Container>
  );
};
