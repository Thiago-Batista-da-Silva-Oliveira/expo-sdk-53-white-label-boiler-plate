import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from './src/theme/light';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import all story examples
import { Button } from './src/components/Button';
import { Input } from './src/components/Input';
import { CustomModal } from './src/components/CustomModal';
import { CustomDateTimePicker } from './src/components/DateTimePicker';

const StorybookUI = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  return (
    <ThemeProvider theme={lightTheme}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>📚 Storybook Components</Text>
            <Text style={styles.subtitle}>Interactive Component Library</Text>
          </View>

          {/* Button Examples */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔘 Button Components</Text>
            <View style={styles.row}>
              <Button title="Primary" onPress={() => {}} variant="primary" />
              <Button title="Secondary" onPress={() => {}} variant="secondary" />
            </View>
            <View style={styles.row}>
              <Button title="Outline" onPress={() => {}} variant="outline" />
              <Button title="Danger" onPress={() => {}} variant="danger" />
            </View>
            <View style={styles.row}>
              <Button title="Loading" onPress={() => {}} loading />
              <Button title="Disabled" onPress={() => {}} disabled />
            </View>
            <View style={styles.row}>
              <Button title="Small" onPress={() => {}} size="small" />
              <Button title="Large" onPress={() => {}} size="large" />
            </View>
          </View>

          {/* Input Examples */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Input Components</Text>
            <Input label="Nome" placeholder="Digite seu nome" />
            <Input 
              label="E-mail" 
              placeholder="Digite seu e-mail" 
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input 
              label="Senha" 
              placeholder="Digite sua senha" 
              secureTextEntry 
            />
            <Input 
              label="Comentários" 
              placeholder="Digite seus comentários..." 
              multiline 
              numberOfLines={3}
            />
            <Input 
              label="Campo com Erro" 
              placeholder="Campo inválido" 
              error="Este campo é obrigatório"
              value="valor inválido"
            />
          </View>

          {/* DateTimePicker Examples */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 DateTimePicker Components</Text>
            <CustomDateTimePicker
              label="Data de Nascimento"
              value={selectedDate}
              onChange={setSelectedDate}
              mode="date"
              placeholder="Selecione a data"
            />
            <CustomDateTimePicker
              label="Horário"
              value={selectedDate}
              onChange={setSelectedDate}
              mode="time"
              placeholder="Selecione o horário"
            />
            <CustomDateTimePicker
              label="Data e Hora"
              value={selectedDate}
              onChange={setSelectedDate}
              mode="datetime"
              placeholder="Selecione data e hora"
            />
          </View>

          {/* Modal Examples */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🪟 Modal Components</Text>
            <Button 
              title="Abrir Modal" 
              onPress={() => setModalVisible(true)} 
            />
            <CustomModal 
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Modal de Exemplo</Text>
                <Text style={styles.modalText}>
                  Este é um exemplo de modal customizável. 
                  Você pode adicionar qualquer conteúdo aqui.
                </Text>
                <Button 
                  title="Fechar" 
                  onPress={() => setModalVisible(false)}
                  variant="outline"
                />
              </View>
            </CustomModal>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              🎨 Desenvolvido com Storybook para React Native
            </Text>
            <Text style={styles.footerText}>
              Teste os componentes interativamente
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#333',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default StorybookUI;