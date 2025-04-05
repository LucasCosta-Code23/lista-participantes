import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

import { Participant } from '../../components/Participant/Index';

import { styles } from './styles';

export default function Home(){
  const [participants, setParticipants] =useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd(){
    const trimmedName = participantName.trim();

    if (trimmedName === '') {
      return Alert.alert("Nome inválido", "Por favor, insira um nome válido.");
    }
    if (/\d/.test(trimmedName)) {
      return Alert.alert("Nome inválido", "Por favor, insira um nome válido.");
    }
    if (participants.includes(trimmedName)) {
      return Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome.");
    }

    setParticipants(prevState => [...prevState, trimmedName]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: String) {
    

    Alert.alert("Remover",`Remover o participante ${name}?`,[
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])

    
  }

  return(
    <View style={styles.container}>
      <Text style={styles.eventName}> 
        Nome do evento</Text>
      <Text style={styles.eventDate}> 
        Domingo, 23 de Março de 2025. 
      </Text>

        <View style={styles.form}>
        <TextInput style={styles.input}
        placeholder="Nome do Participante"
        placeholderTextColor="#6B6B6B"  
        onChangeText={setParticipantName}
        value={participantName}
        />  

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
              +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant 
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)} /> 
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presenças.
          </Text>
        )}
      />
    </View>

    
   
  )
}
