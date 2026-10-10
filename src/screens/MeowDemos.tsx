import React, { useMemo, useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Pressable, Easing, PanResponder, TouchableOpacity, AppState } from 'react-native';
import { ThemeType } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { createStyles } from './MeowStyles';

export const MeowDemos: React.FC = () => {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);


    // Native Animated API values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(40)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(scaleAnim, {
            toValue: 0.92, 
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
        }).start();
    };

    const startAnimation = () => {
        fadeAnim.stopAnimation();
        translateYAnim.stopAnimation();
        
        fadeAnim.setValue(0);
        translateYAnim.setValue(40);
        
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();
    };

    useEffect(() => {
        startAnimation();
    }, [fadeAnim, translateYAnim]);

    const springAnim = useRef(new Animated.Value(0.75)).current;

    const startSpringAnimation = () => {
        springAnim.stopAnimation();
        springAnim.setValue(0.75);
        Animated.spring(springAnim, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        startSpringAnimation();
    }, [springAnim]);

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const switchAnim = useRef(new Animated.Value(0)).current;

    const handleToggleSwitch = () => {
        const newValue = !isSwitchOn;
        setIsSwitchOn(newValue);
        Animated.timing(switchAnim, {
            toValue: newValue ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const switchTrackColor = switchAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#767577', '#34C759'],
    });

    const switchKnobTranslateX = switchAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 26],
    });

    // Neon Pulse Experience Values
    const [isNeonActive, setIsNeonActive] = useState(false);
    const neonEntranceOpacity = useRef(new Animated.Value(0)).current;
    const neonEntranceTranslateY = useRef(new Animated.Value(35)).current;
    const neonEntranceScale = useRef(new Animated.Value(0.94)).current;

    const orb1Anim = useRef(new Animated.Value(0)).current;
    const orb2Anim = useRef(new Animated.Value(0)).current;

    const feature1Anim = useRef(new Animated.Value(0)).current;
    const feature2Anim = useRef(new Animated.Value(0)).current;
    const feature3Anim = useRef(new Animated.Value(0)).current;

    const neonBtnScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Entrance animation
        Animated.parallel([
            Animated.timing(neonEntranceOpacity, {
                toValue: 1,
                duration: 800,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(neonEntranceTranslateY, {
                toValue: 0,
                duration: 800,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(neonEntranceScale, {
                toValue: 1,
                duration: 800,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            })
        ]).start();

        // Staggered features
        Animated.stagger(150, [
            Animated.timing(feature1Anim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(feature2Anim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(feature3Anim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ]).start();

        // Looping Orbs
        const createOrbLoop = (animValue: Animated.Value, duration: number) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.timing(animValue, {
                        toValue: 1,
                        duration: duration,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                    Animated.timing(animValue, {
                        toValue: 0,
                        duration: duration,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                ])
            );
        };

        let orb1Loop: Animated.CompositeAnimation;
        let orb2Loop: Animated.CompositeAnimation;
        let isLooping = false;

        const startLoops = () => {
            if (isLooping) return;
            isLooping = true;
            orb1Loop = createOrbLoop(orb1Anim, 4000);
            orb2Loop = createOrbLoop(orb2Anim, 5000);
            orb1Loop.start();
            orb2Loop.start();
        };

        const stopLoops = () => {
            if (!isLooping) return;
            isLooping = false;
            if (orb1Loop) orb1Loop.stop();
            if (orb2Loop) orb2Loop.stop();
        };

        startLoops();

        const subscription = AppState.addEventListener('change', nextAppState => {
            if (nextAppState === 'active') {
                startLoops();
            } else if (nextAppState.match(/inactive|background/)) {
                stopLoops();
            }
        });

        return () => {
            stopLoops();
            subscription.remove();
        };
    }, [neonEntranceOpacity, neonEntranceTranslateY, neonEntranceScale, feature1Anim, feature2Anim, feature3Anim, orb1Anim, orb2Anim]);

    const handleNeonPressIn = () => {
        Animated.timing(neonBtnScale, {
            toValue: 0.96,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const handleNeonPressOut = () => {
        Animated.timing(neonBtnScale, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
        }).start();
    };

    const handleNeonPress = () => {
        setIsNeonActive(prev => !prev);
    };

    // Gesture Tilt Card Values
    const pan = useRef(new Animated.ValueXY()).current;
    const tiltScale = useRef(new Animated.Value(1)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.extractOffset();
                Animated.spring(tiltScale, {
                    toValue: 1.05,
                    useNativeDriver: false,
                }).start();
            },
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
                Animated.parallel([
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 5,
                        useNativeDriver: false,
                    }),
                    Animated.spring(tiltScale, {
                        toValue: 1,
                        friction: 5,
                        useNativeDriver: false,
                    })
                ]).start();
            },
        })
    ).current;

    const tiltRotate = pan.x.interpolate({
        inputRange: [-200, 200],
        outputRange: ['-8deg', '8deg'], 
        extrapolate: 'clamp',
    });

    // Swipe Card Stack Values
    const swipeCards = useMemo(() => [
        { id: '1', title: 'React Native', desc: 'A framework for building native apps using React.' },
        { id: '2', title: 'Animations', desc: 'Bring your application to life with fluid motion.' },
        { id: '3', title: 'Gestures', desc: 'Interact naturally using touches, drags, and swipes.' }
    ], []);
    
    const [cardIndex, setCardIndex] = useState(0);
    const swipePan = useRef(new Animated.ValueXY()).current;
    const isSwiping = useRef(false);

    const swipePanResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // No offset needed since cards always start at 0,0 and we lock it during animation
            },
            onPanResponderMove: (_, gestureState) => {
                if (isSwiping.current) return;
                swipePan.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: (_, gestureState) => {
                if (isSwiping.current) return;
                
                const swipeThreshold = 120;
                if (gestureState.dx > swipeThreshold) {
                    forceSwipe(500); // right
                } else if (gestureState.dx < -swipeThreshold) {
                    forceSwipe(-500); // left
                } else {
                    resetSwipePosition();
                }
            },
        })
    ).current;

    const forceSwipe = (x: number) => {
        isSwiping.current = true;
        Animated.timing(swipePan, {
            toValue: { x, y: 0 },
            duration: 250,
            useNativeDriver: false,
        }).start(() => onSwipeComplete());
    };

    const resetSwipePosition = () => {
        Animated.spring(swipePan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
        }).start();
    };

    const onSwipeComplete = () => {
        setCardIndex(prev => prev + 1);
        swipePan.setValue({ x: 0, y: 0 });
        isSwiping.current = false;
    };

    const handleResetStack = () => {
        setCardIndex(0);
        swipePan.setValue({ x: 0, y: 0 });
    };

    const swipeRotate = swipePan.x.interpolate({
        inputRange: [-250, 0, 250],
        outputRange: ['-15deg', '0deg', '15deg'],
        extrapolate: 'clamp',
    });

    const swipeLikeOpacity = swipePan.x.interpolate({
        inputRange: [0, 80],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const swipeNopeOpacity = swipePan.x.interpolate({
        inputRange: [-80, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const nextCardScale = swipePan.x.interpolate({
        inputRange: [-250, 0, 250],
        outputRange: [1, 0.95, 1],
        extrapolate: 'clamp',
    });
    
    const nextCardTranslateY = swipePan.x.interpolate({
        inputRange: [-250, 0, 250],
        outputRange: [0, 10, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={{ width: '100%' }}>


                        {/* Native Animated Demo Section */}
                        <Text style={[styles.title, { marginTop: 24, marginBottom: 12 }]}>
                            My First Native Animation
                        </Text>

                        <Animated.View
                            style={[
                                styles.itemCard,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ translateY: translateYAnim }],
                                },
                            ]}
                        >
                            <Text style={styles.itemName}>Welcome to Animations</Text>
                            <Text style={styles.itemDescription}>
                                This card fades in and slides up using React Native's built-in Animated API.
                            </Text>
                        </Animated.View>

                        <TouchableOpacity
                            style={[styles.retryButton, { marginTop: 16, alignSelf: 'flex-start' }]}
                            onPress={startAnimation}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.retryButtonText}>Replay Animation</Text>
                        </TouchableOpacity>

                        {/* Button Press Animation Section */}
                        <Text style={[styles.title, { marginTop: 24, marginBottom: 12 }]}>
                            Button Press Animation
                        </Text>

                        <Animated.View style={{ transform: [{ scale: scaleAnim }], alignSelf: 'flex-start' }}>
                            <Pressable
                                onPressIn={handlePressIn}
                                onPressOut={handlePressOut}
                                style={styles.retryButton}
                            >
                                <Text style={styles.retryButtonText}>Tap Me!</Text>
                            </Pressable>
                        </Animated.View>

                        {/* Spring Animation Section */}
                        <Text style={[styles.title, { marginTop: 24, marginBottom: 12 }]}>
                            Spring Animation
                        </Text>

                        <Animated.View
                            style={[
                                styles.itemCard,
                                {
                                    transform: [{ scale: springAnim }],
                                },
                            ]}
                        >
                            <Text style={styles.itemName}>Springy Card</Text>
                            <Text style={styles.itemDescription}>
                                This card bounces into place using React Native's spring animation.
                            </Text>
                        </Animated.View>

                        <TouchableOpacity
                            style={[styles.retryButton, { marginTop: 16, alignSelf: 'flex-start' }]}
                            onPress={startSpringAnimation}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.retryButtonText}>Replay Spring</Text>
                        </TouchableOpacity>

                        {/* Animated Toggle Switch Section */}
                        <Text style={[styles.title, { marginTop: 24, marginBottom: 12 }]}>
                            Animated Toggle Switch
                        </Text>

                        <View style={styles.itemCard}>
                            <Pressable 
                                onPress={handleToggleSwitch} 
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                            >
                                <Animated.View style={[styles.switchTrack, { backgroundColor: switchTrackColor }]}>
                                    <Animated.View style={[styles.switchKnob, { transform: [{ translateX: switchKnobTranslateX }] }]} />
                                </Animated.View>
                                <Text style={styles.switchLabel}>
                                    {isSwitchOn ? 'ON' : 'OFF'}
                                </Text>
                            </Pressable>
                        </View>

                        {/* Neon Pulse Experience */}
                        <Animated.View 
                            style={[
                                styles.neonContainer, 
                                { 
                                    opacity: neonEntranceOpacity,
                                    transform: [
                                        { translateY: neonEntranceTranslateY },
                                        { scale: neonEntranceScale }
                                    ]
                                }
                            ]}
                        >
                            {/* Decorative Orbs */}
                            <Animated.View style={[
                                styles.neonOrb, 
                                styles.neonOrb1, 
                                { 
                                    opacity: orb1Anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] }),
                                    transform: [
                                        { translateY: orb1Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }) },
                                        { translateX: orb1Anim.interpolate({ inputRange: [0, 1], outputRange: [0, 10] }) }
                                    ]
                                }
                            ]} />
                            <Animated.View style={[
                                styles.neonOrb, 
                                styles.neonOrb2, 
                                { 
                                    opacity: orb2Anim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.6] }),
                                    transform: [
                                        { translateY: orb2Anim.interpolate({ inputRange: [0, 1], outputRange: [0, 15] }) },
                                        { translateX: orb2Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -15] }) }
                                    ]
                                }
                            ]} />

                            {/* Content */}
                            <View style={styles.neonHeader}>
                                <Text style={styles.neonTitle}>NEON PULSE</Text>
                                <View style={styles.neonBadge}>
                                    <Text style={styles.neonBadgeText}>SYSTEM ONLINE</Text>
                                </View>
                            </View>
                            <Text style={styles.neonSubtitle}>Motion. Depth. Energy.</Text>

                            <View style={styles.neonFeatures}>
                                {[
                                    { title: "Smooth Motion", anim: feature1Anim },
                                    { title: "Neon Glow", anim: feature2Anim },
                                    { title: "Spring Interaction", anim: feature3Anim }
                                ].map((feature, i) => (
                                    <Animated.View key={i} style={[
                                        styles.neonFeatureCard,
                                        {
                                            opacity: feature.anim,
                                            transform: [{
                                                translateY: feature.anim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [15, 0]
                                                })
                                            }]
                                        }
                                    ]}>
                                        <Text style={styles.neonFeatureText}>{feature.title}</Text>
                                    </Animated.View>
                                ))}
                            </View>

                            <Animated.View style={{ transform: [{ scale: neonBtnScale }] }}>
                                <Pressable
                                    onPressIn={handleNeonPressIn}
                                    onPressOut={handleNeonPressOut}
                                    onPress={handleNeonPress}
                                    style={[styles.neonButton, isNeonActive && styles.neonButtonActive]}
                                >
                                    <Text style={styles.neonButtonText}>
                                        {isNeonActive ? "NEON ACTIVATED" : "ACTIVATE NEON"}
                                    </Text>
                                </Pressable>
                            </Animated.View>
                        </Animated.View>

                        {/* Gesture Tilt Card */}
                        <Text style={[styles.title, { marginTop: 24, marginBottom: 12 }]}>
                            Gesture Tilt Card
                        </Text>
                        
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <Animated.View
                                {...panResponder.panHandlers}
                                style={[
                                    styles.tiltCardContainer,
                                    {
                                        transform: [
                                            { translateX: pan.x },
                                            { translateY: pan.y },
                                            { rotate: tiltRotate },
                                            { scale: tiltScale }
                                        ]
                                    }
                                ]}
                            >
                                <Text style={styles.tiltCardTitle}>Interactive Surface</Text>
                                <Text style={styles.tiltCardDesc}>
                                    This element responds to physics-based gestures using React Native's PanResponder and Animated APIs.
                                </Text>
                                <View style={styles.tiltCardHintBox}>
                                    <Text style={styles.tiltCardHint}>Drag me around</Text>
                                </View>
                            </Animated.View>
                        </View>

                        {/* Swipe Card Stack */}
                        <Text style={[styles.title, { marginTop: 24, marginBottom: 12 }]}>
                            Swipe Card Stack
                        </Text>
                        
                        <View style={{ alignItems: 'center', marginBottom: 40, height: 260 }}>
                            {cardIndex >= swipeCards.length ? (
                                <View style={styles.swipeEndContainer}>
                                    <Text style={styles.swipeEndTitle}>All done!</Text>
                                    <Text style={styles.swipeEndDesc}>You swiped through all the cards.</Text>
                                    <TouchableOpacity style={styles.retryButton} onPress={handleResetStack}>
                                        <Text style={styles.retryButtonText}>Try Again</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                swipeCards.map((card, i) => {
                                    if (i < cardIndex) return null;
                                    const isFront = i === cardIndex;
                                    
                                    return (
                                        <Animated.View
                                            key={card.id}
                                            {...(isFront ? swipePanResponder.panHandlers : {})}
                                            style={[
                                                styles.swipeCard,
                                                isFront && {
                                                    transform: [
                                                        { translateX: swipePan.x },
                                                        { translateY: swipePan.y },
                                                        { rotate: swipeRotate },
                                                    ],
                                                    zIndex: 10,
                                                },
                                                !isFront && {
                                                    transform: [
                                                        { scale: nextCardScale },
                                                        { translateY: nextCardTranslateY }
                                                    ],
                                                    zIndex: 5 - (i - cardIndex),
                                                }
                                            ]}
                                        >
                                            {isFront && (
                                                <>
                                                    <Animated.View style={[styles.swipeLabel, styles.swipeLikeLabel, { opacity: swipeLikeOpacity }]}>
                                                        <Text style={styles.swipeLikeText}>LIKE</Text>
                                                    </Animated.View>
                                                    <Animated.View style={[styles.swipeLabel, styles.swipeNopeLabel, { opacity: swipeNopeOpacity }]}>
                                                        <Text style={styles.swipeNopeText}>NOPE</Text>
                                                    </Animated.View>
                                                </>
                                            )}
                                            <Text style={styles.swipeCardTitle}>{card.title}</Text>
                                            <Text style={styles.swipeCardDesc}>{card.desc}</Text>
                                        </Animated.View>
                                    );
                                }).reverse()
                            )}
                        </View>
        </View>
    );
};
