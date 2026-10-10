import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ListRenderItem,
    TouchableOpacity,
    Modal,
    Animated,
    Pressable,
    Easing,
    ActivityIndicator,
    PanResponder,
} from 'react-native';
import { MeowDemos } from './MeowDemos';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeType } from '../styles/theme';
import { createStyles } from './MeowStyles';
import { useTheme } from '../context/ThemeContext';

interface TestItem {
    id: string;
    name: string;
    description: string;
}

interface PostItem {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const TEST_ITEMS: TestItem[] = [
    { id: '1', name: 'React Native', description: 'Cross-platform mobile framework by Meta' },
    { id: '2', name: 'TypeScript', description: 'Strongly typed programming language built on JS' },
    { id: '3', name: 'FlatList', description: 'Performant interface for rendering basic, flat lists' },
    { id: '4', name: 'State Management', description: 'Managing application data and UI state' },
    { id: '5', name: 'React Navigation', description: 'Routing and navigation for React Native apps' },
    { id: '6', name: 'Flexbox Layout', description: 'CSS layout mode for responsive user interfaces' },
    { id: '7', name: 'Hooks', description: 'Functions that let you use state and lifecycle features' },
    { id: '8', name: 'AsyncStorage', description: 'Unencrypted, asynchronous, persistent key-value storage' },
    { id: '9', name: 'Metro Bundler', description: 'JavaScript bundler built for React Native' },
    { id: '10', name: 'Hermes Engine', description: 'JavaScript engine optimized for React Native' },
];

const HORIZONTAL_ITEMS: TestItem[] = [
    {
        id: 'h1',
        name: 'Home',
        description: 'Home screen',
    },
    {
        id: 'h2',
        name: 'Projects',
        description: 'Projects screen',
    },
    {
        id: 'h3',
        name: 'Experience',
        description: 'Experience screen',
    },
    {
        id: 'h4',
        name: 'Contact',
        description: 'Contact screen',
    },
];

const Meow: React.FC = () => {
    const { theme } = useTheme();
    const [selectedItem, setSelectedItem] = useState<TestItem | null>(null);
    const [extraItems, setExtraItems] = useState<TestItem[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    // API Fetch Demo State
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
    const [postsError, setPostsError] = useState<string | null>(null);

    const styles = useMemo(() => createStyles(theme), [theme]);

    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchPosts = async (isInitialLoad = false) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        const controller = new AbortController();
        abortControllerRef.current = controller;
        const signal = controller.signal;

        try {
            if (isInitialLoad || posts.length === 0) {
                setLoadingPosts(true);
            }
            setPostsError(null);

            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', { signal });
            if (!response.ok) {
                throw new Error(`Failed to fetch posts (Status ${response.status})`);
            }
            const data: PostItem[] = await response.json();
            if (!signal.aborted) {
                setPosts(data);
            }
        } catch (err: any) {
            if (err?.name === 'AbortError' || signal.aborted) {
                // Request was cancelled (e.g. component unmounted); ignore false network errors
                return;
            }
            const message = err instanceof Error ? err.message : 'An error occurred while fetching posts.';
            setPostsError(message);
        } finally {
            if (!signal.aborted) {
                setLoadingPosts(false);
                setRefreshing(false);
                if (abortControllerRef.current === controller) {
                    abortControllerRef.current = null;
                }
            }
        }
    };

    useEffect(() => {
        fetchPosts(true);

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchPosts(false);
    };

    const PAGINATION_ITEMS: TestItem[] = Array.from(
        { length: 30 },
        (_, index) => ({
            id: `page-${index + 1}`,
            name: `Item ${index + 1}`,
            description: `This is pagination demo item ${index + 1}`,
        })
    );

    const renderItem: ListRenderItem<TestItem> = ({ item }) => (
        <TouchableOpacity
            style={styles.itemCard}
            onPress={() => {
                setSelectedItem(item);
            }}
        >
            <Text style={styles.itemName}>
                {item.name}
            </Text>

            <Text style={styles.itemDescription}>
                {item.description}
            </Text>
        </TouchableOpacity> 
    );

    const renderPostItem: ListRenderItem<PostItem> = ({ item }) => (
        <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.body}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                refreshing={refreshing}
                onRefresh={handleRefresh}
                data={TEST_ITEMS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                )}
                onEndReached={() => {
                    setExtraItems(previous => {
                        const nextIndex = 10 + previous.length;
                        if (nextIndex >= PAGINATION_ITEMS.length) {
                            return previous;
                        }
                        return [
                            ...previous,
                            ...PAGINATION_ITEMS.slice(nextIndex, nextIndex + 5),
                        ];
                    });
                }}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>No items found</Text>
                        <Text style={styles.emptyText}>
                            There are no items to display right now.
                        </Text>
                    </View>
                }
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.label}>DEVELOPER PLAYGROUND</Text>
                        <Text style={styles.title}>FlatList Testing 🐱</Text>
                        <Text style={styles.subtitle}>
                            Learning React Native FlatList with a local test dataset.
                        </Text>
                    </View>
                }
                ListFooterComponent={
                    <View style={{ paddingBottom: 20 }}>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                End of Projects
                            </Text>
                        </View>

                        <FlatList
                            // style={styles.horizontalList}
                            data={HORIZONTAL_ITEMS}
                            renderItem={({ item }) => (
                                <View style={styles.horizontalCard}>
                                    <Text style={styles.itemName} numberOfLines={1}>
                                        {item.name}
                                    </Text>

                                    <Text style={styles.itemDescription}>
                                        {item.description}
                                    </Text>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => (
                                <View style={{ width: 12 }} />
                            )}
                            contentContainerStyle={{
                                paddingHorizontal: 0,
                                paddingVertical: 12,
                            }}
                        />

                        <FlatList
                            data={TEST_ITEMS}
                            renderItem={({ item }) => (
                                <View style={styles.gridCard}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemDescription}>
                                        {item.description}
                                    </Text>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            scrollEnabled={false}
                            contentContainerStyle={{
                                paddingHorizontal: 0,
                            }}
                        />

                        <Text style={[styles.title, { marginTop: 20, marginBottom: 12 }]}>
                            Pagination Demo
                        </Text>

                        <FlatList
                            data={[...PAGINATION_ITEMS.slice(0, 10), ...extraItems]}
                            renderItem={({ item }) => (
                                <View style={styles.itemCard}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemDescription}>
                                        {item.description}
                                    </Text>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                            ListFooterComponent={
                                <Text style={styles.footerText}>Scroll for more items</Text>
                            }
                        />

                        {/* API Fetch Demo Section */}
                        <Text style={[styles.title, { marginTop: 24, marginBottom: 12 }]}>
                            API Fetch Demo (JSONPlaceholder)
                        </Text>

                        {loadingPosts ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color={theme.colors.primaryLight} />
                                <Text style={[styles.footerText, { marginTop: 8 }]}>Loading posts from API...</Text>
                            </View>
                        ) : postsError ? (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.errorText}>❌ {postsError}</Text>
                                <TouchableOpacity
                                    style={styles.retryButton}
                                    onPress={() => fetchPosts(false)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.retryButtonText}>Retry Fetch</Text>
                                </TouchableOpacity>
                            </View>
                        ) : posts.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyTitle}>No posts found</Text>
                                <Text style={styles.emptyText}>The API returned an empty list of posts.</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={posts}
                                renderItem={renderPostItem}
                                keyExtractor={item => `post-${item.id}`}
                                scrollEnabled={false}
                            />
                        )}
                        <MeowDemos />
                    </View>
                }
            />

            <Modal
                visible={selectedItem !== null}
                transparent
                animationType="fade"
                onRequestClose={() => setSelectedItem(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>
                            {selectedItem?.name}
                        </Text>
                        <Text style={styles.modalDescription}>
                            {selectedItem?.description}
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setSelectedItem(null)}
                        >
                            <Text style={styles.closeButtonText}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};



export default Meow;