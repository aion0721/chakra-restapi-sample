import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Heading,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { List } from './components/List';
import { Top } from './components/Top';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dept from './components/Dept';
import config from './config.json';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Heading as="h1"> [ Checkin System ]</Heading>
            <BrowserRouter>
              <Routes>
                <Route path={'/'} element={<Top />} />
                <Route path={'/list'} element={<List config={config} />} />
                <Route path={'/dept'} element={<Dept config={config} />} />
              </Routes>
            </BrowserRouter>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
