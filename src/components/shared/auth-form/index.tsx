import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { supabase } from '@/lib/supabase';
import { useUser } from '@/contexts/AuthContext';

import { ThirdPartyProvider, Button, Input } from '@/components/shared';
import styles from './styles.module.scss';

type AuthFormProps = {
  type: 'sign-up' | 'sign-in';
};

type AuthFormInput = {
  username: string;
  email: string;
};

export function AuthForm({ type }: AuthFormProps) {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<string | null>(null);
  const formMethods = useForm<AuthFormInput>({ mode: 'onSubmit', reValidateMode: 'onBlur' });
  const user = useUser();
  const navigate = useNavigate();
  const { handleSubmit } = formMethods;
  const isSignInform = type === 'sign-in';
  const guestEmail = 'guest.be4e3dfc.d8c6@gmail.com';
  const guestPassword = 'r4nd0ms3cur3pw';

  // Redirect if user is found
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  // Form submission
  async function submitSignIn(formData: AuthFormInput) {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: import.meta.env.VITE_OTP_EMAIL_REDIRECT,
        },
      });

      if (error) {
        return setError(`An error occured: ${error.message}`);
      }

      setEmailSent('Check your email on this device for a single-use link to sign in.');
    } catch (error) {
      console.log(error);
      setError('Failed to sign in. Please check your email address and password.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGuestSignIn() {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: guestEmail,
        password: guestPassword,
      });

      if (error) {
        return setError(`An error occured: ${error.message}`);
      }

      navigate('/dashboard');
    } catch {
      setError('Failed to sign in as guest.');
    } finally {
      setLoading(false);
    }
  }

  function getButtonLabel() {
    if (loading) {
      return 'Loading...';
    }

    if (emailSent) {
      return 'Email sent!';
    }

    if (isSignInform) {
      return 'Sign in';
    }

    return 'Sign up';
  }

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <img src='/assets/images/logo_cropped_transparent.svg' alt='Jobstrackr logo' />
        <p>Sign in to start managing your job search.</p>
      </div>
      <div className={styles.providers}>
        <ThirdPartyProvider provider='google' />
        <ThirdPartyProvider provider='discord' />
      </div>
      <div className={styles.divider}>Or</div>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(submitSignIn)}>
          {error && <p className={styles.error}>{error}</p>}
          {emailSent && <p className={styles.notification}>{emailSent}</p>}
          <Input
            type='email'
            label='Email'
            autoComplete='email'
            disabled={loading || !!emailSent}
            name='email'
            required
          />
          <Button variant='primary' type='submit' fullWidth disabled={loading || !!emailSent}>
            {getButtonLabel()}
          </Button>
        </form>
      </FormProvider>
      <p className={styles.otp}>
        * JobsTrackr uses passwordless sign-in, meaning a single-use link will be sent to your email
        address. Clicking the link will sign you in and redirect you to JobsTrackr.
      </p>
      <button onClick={handleGuestSignIn} disabled={loading} className={styles.guestSignIn}>
        Continue as guest
      </button>
    </div>
  );
}
