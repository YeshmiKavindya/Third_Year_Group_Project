
const USER_TYPE = {
  CUSTOMER: 'customer',
  SELLER: 'seller',
};
const ROUTES = {
  HOME: 'Home',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  CUSTOMER_SETTINGS: 'CustomerSettings',
  SELLER_SETTINGS: 'SellerSettings',
  SEARCH: 'Search',
  CART: 'Cart',
  SELLER_ITEM_EDIT: 'SellerItemEdit',
  SELLER_ITEM_ADDITION: 'SellerItemAddition',
  SELLER_ITEMS: 'AllSellerItems',
};

const BottomNavigation: React.FC = React.memo(() => {
  const navigation = useNavigation<any>();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserType = async () => {
      const type = await AsyncStorage.getItem('x-user-type');
      setUserType(type);
    };
    fetchUserType();
  }, []);

  const handleLogout = useCallback(async () => {
    
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.LOGOUT), {
        method: 'POST',
        headers: {
          'authorization': `${await AsyncStorage.getItem('authorization')}`,
        },
      });
      await AsyncStorage.clear();
      if (response.ok) {
        Alert.alert('Success', 'Logout successful!');
      } else {
        Alert.alert('Error', 'Logout failed. Please try again.');
      }
      navigation.navigate(ROUTES.LOGIN);
    } catch (error) {
      Alert.alert('Error', 'Logout failed. Please try again.');
    }
  }, [navigation]);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <TouchableOpacity
        style={{ flex: 1, alignItems: 'center' }}
        onPress={() => navigation.navigate(ROUTES.HOME)}
      >
        <FontAwesome name="home" size={24} color="#666" />
        <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Home</Text>
      </TouchableOpacity>
      
      {userType === USER_TYPE.CUSTOMER && (
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center' }}
          onPress={() => navigation.navigate(ROUTES.CUSTOMER_SETTINGS)}
        >
          <FontAwesome name="user" size={24} color="#666" />
          <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Profile</Text>
        </TouchableOpacity>
      )}
      {userType === USER_TYPE.SELLER && (
        <>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center' }}
            onPress={() => navigation.navigate(ROUTES.SELLER_ITEMS)}
          >
            <FontAwesome name="edit" size={24} color="#666" />
            <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Items</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center' }}
            onPress={() => navigation.navigate(ROUTES.SELLER_SETTINGS)}
          >
            <FontAwesome name="user" size={24} color="#666" />
            <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center' }}
            onPress={() => navigation.navigate(ROUTES.SELLER_ITEM_ADDITION)}
          >
            <FontAwesome name="plus" size={24} color="#666" />
            <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Add Item</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={{ flex: 1, alignItems: 'center' }}
        onPress={
            () => Alert.alert('Logout', 'Are you sure you want to logout?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', onPress: handleLogout },
            ])}
      >
        <FontAwesome name="sign-out" size={24} color="#666" />
        <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Logout</Text>
      </TouchableOpacity>
      
    </View>
  );
});

export default BottomNavigation;