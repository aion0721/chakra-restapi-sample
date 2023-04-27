import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';

export const List = () => {
  const [dept, setDept] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/checkin-dept?deptNumber=9300')
      .then(res => res.json())
      .then(data => {
        setDept(data[0].member.split(','));
      });
    fetch('http://localhost:3001/checkin?add_date=2023/04/27')
      .then(res => res.json())
      .then(data => {
        setUser(data);
      });
  }, []);
  return (
    <>
      <Button
        onClick={() => {
          console.log(dept);
          console.log(user);
        }}
      >
        Debug
      </Button>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>UserID</Th>
              <Th>Checkin</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dept && user ? (
              dept.map((ele, i) => {
                const userLogin = user.find(e => e.userid === ele)
                  ? 'OK'
                  : 'NG';
                return (
                  <Tr key={i}>
                    <Td>{ele}</Td>
                    <Td>{userLogin}</Td>
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
    </>
  );
};
