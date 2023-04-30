import React, { useState } from 'react';
import {
  Input,
  Box,
  Container,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Top = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [dept, setDept] = useState(searchParams.get('dept') ?? '');
  return (
    <>
      <Container>
        <VStack>
          <HStack>
            <Box>DeptNumber</Box>
            <Box>
              <Input
                value={dept}
                onChange={e => setDept(e.target.value)}
              ></Input>
            </Box>
          </HStack>
        </VStack>
        <VStack>
          <HStack>
            <Box>
              <Button onClick={() => navigate(`/list?dept=${dept}`)}>
                UserList
              </Button>
            </Box>
            <Box>
              <Button onClick={() => navigate(`/dept?dept=${dept}`)}>
                FixedDept
              </Button>
            </Box>
          </HStack>
        </VStack>
      </Container>
    </>
  );
};

export default Top;
