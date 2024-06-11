import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { View, Text, Button, FlatList } from "react-native";

// Defina um tema personalizado
const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

const data = {
  "São Paulo": [
    { id: "1", title: "Corinthians" },
    { id: "2", title: "Palmeiras" },
    { id: "3", title: "São Paulo FC" },
  ],
  "Rio de Janeiro": [
    { id: "4", title: "Flamengo" },
    { id: "5", title: "Vasco da Gama" },
    { id: "6", title: "Fluminense" },
  ],
  "Minas Gerais": [
    { id: "7", title: "Cruzeiro" },
    { id: "8", title: "Atlético Mineiro" },
    { id: "9", title: "América Mineiro" },
  ],
};

export default function App() {
  const [selectedState, setSelectedState] = useState(null);

  const handleStateSelection = (state: any) => {
    setSelectedState(state);
  };

  const handleGoBack = () => {
    setSelectedState(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
        {selectedState ? (
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>Maiores times de {selectedState}</Text>
            <FlatList
              data={data[selectedState]}
              renderItem={({ item }) => <Text style={{ color: "white" }}>{item.title}</Text>}
              keyExtractor={(item) => item.id}
            />
            <Button title="Voltar" onPress={handleGoBack} />
          </View>
        ) : (
          <View>
            <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>Maiores times do Sudeste</Text>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <Button title="São Paulo" onPress={() => handleStateSelection("São Paulo")} />
              <View style={{ width: 10 }} />
              <Button title="Rio de Janeiro" onPress={() => handleStateSelection("Rio de Janeiro")} />
              <View style={{ width: 10 }} />
              <Button title="Minas Gerais" onPress={() => handleStateSelection("Minas Gerais")} />
            </View>
          </View>
        )}
      </View>
    </ThemeProvider>
  );
}
