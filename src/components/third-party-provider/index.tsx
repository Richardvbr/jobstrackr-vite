import cn from "clsx";
import { Provider } from "@supabase/supabase-js/dist/module";

import { capitalizeFirstLetter } from "@/utils/text";
import { supabase } from "@/lib/supabase";
import styles from "./styles.module.scss";

type ThirdPartyProviderProps = {
  provider: Provider;
};

export function ThirdPartyProvider({ provider }: ThirdPartyProviderProps) {
  const providerName = capitalizeFirstLetter(provider);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: import.meta.env.VITE_OTP_EMAIL_REDIRECT,
      },
    });
  };

  const providerClasses = cn([styles.thirdPartyProvider], {
    [styles[provider]]: provider,
  });

  return (
    <div onClick={handleSignIn} className={providerClasses}>
      <div className={styles.logo}>
        <img src={`/assets/images/${provider}.svg`} alt={`${providerName} logo`} />
      </div>
      <span>{`Continue with ${providerName}`}</span>
    </div>
  );
}
