import React from 'react';
import {
  Input,
  Box,
  Container,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Top = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <VStack>
          <HStack>
            <Box>DeptNumber</Box>
            <Box>
              <Input></Input>
            </Box>
          </HStack>
        </VStack>
        <VStack>
          <HStack>
            <Box>
              <Button onClick={() => navigate('/list')}>UserList</Button>
            </Box>
            <Box>
              <Button>FixedDept</Button>
            </Box>
          </HStack>
        </VStack>
      </Container>
    </>
  );
};

export default Top;
