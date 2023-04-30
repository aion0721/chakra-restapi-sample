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
  Heading,
} from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const List = props => {
  const [dept, setDept] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    fetch(
      `${props.config.apiBaseUrl}/checkin-dept?deptNumber=${searchParams.get(
        'dept'
      )}`
    )
      .then(res => res.json())
      .then(data => {
        setDept(data[0].member.split(','));
      });
    fetch(`${props.config.apiBaseUrl}/checkin?add_date=2023/04/27`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
      });
  }, [searchParams]);
  return (
    <>
      <Heading as="h2">List</Heading>
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
