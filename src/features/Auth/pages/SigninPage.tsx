import { Box, Container, Divider, Typography } from '@mui/material';
import { StyledFirebaseAuth } from 'react-firebaseui';
import AuthBox from '../components/AuthBox';
import firebase from 'firebase';
import { auth } from 'services/firebase';

interface EntryPageProps {}

// Configure FirebaseUI.
const uiConfig: firebaseui.auth.Config = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  signInSuccessUrl: '/dashboard',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function EntryPage(props: EntryPageProps) {
  return (
    <Box>
      <Container sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
        <Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="h3" textAlign="center">
              Budget Pro
            </Typography>
          </Box>

          <AuthBox
            append={
              <>
                <Divider sx={{ width: '100%', py: 2 }}>or</Divider>

                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
              </>
            }
          />
        </Box>
      </Container>
    </Box>
  );
}

export default EntryPage;
