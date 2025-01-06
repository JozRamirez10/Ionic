import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: '06_burguer_queen',
  webDir: 'www',
  plugins : {
  CapacitorHttp: {
    enabled: false
  }
}
};

export default config;
