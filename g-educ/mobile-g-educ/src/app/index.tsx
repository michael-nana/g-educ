import { Redirect } from 'expo-router';
import { useAuth } from '../state/AuthProvider';
import { LoadingState } from '../components/ui/Feedback';
export default function Index(){const {user,loading}=useAuth();if(loading)return <LoadingState/>;return <Redirect href={user?'/(student)/(tabs)':'/(auth)/login'}/>}
