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
import { useNavigate, useSearchParams } from 'react-router-dom';

export const List = () => {
  const [dept, setDept] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    fetch(
      `http://localhost:3001/checkin-dept?deptNumber=${searchParams.get(
        'dept'
      )}`
    )
      .then(res => res.json())
      .then(data => {
        setDept(data[0].member.split(','));
      });
    fetch('http://localhost:3001/checkin?add_date=2023/04/27')
      .then(res => res.json())
      .then(data => {
        setUser(data);
      });
  }, [searchParams]);
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>User List</TableCaption>
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
      <Button
        onClick={() => navigate(`/?dept=${searchParams.get('dept') ?? ''}`)}
      >
        Go Back
      </Button>
    </>
  );
};
