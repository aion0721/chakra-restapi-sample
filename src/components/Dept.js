import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  TableContainer,
  TableCaption,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  Heading,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';

const Dept = props => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [dept, setDept] = useState([]);
  const [newFlag, setNewFlag] = useState(false);
  const deptParams = searchParams.get('dept');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    fetch(`${props.config.apiBaseUrl}/checkin-dept?deptNumber=${deptParams}`)
      .then(res => res.json())
      .then(data => {
        data.length === 0
          ? setNewFlag(true)
          : setDept(data[0].member.split(','));
      });
  }, [deptParams]);
  const handleDelete = props => {
    setDept(dept.filter(d => d !== props));
  };
  const handleAdd = props => {
    setDept([...dept, '']);
  };
  const handleChange = (index, value) => {
    setDept(dept.map((v, i) => (i === index ? value : v)));
  };
  const handleRegister = () => {
    const postData = { deptNumber: deptParams, member: dept.toString() };
    fetch(
      `${props.config.apiBaseUrl}/checkin-dept${
        newFlag ? '' : `?deptNumber=${deptParams}`
      }`,
      {
        method: 'POST',
        body: JSON.stringify(postData),
      }
    )
      .then(res => console.log(res))
      .then(onOpen);
  };
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Update Dialog
            </AlertDialogHeader>
            <AlertDialogBody> Update status</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                onClick={() => navigate(`/?dept=${deptParams}`)}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Heading as="h2">Dept Member Fixed</Heading>
      <Text>
        {newFlag ? 'New :' : 'Target :'}
        {deptParams}
      </Text>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>User List</TableCaption>
          <Thead>
            <Tr>
              <Th>UserID</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dept ? (
              dept.map((ele, i) => {
                return (
                  <Tr key={i}>
                    <Td>
                      <Input
                        value={dept[i]}
                        onChange={e => handleChange(i, e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Button
                        onClick={e => handleDelete(ele)}
                        colorScheme="red"
                      >
                        - Delete -
                      </Button>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td></Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => handleAdd()} colorScheme="teal">
        + ADD +
      </Button>
      <Button onClick={() => handleRegister()} colorScheme="blue">
        ! Register !
      </Button>
      <Button onClick={onOpen}># Clear #</Button>
      <Button onClick={() => navigate(`/?dept=${deptParams}`)}>Go Back</Button>
    </>
  );
};

export default Dept;
