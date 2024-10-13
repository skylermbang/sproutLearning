import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../api';
import { useQuery, useMutation, useQueryClient  } from 'react-query';
import { enrollUserInClass,fetchUserEnrollments,removeUserEnrollment  } from '../api';


interface User {
  admin: boolean;
  email: string;
  userId: string;
  userNickname: string;
}

interface classProps {
  classId: string;
  name: string;
  date: string; // Assuming date comes as a string from the API
  time: string;
  location: string;
  capacity: number;
  teacher: string;
  desc: string;
  status: string; // Assuming status is a string like 'open', 'full', etc.
  enrolled: number; // Assuming enrolled is a number (optional)
}
interface EnrolledClass {
  classId: string;
  _id: string;
  id: number;
  name: string;
  startDate: string;
  status: string;
}

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const CardHeader = styled.div`
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.th`
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  padding: 10px;
  background-color: #f9f9f9;
  border-bottom: 2px solid #e2e2e2;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  font-size: 1rem;
  padding: 10px;
  border-bottom: 1px solid #e2e2e2;
`;

const Badge = styled.span<{variant: string}>`
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.875rem;
  background-color: ${({ variant }) => (variant === 'destructive' ? '#e53e3e' : '#48bb78')};
  color: #fff;
  font-weight: 600;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  color: #fff;
  background-color: #38a169;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #2f855a;
  }
`;

const ScrollArea = styled.div`
  height: 400px;
  overflow-y: auto;
`;

export function Student(){
  const queryClient = useQueryClient();

  const fetchClasses = async () => {
    const response = await api.get('/classes'); // Base URL is automatically used here
    return response.data;
  };

 // React Query to fetch classes
const { data: classesData, error: classesError, isLoading: classesLoading } = useQuery('classes', fetchClasses);



const fetchCurrentUser = async (): Promise<User> => {
  const response = await api.get('/currentUser'); // Replace with your actual endpoint
  return response.data;
};

const { data: currentUser, isLoading, error } = useQuery<User>('currentUser', fetchCurrentUser, {
  enabled: false, // Only retrieve from cache
});

const userId = currentUser?.userId;
const { data: enrollmentsData, error: enrollmentsError, isLoading: enrollmentsLoading } = useQuery(
  ['userEnrollments', userId],
  () => fetchUserEnrollments(userId as string),
  {
    enabled: !!userId, // Only run the query when userId is defined
  }
);
console.log(enrollmentsData)

  // Mutation to handle enrolling in a class
const enrollMutation = useMutation(enrollUserInClass, {
  onSuccess: () => {
      queryClient.invalidateQueries('userEnrollments');
  },
  onError: (error) => {
      console.error('Error enrolling in class:', error);
  }
});

  const handleEnrollClick = (classId: string) => {
    //console.log("class Id is :" ,classId)
    enrollMutation.mutate(classId);
  };

  const removeEnrollmentMutation = useMutation((params: { classId: string; userId: string }) => removeUserEnrollment(params), {
    onSuccess: () => {
      console.log('Enrollment successfully removed');
      queryClient.invalidateQueries('userEnrollments'); // Refetch enrollments after removal
    },
    onError: (error) => {
      console.error('Failed to remove enrollment:', error);
    }
  });


  const handleRemoveClick = (classId: string) => {
    if (userId) {
      removeEnrollmentMutation.mutate({ classId, userId });
    } else {
      console.error("User ID not found.");
    }
  };
  return (
    <Container>
  <Card>
    <CardHeader>
      <CardTitle>Join Classes</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <thead>
          <tr>
            <TableHead>Class Id</TableHead>
            <TableHead>Class Name</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join</TableHead>
          </tr>
        </thead>
        <tbody>
          {classesData?.classes?.length === 0 ? (
            <tr>
              <td colSpan={5}>No classes available</td>
            </tr>
          ) : (
            classesData?.classes?.map((cls: classProps) => (
              <tr key={cls.classId}>
                <TableCell>{cls.classId}</TableCell>
                <TableCell>{cls.name}</TableCell>
                <TableCell>{new Date(cls.date).toLocaleDateString()}</TableCell>
                <TableCell>{cls.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEnrollClick(cls.classId)}
                    disabled={enrollmentsData?.enrollment?.some(
                      (enrolledClass: EnrolledClass) => enrolledClass.classId === cls.classId
                    )}
                  >
                    {enrollmentsData?.enrollment?.some(
                      (enrolledClass: EnrolledClass) => enrolledClass.classId === cls.classId
                    )
                      ? 'Enrolled'
                      : 'Join'}
                  </Button>
                </TableCell>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </CardContent>
  </Card>
      <Card>
        <CardHeader>
          <CardTitle>My Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <thead>
              <tr>
                <TableHead>Class Id</TableHead>
                <TableHead>Status</TableHead>
                <TableHead> Join</TableHead>
              </tr>
            </thead>
            <tbody>
              {enrollmentsData?.enrollment?.length === 0 ? (
                <tr>
                  <td colSpan={4}>No classes available</td>
                </tr>
              ) : (
                enrollmentsData?.enrollment?.map((cls: classProps) => (
                  <tr key={cls.classId}>
                    <TableCell>{cls.classId}</TableCell>
                    <TableCell>{cls.status}</TableCell>
                    <TableCell>
                    <Button
    onClick={() => handleRemoveClick(cls.classId)}
    disabled={removeEnrollmentMutation.isLoading}
  >
    {removeEnrollmentMutation.isLoading ? 'Removing...' : 'Remove'}
  </Button>
                    </TableCell>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
}

