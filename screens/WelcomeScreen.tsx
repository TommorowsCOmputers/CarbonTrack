import React, { useState } from "react";
import { View, StyleSheet, TextInput, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { AvatarSelector } from "@/components/AvatarSelector";
import { ScreenScrollView } from "@/components/ScreenScrollView";
import Spacer from "@/components/Spacer";
import { Spacing, BorderRadius, Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/contexts/AppContext";
import { AvatarType } from "@/utils/types";
import type { RootStackParamList } from "@/navigation/RootNavigator";

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Welcome">;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const { theme, isDark } = useTheme();
  const { updateProfile } = useApp();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<AvatarType>("leaf");

  const handleGetStarted = async () => {
    if (name.trim()) {
      await updateProfile(name.trim(), avatar);
      navigation.navigate("Survey", { step: 1 });
    }
  };

  return (
    <ScreenScrollView>
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
        />
        <ThemedText type="h1" style={styles.title}>
          Carbon Tracker
        </ThemedText>
        <ThemedText
          type="body"
          style={[styles.subtitle, { color: theme.neutral }]}
        >
          Understand and reduce your household carbon footprint
        </ThemedText>

        <Spacer height={Spacing["4xl"]} />

        <ThemedText type="h3" style={styles.sectionTitle}>
          Choose Your Avatar
        </ThemedText>
        <Spacer height={Spacing.lg} />
        <AvatarSelector selected={avatar} onSelect={setAvatar} />

        <Spacer height={Spacing["3xl"]} />

        <View style={styles.inputContainer}>
          <ThemedText type="body" style={styles.label}>
            What's your name?
          </ThemedText>
          <Spacer height={Spacing.sm} />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.backgroundDefault,
                color: theme.text,
              },
            ]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={isDark ? "#9BA1A6" : "#687076"}
            autoCapitalize="words"
            returnKeyType="done"
          />
        </View>

        <Spacer height={Spacing["4xl"]} />

        <Button onPress={handleGetStarted} disabled={!name.trim()}>
          Get Started
        </Button>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: Spacing["5xl"],
    marginBottom: Spacing.xl,
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    fontWeight: "600",
  },
  input: {
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.lg,
    fontSize: Typography.body.fontSize,
  },
});
