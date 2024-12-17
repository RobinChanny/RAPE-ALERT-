import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';

export default function HomePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [circles] = useState([{ name: 'Family', userName: 'John Doe' }]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleAlertPress = () => setIsModalVisible(true);

  const navigateToLiveMap = () => {
    setIsModalVisible(false);
    router.push('/LiveMapScreen');
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        await Location.getCurrentPositionAsync({});
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Dropdown Section */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
          <Text style={styles.dropdownText}>Circle</Text>
          <Ionicons
            name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#FFFFFF"
            style={styles.icon}
          />
        </TouchableOpacity>
        {isDropdownOpen && (
          <FlatList
            data={circles}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.circleMembersContainer}>
                <Text style={styles.memberHeader}>{item.name}</Text>
                <Text style={styles.memberUserName}>{item.userName}</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/createCircle')}
        >
          <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Create Circle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => router.push('/joinCircle')}
        >
          <Ionicons name="enter-outline" size={20} color="#5C6BC0" />
          <Text style={[styles.buttonText, styles.joinButtonText]}>Join Circle</Text>
        </TouchableOpacity>
      </View>

      {/* Alert Button */}
      <View style={styles.alertButtonContainer}>
        <TouchableOpacity style={styles.alertButton} onPress={handleAlertPress}>
          <Ionicons name="alert-circle-outline" size={18} color="#FFFFFF" />
          <Text style={styles.alertButtonText}>RAPE ALERT</Text>
        </TouchableOpacity>
      </View>

      {/* Fullscreen Alert Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="alert-circle-outline" size={50} color="#E63946" />
            <Text style={styles.modalTitle}>🚨 RAPE ALERT 🚨</Text>
            <Text style={styles.modalMessage}>SEND IMMEDIATE HELP!</Text>
            <TouchableOpacity style={styles.closeButton} onPress={navigateToLiveMap}>
              <Text style={styles.closeButtonText}>Open Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dropdownContainer: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  dropdownButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 4,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  icon: {
    marginLeft: 10,
  },
  circleMembersContainer: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    width: '100%',
  },
  memberHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  memberUserName: {
    fontSize: 14,
    color: '#6B7280',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  createButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    elevation: 4,
  },
  joinButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#6366F1',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    color: '#FFFFFF',
  },
  joinButtonText: {
    color: '#6366F1',
  },
  alertButtonContainer: {
    marginTop: 40,
    width: '100%',
  },
  alertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  alertButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: Dimensions.get('screen').width * 0.85,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
