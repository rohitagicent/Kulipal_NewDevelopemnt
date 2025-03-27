import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { fp, wp, hp } from '../../../utils/dimension';
import { colors } from '../../../utils/colors';
import Icon from '../../../utils/icons';

const LoginScreenCustomer = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Implement login logic
    console.log('Login with:', email, password);
  };

  const handleGoogleSignIn = () => {
    // Implement Google sign in
    console.log('Sign in with Google');
  };

  const handleAppleSignIn = () => {
    // Implement Apple sign in
    console.log('Sign in with Apple');
  };

  const goToSignUp = () => {
    navigation.navigate('SignUpCustomer');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={fp(3)} color={colors.icongray} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assests/images/kulipalCustomer.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          
        </View>

        <Text style={styles.headerText}>Welcome Back!</Text>

        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="mail" size={fp(2)} color={colors.BLUE} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#515151"
            />
          </View>

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="lock" size={fp(2)} color={colors.BLUE} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#515151"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Icon 
                name={showPassword ? "eye-sharp" : "eye-off-sharp"} 
                type="Ionicons"
                size={wp(5)} 
                color={colors.gray} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rememberForgotContainer}>
            <TouchableOpacity 
              style={styles.rememberContainer} 
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkedBox]}>
                {rememberMe && <Icon name="check" size={wp(3.5)} color={colors.WHITE} />}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}   >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
            <Image 
              source={require('../../../assests/images/google.png')} 
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Sign In with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
            <View style={styles.appleIconContainer}>
              <Icon name="apple1" type="AntDesign" size={fp(2.5)} color="black" />
            </View>
            <Text style={styles.socialButtonText}>Sign In with Apple</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.noAccountText}>Don't have an account yet? </Text>
            <TouchableOpacity onPress={goToSignUp}>
              <Text style={styles.signupText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: wp(5),
    paddingBottom: hp(3),
  },
  backButtonContainer: {
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  backButton: {
    backgroundColor: colors.bggray,
    padding: wp(1.5),
    borderRadius: wp(1.5),
    width: wp(8.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    height: hp(12),
    width: wp(30),
  },
  headerText: {
    fontSize: fp(2.5),
    fontWeight: '800',
    color: colors.black_test,
    marginTop: hp(2),
    marginBottom: hp(2),
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: fp(1.8),
    color: colors.icongray,
    fontWeight: "600",
    marginBottom: hp(1),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#E6EAF5",
    borderRadius: wp(2),
    marginBottom: hp(2),
    height: hp(6.5),
    paddingHorizontal: wp(2),
  },
  iconContainer: {
    backgroundColor: "#E6EAF5",
    borderRadius: wp(1.5),
    padding: wp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    padding: wp(2),
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: fp(1.5),
    color: colors.icongray,
    marginLeft: wp(3),
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: wp(4.5),
    height: wp(4.5),
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: wp(1),
    marginRight: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: colors.BLUE,
    borderColor: colors.BLUE,
  },
  rememberText: {
    fontSize: fp(1.8),
    color: colors.icongray,
  },
  forgotText: {
    fontSize: fp(1.8),
    color: colors.BLUE,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: colors.BLUE,
    borderRadius: wp(2),
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(3),
    elevation: 2,
  },
  loginButtonText: {
    color: colors.WHITE,
    fontSize: fp(2.2),
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2.5),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#9CA3AF",
  },
  dividerText: {
    marginHorizontal: wp(2),
    color: "#9CA3AF",
    fontSize: fp(2),
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    height: hp(6),
    marginBottom: hp(2),
    backgroundColor: colors.WHITE,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  socialIcon: {
    width: wp(5),
    height: wp(5),
    marginRight: wp(3),
  },
  appleIconContainer: {
    width: wp(5),
    height: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  socialButtonText: {
    fontSize: fp(2),
    color: colors.icongray,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  noAccountText: {
    fontSize: fp(2),
    color: colors.DARK_GRAY,
  },
  signupText: {
    fontSize: fp(2),
    color: colors.BLUE,
    fontWeight: '600',
  },
});

export default LoginScreenCustomer;