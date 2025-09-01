import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../CustomComponents/PrimaryButton";
import Regular from "../CustomComponents/Regular";
import Bold from "../CustomComponents/Bold";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Yagna Samagri",
    description:
      "Order Your required yagna samagri with ease of delivery from nearby puja stores",
    image: require("../../assets/images/yogi.png"),
  },
  {
    id: "2",
    title: "Make festival an Occassion",
    description:
      "Order puja items seamlessly and elevate any festival with our app.",
    image: require("../../assets/images/pot.png"),
  },
  {
    id: "3",
    title: "Definition of “Puja”",
    description:
      "Browse and acquire a wide array of Vedic mantra books seamlessly through our app.",
    image: require("../../assets/images/ganesh.png"),
  },
];
interface Props{
    
}
const Onboarding: React.FC<Props> = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  // Auto scroll logic
  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(timerRef?.current);
  }, [currentIndex]);

  const startAutoScroll = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0; // loop back
      }
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
  };

  const handleNext = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex < slides.length) {
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const onScrollEnd = (e) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };
  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Bold fontSize={20} color="#5B3415" style={styles.title}>
        {item.title}
      </Bold>
       <Bold fontSize={16} color="#5B3415" style={styles.subtitle}>{item.description}
      </Bold>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* Skip */}
      <TouchableOpacity >
        <Regular fontSize={20} color="#5B3415" style={{ textAlign: "right", marginHorizontal: 20 }}>
          Skip
        </Regular>
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onMomentumScrollEnd={onScrollEnd}
      />
      <View style={styles.nextButtonContainer}>

        <View style={styles.pagination}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.activeDot]}
            />
          ))}
        </View>
        {/* Next Button */}
        <PrimaryButton title="NEXT"
          onPress={handleNext}
          paddingHorizontal={120}
          paddingVertical={20}
          backgroundColor="#5B3415"
          textColor="#FFFFFF" />
      </View>
    </SafeAreaView>
  )
}

export default Onboarding
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 400,
  },
  title: {
    color: "#000000",
    marginTop: 20,
  },
  subtitle: {
    textAlign: "center",
    color: "#808080",
    marginTop: 8,
    lineHeight: 20,
  },
  pagination: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#5B3415",
  },
  nextButtonContainer: {
    justifyContent: "center", alignItems: "center",
    marginBottom: 100
  },
  nextButton: {
    backgroundColor: "#5B3415",
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 8,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  skipText: {
    color: "#000000",
    fontSize: 14,
    marginTop: 12,
    textAlign: "right",
    marginHorizontal: 30
  },
});