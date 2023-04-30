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
} from '@chakra-ui/react';

const Dept = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [dept, setDept] = useState([]);
  const [newFlag, setNewFlag] = useState(false);
  const deptParams = searchParams.get('dept');

  useEffect(() => {
    fetch(`http://localhost:3001/checkin-dept?deptNumber=${deptParams}`)
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
    fetch(`http://localhost:3001/checkin-dept?deptNumber=${deptParams}`, {
      method: 'POST',
      body: JSON.stringify(postData),
    }).then(res => console.log(res));
  };
  return (
    <>
      <Heading>Dept Member Fixed</Heading>
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
      <Button onClick={() => handleRegister()}># Clear #</Button>
      <Button onClick={() => navigate(`/?dept=${deptParams}`)}>Go Back</Button>
    </>
  );
};

export default Dept;
