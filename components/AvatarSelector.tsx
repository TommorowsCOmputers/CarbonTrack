import React from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { AvatarType } from "@/utils/types";
import { Spacing, BorderRadius } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

const AVATARS = {
  leaf: require("@/assets/avatars/leaf.png"),
  tree: require("@/assets/avatars/tree.png"),
  earth: require("@/assets/avatars/earth.png"),
};

interface AvatarSelectorProps {
  selected: AvatarType;
  onSelect: (avatar: AvatarType) => void;
}

export function AvatarSelector({ selected, onSelect }: AvatarSelectorProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {(Object.keys(AVATARS) as AvatarType[]).map((avatarType) => (
        <Pressable
          key={avatarType}
          onPress={() => onSelect(avatarType)}
          style={({ pressed }) => [
            styles.avatar,
            {
              borderColor: selected === avatarType ? theme.primary : "transparent",
              borderWidth: selected === avatarType ? 3 : 0,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Image source={AVATARS[avatarType]} style={styles.image} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    padding: Spacing.sm,
    backgroundColor: "#F8F9FA",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
