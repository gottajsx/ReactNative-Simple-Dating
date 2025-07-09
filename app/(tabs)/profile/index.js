import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Profile from "../../../components/Profile";
import { API_URL } from '@env';

const index = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const fetchUserDescription = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      console.log(response);
      const user = response.data;
      setUser(user?.user);
    } catch (error) {
      console.log("Error fetching user description", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`${API_URL}/profiles`, {
        params: {
          userId: userId,
          gender: user?.gender,
          turnOns: user?.turnOns,
          lookingFor: user?.lookingFor,
        },
      });

      // Il est crucial que chaque profil ait un ID unique.
      // Assurez-vous que response.data.profiles contient des objets avec un 'id' ou '_id' unique.
      setProfiles(response.data.profiles);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);

  useEffect(() => {
    if (userId && user) {
      fetchProfiles();
    }
  }, [userId, user]);

  console.log("profiles", profiles);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={profiles}
        // MODIFIÉ ICI: keyExtractor pour être plus robuste
        keyExtractor={(item, index) => {
          // Utilisez item.id ou item._id si présent, sinon fallback sur l'index (moins idéal pour de vrais IDs)
          // La condition typeof item.id === 'string' && item.id.length > 0 assure que c'est une clé valide.
          return (typeof item.id === 'string' && item.id.length > 0) ? item.id : (item._id || index.toString());
        }}
        renderItem={({ item, index }) => (
          <Profile
            // MODIFIÉ ICI: Clé pour le composant Profile, utilisant la même logique robuste
            key={(typeof item.id === 'string' && item.id.length > 0) ? item.id : (item._id || index.toString())}
            item={item}
            userId={userId}
            setProfiles={setProfiles}
            isEven={index % 2 === 0}
          />
        )}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});