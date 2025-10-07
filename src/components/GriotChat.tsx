import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../styles';

const griotAvatar = require('../../assets/artifacts/benin-mask.png');

export default function GriotChat() {
  const [messages, setMessages] = useState([
    { from: 'griot', text: 'Bonjour, je suis ton griot. Pose-moi une question ou écoute mon histoire !' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    // Ici tu peux ajouter la logique pour la réponse du griot (texte ou audio)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image source={griotAvatar} style={styles.avatarImage} resizeMode="contain" />
        </View>
        <Text style={styles.title}>Griot</Text>
      </View>
      <View style={styles.messages}>
        {messages.map((msg, idx) => (
          <View key={idx} style={[styles.message, msg.from === 'griot' ? styles.griotMsg : styles.userMsg]}>
            <Text>{msg.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Écris au griot..."
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendBtnText}>Envoyer</Text>
        </TouchableOpacity>
        {/* Bouton audio pour envoyer un message vocal (à intégrer plus tard) */}
        <TouchableOpacity style={styles.audioBtn}>
          <Text style={styles.audioBtnText}>🎤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.full / 2,
    marginRight: spacing[3],
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.full / 2,
  },
  title: {
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
  },
  messages: {
    maxHeight: 120,
    marginBottom: spacing[3],
  },
  message: {
    padding: spacing[3],
    borderRadius: borderRadius.md,
    marginBottom: spacing[2],
    maxWidth: '80%',
  },
  griotMsg: {
    backgroundColor: colors.primary[100],
    alignSelf: 'flex-start',
  },
  userMsg: {
    backgroundColor: colors.secondary[100],
    alignSelf: 'flex-end',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.neutral.gray[200],
    borderRadius: borderRadius.md,
    padding: spacing[3],
    marginRight: spacing[2],
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    backgroundColor: colors.neutral.white,
  },
  sendBtn: {
    backgroundColor: colors.primary[500],
    padding: spacing[3],
    borderRadius: borderRadius.md,
    marginRight: spacing[1],
  },
  sendBtnText: {
    color: colors.neutral.white,
    fontWeight: typography.fontWeight.medium,
  },
  audioBtn: {
    backgroundColor: colors.neutral.gray[100],
    padding: spacing[3],
    borderRadius: borderRadius.md,
  },
  audioBtnText: {
    fontSize: typography.fontSize.lg,
  },
});
