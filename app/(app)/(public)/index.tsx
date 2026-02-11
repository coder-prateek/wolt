import Buttons from "@/Components/ui/Buttons/button";
import Tabs from "@/Components/ui/tabs";
import { useLoginMutation } from "@/hooks/mutate/auth";
import useUserStore from "@/storage/use-userstore";
import { LoginResponse } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { CallingCode, CountryCode, isValidNumber, PhoneInput } from 'react-native-phone-entry';
import { z } from "zod";

// Separate schemas for login and signup
const loginSchema = z.object({
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;
type TabKey = "login" | "signup";


export default function Index() {
  const { setIsGuest, setToken, setUser } = useUserStore();
  const [activeTab, setActiveTab] = React.useState<TabKey>('login');
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = useState<CallingCode>('+91');
  const [isValid, setIsValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [Password, setPassword] = useState('');


  const continueAsGuest = () => {
    setIsGuest(true);
  };

  // Login form
  const {
    control: loginControl,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  // Signup form
  const {
    control: signupControl,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });


  const { mutate: loginMutate, isPending } = useLoginMutation({
    onSuccess: (response: LoginResponse) => {
      setIsGuest(false);
      setToken(response.access_token);
      setUser({
        id: response.id,
        name: response.name,
        phone: response.phone,
      });

    },
    onError: (error: Error) => {
      Alert.alert("Login Failed", error.message);
    },
  });

  const onLogin = (data: LoginFormData) => {
    // console.log("Login:", data);
    const phone = data.phone?.replace(/^(?:\+91|91)/, "")
    const password = data.password;
    loginMutate({ phone, password });
  };

  const onSignup = (data: SignupFormData) => {

    console.log("Signup:", data);
  };



  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        className='flex-1'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ImageBackground
          source={{ uri: `https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D` }}
          className='w-full h-80'
          resizeMode="cover"
        >
          <LinearGradient
            colors={["transparent", "#fff"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
            }}
          />
        </ImageBackground>

        <View>
          <Text className='text-3xl font-semibold mb-2 text-center' numberOfLines={2}>Welcome to Foodie</Text>
          <View>
            <Text className='text-base text-center text-gray-600 px-8'>Discover delicious meals from local restaurants and have them delivered to your doorstep.</Text>
          </View>
        </View>

        {/* <View className="flex-row items-center mt-6 justify-center">
          <View className=' w-full h-0.5 bg-gray-100' />
          <Text className='text-center px-4  text-gray-500'>OR</Text>
          <View className=' w-full h-0.5 bg-gray-100' />
        </View> */}

        <View style={{ flex: 1, marginTop: 20, alignItems: 'center', justifyContent: 'center', }}>
          <Tabs
            tabs={[
              { key: "login", label: "Login" },
              { key: "signup", label: "Sign Up" },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            scrollable
            showsScrollIndicator={false}
            tabBarPosition="top"
            animated
            animationDuration={200}
            tabBarClassName="gap-2 "
            tabBarStyle={{
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
            tabStyle={{
              borderRadius: 0,
              borderWidth: 1,
              borderColor: '#f95555',
              backgroundColor: '#fff',
              borderBottomLeftRadius: 12,
              borderTopRightRadius: 12,
              paddingHorizontal: 15,
              paddingVertical: 6,
            }}
            activeTabStyle={{
              backgroundColor: '#f95555',
              shadowOpacity: 0.5,
              shadowRadius: 6,
            }}
            tabTextStyle={{
              letterSpacing: 0.3,
              color: '#000',
            }}
            activeTabTextStyle={{
              color: '#fff',
            }}
            contentStyle={{
              borderWidth: 1,
              borderColor: "transparent",
            }}

            style={{
              width: "80%",
            }}
          >
            {(activeTab: TabKey) => {
              return (
                <>
                  {activeTab === "login" && (
                    <View style={[styles.formContainer]}>
                      <Text style={styles.label}>Phone Number</Text>
                      <Controller
                        control={loginControl}
                        name="phone"
                        render={({ field: { onChange, value } }) => (
                          // <PhoneInput
                          //   defaultValues={{
                          //     countryCode: 'IN',
                          //     callingCode: '+91',
                          //     phoneNumber: '+919876543210',

                          //   }}
                          //   value={value}
                          //   onChangeText={(text) => {
                          //     onChange(text);
                          //   }}
                          //   isCallingCodeEditable={false}
                          //   theme={{
                          //     containerStyle: {
                          //     },
                          //     codeTextStyle: {
                          //       fontSize: 15,
                          //     },
                          //     textInputStyle: {
                          //       fontSize: 15,
                          //     }
                          //   }}
                          //   onChangeCountry={(country) => {
                          //     setCountryCode(country.cca2);
                          //   }}

                          // />

                          <PhoneInput
                            value={value}
                            defaultValues={{
                              countryCode,
                              callingCode,
                              phoneNumber: '+91',
                            }}
                            onChangeCountry={(country) => {

                              setCountryCode(country.cca2);
                              setCallingCode(country.callingCode[0] || '');
                            }}

                            onChangeText={(text) => {
                              onChange(text);
                              const newText = text || '';
                              setIsValid(isValidNumber(newText, countryCode));
                            }}
                            disabled={isDisabled}
                            theme={{
                              containerStyle: styles.phoneInputContainer,
                              textInputStyle: [
                                styles.phoneInputText,
                              ],
                              codeTextStyle: [styles.codeText],
                            }}
                          />
                        )}
                      />
                      {loginErrors.phone && (
                        <Text style={styles.error}>{loginErrors.phone.message}</Text>
                      )}

                      <Text style={styles.label}>Password</Text>
                      <Controller
                        control={loginControl}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <View className="relative">
                            <Ionicons name="lock-closed" size={25} color="black" className="absolute top-4 px-2" />
                            <TextInput
                              placeholder="Enter your password"
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                              secureTextEntry={!Password}
                              autoCapitalize="none"
                              textContentType="password"
                              autoCorrect={false}
                              className="text-black pl-10"
                              style={styles.input}
                            />

                            <View className="absolute right-3 top-4">
                              {
                                Password ? (
                                  <Ionicons name="eye-outline" size={25} color="black" onPress={() => setPassword('')} />
                                ) : (
                                  <Ionicons name="eye-off-outline" size={25} color="black" onPress={() => setPassword('dummy')} />
                                )
                              }
                            </View>
                          </View>
                        )}
                      />
                      {loginErrors.password && (
                        <Text style={styles.error}>{loginErrors.password.message}</Text>
                      )}

                      <View className="mt-4 ">
                        <Buttons className="bg-primary rounded-2xl" onPress={handleLoginSubmit(onLogin)}>
                          <Text className="text-white text-center font-bold">
                            Login
                          </Text>
                        </Buttons>
                      </View>
                    </View>
                  )}

                  {activeTab === "signup" && (
                    <View style={[styles.formContainer]}>
                      <Text style={styles.label}>Name</Text>
                      <Controller
                        control={signupControl}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Enter your name"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={styles.input}
                          />
                        )}
                      />
                      {signupErrors.name && (
                        <Text style={styles.error}>{signupErrors.name.message}</Text>
                      )}

                      <Text style={styles.label}>Email</Text>
                      <Controller
                        control={signupControl}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Enter your email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.input}
                          />
                        )}
                      />
                      {signupErrors.email && (
                        <Text style={styles.error}>{signupErrors.email.message}</Text>
                      )}

                      <Text style={styles.label}>Phone Number</Text>
                      <Controller
                        control={signupControl}
                        name="phone"
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            defaultValues={{
                              countryCode: 'IN',
                              callingCode: '+91',
                              phoneNumber: '',
                            }}
                            value={value}
                            onChangeText={(text) => {
                              onChange(text);
                            }}
                            onChangeCountry={(country) => {
                              setCountryCode(country.flag.toUpperCase() as CountryCode);
                            }}
                          />
                        )}
                      />
                      {signupErrors.phone && (
                        <Text style={styles.error}>{signupErrors.phone.message}</Text>
                      )}

                      <Text style={styles.label}>Password</Text>
                      <Controller
                        control={signupControl}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Enter your password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                            style={styles.input}
                          />
                        )}
                      />
                      {signupErrors.password && (
                        <Text style={styles.error}>{signupErrors.password.message}</Text>
                      )}

                      {/* <View style={{ marginTop: 16 }}>
                        <Button title="Sign Up" onPress={handleSignupSubmit(onSignup)} color="#f95555" />
                      </View> */}
                    </View>
                  )}
                </>
              )
            }}
          </Tabs>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  formContainer: {
    width: "auto",
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 15,
  },
  error: {
    color: "#f95555",
    fontSize: 12,
    marginTop: 4,
  },










  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },


  phoneInputContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  phoneInputText: {
    fontSize: 16,
    color: '#000',
  },
  codeText: {
    fontSize: 16,
  },
  darkText: {
    color: '#fff',
  },
  validationContainer: {
    marginVertical: 10,
    alignItems: 'center',

  },
  validationText: {
    fontSize: 16,
  },
  validText: {
    color: '#4CAF50',
  },
  invalidText: {
    color: '#f44336',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },



  debugText: {
    fontFamily: 'Courier New',
  },
});
