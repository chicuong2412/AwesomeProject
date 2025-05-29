declare module 'react-native-config' {
  export interface NativeConfig {
    ACCESS_TOKEN?: string;
    REFRESH_TOKEN?: string;
    PUBLIC_LINK?: string;
  }
  export const Config: NativeConfig;
  export default Config;
}
