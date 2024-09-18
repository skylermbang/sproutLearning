import React, { useState } from 'react';
import styled from 'styled-components';


interface colorProps {
    bgColor?: string;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #38a169;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2f855a;
  }
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

const TableCell = styled.td`
  font-size: 1rem;
  padding: 10px;
  border-bottom: 1px solid #e2e2e2;
`;

const Badge = styled.span<colorProps>`
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.875rem;
  color: #fff;
  font-weight: 600;
`;

// Main Component
export default function Component() {
  const [classes, setClasses] = useState([
    { id: 1, name: "Introduction to React", startDate: "2023-09-01", capacity: 30, enrolled: 25, status: "Active" },
    { id: 2, name: "Advanced JavaScript", startDate: "2023-10-15", capacity: 20, enrolled: 20, status: "Full" },
    { id: 3, name: "UX Design Basics", startDate: "2023-11-01", capacity: 25, enrolled: 10, status: "Open" },
  ]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //classCreateMutation.mutate(formData); // Trigger signup mutation
  };



  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Add New Class</CardTitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <div className="grid">
              <InputGroup>
                <Label htmlFor="className">Class Name</Label>
                <Input id="className" placeholder="Enter class name" required />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" required />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" required />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="location">Location</Label>
                <Input id="location" type="location" required />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" placeholder="Enter class capacity" required />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="status">Status</Label>
                <Select id="status">
                  <option value="open">Open</option>
                  <option value="full">Full</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Select>
              </InputGroup>
            </div>
            <InputGroup>
              <Label htmlFor="teacher">Teacher</Label>
              <Textarea id="teacher" placeholder="Enter class description" />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter class description" />
            </InputGroup>
            <Button type="submit">Add Class</Button>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <thead>
              <tr>
                <TableHead>Class Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Status</TableHead>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id}>
                  <TableCell>{cls.name}</TableCell>
                  <TableCell>{cls.startDate}</TableCell>
                  <TableCell>{cls.capacity}</TableCell>
                  <TableCell>{cls.enrolled}</TableCell>
                  <TableCell>{cls.status}</TableCell>
                  <TableCell>
                 
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
}
