import React, { useState } from 'react';
import styled from 'styled-components';





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
    
// Main Component

  const [classes, setClasses] = useState([
    { id: 1, name: "Introduction to React", description: "Learn the basics of React", startDate: "2023-09-01", capacity: 30, enrolled: 25, status: "Open" },
    { id: 2, name: "Advanced JavaScript", description: "Deep dive into advanced JS concepts", startDate: "2023-10-15", capacity: 20, enrolled: 20, status: "Full" },
    { id: 3, name: "UX Design Basics", description: "Fundamentals of user experience design", startDate: "2023-11-01", capacity: 25, enrolled: 10, status: "Open" },
    { id: 4, name: "Data Structures and Algorithms", description: "Essential computer science concepts", startDate: "2023-09-15", capacity: 40, enrolled: 35, status: "Open" },
    { id: 5, name: "Machine Learning Fundamentals", description: "Introduction to ML and AI", startDate: "2023-10-01", capacity: 30, enrolled: 28, status: "Open" },
  ]);

  const [enrolledClasses, setEnrolledClasses] = useState([
    { id: 6, name: "Web Development Bootcamp", startDate: "2023-08-01", status: "In Progress" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleEnroll = (classId:number) => {
    const classToEnroll = classes.find(c => c.id === classId);
    if (classToEnroll && classToEnroll.enrolled < classToEnroll.capacity) {
      setClasses(classes.map(c => 
        c.id === classId ? {...c, enrolled: c.enrolled + 1} : c
      ));
      setEnrolledClasses([...enrolledClasses, {
        id: classId,
        name: classToEnroll.name,
        startDate: classToEnroll.startDate,
        status: "Enrolled"
      }]);
    }
  };

  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Available Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Input 
              placeholder="Search classes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ScrollArea>
            <Table>
              <thead>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </thead>
              <tbody>
                {filteredClasses.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell>{cls.name}</TableCell>
                    <TableCell>{cls.description}</TableCell>
                    <TableCell>{cls.startDate}</TableCell>
                    <TableCell>
                     
                    </TableCell>
                    <TableCell>
                      <Button 
                        onClick={() => handleEnroll(cls.id)}
                        disabled={cls.enrolled >= cls.capacity || enrolledClasses.some(c => c.id === cls.id)}
                      >
                        {enrolledClasses.some(c => c.id === cls.id) ? 'Enrolled' : 'Enroll'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Enrolled Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <thead>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </thead>
            <tbody>
              {enrolledClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>{cls.startDate}</TableCell>
                  <TableCell>
                    <Badge variant={cls.status === 'In Progress' ? 'default' : 'secondary'}>
                      {cls.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
}

