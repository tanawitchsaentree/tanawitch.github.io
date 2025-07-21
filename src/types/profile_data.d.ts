import { ProfileData } from '../components/ChatBox';

declare module '../components/profile_data.json' {
  const value: ProfileData;
  export default value;
}
