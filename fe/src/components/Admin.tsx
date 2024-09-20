import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient  } from 'react-query';
import axios from 'axios';


interface colorProps {
    bgColor?: string;
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
  const queryClient = useQueryClient();

  // useState for form data
  const [formData, setFormData] = useState({
    classId: '',
    name: '',
    startDate: '',
    time: '',
    location: '',
    capacity: '',
    status: 'open',
    teacher: '',
    description: '',
  });

  // Fetch Classes API
  const fetchClasses = async () => {
    const response = await axios.get('http://localhost:5002/api/classes');
    return response.data;
  };

  // React Query to fetch classes
  const { data, error, isLoading } = useQuery('classes', fetchClasses);

  // Add Class API
  const addClass = async (newClass: any) => {
    const response = await axios.post(
      'http://localhost:5002/api/classes', 
      newClass, // This is the request body (the data being sent)
      {
        withCredentials: true, // Ensure cookies are sent
      }
    );
    return response.data;
  };

  // React Query Mutation to add a class
  const classCreateMutation = useMutation(addClass, {
    onSuccess: () => {
      // Invalidate and refetch classes to show the newly added class
      queryClient.invalidateQueries('classes');
    },
  });

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    classCreateMutation.mutate(formData); // Trigger class creation mutation
    setFormData({
      classId: '',
      name: '',
      startDate: '',
      time: '',
      location: '',
      capacity: '',
      status: 'open',
      teacher: '',
      description: '',
    }); // Clear the form after submit
  };

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Container>
      {/* Add New Class Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Class</CardTitle>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <div className="grid">
              <InputGroup>
                <Label htmlFor="classId">Class Id</Label>
                <Input
                  id="classId"
                  value={formData.classId}
                  onChange={handleInputChange}
                  placeholder="Enter class ID"
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="name">Class Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter class name"
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  type="date"
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  type="time"
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="Enter class capacity"
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="status">Status</Label>
                <Select id="status" value={formData.status} onChange={handleInputChange}>
                  <option value="open">Open</option>
                  <option value="full">Full</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Select>
              </InputGroup>
            </div>
            <InputGroup>
              <Label htmlFor="teacher">Teacher</Label>
              <Textarea
                id="teacher"
                value={formData.teacher}
                onChange={handleInputChange}
                placeholder="Enter teacher's name"
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter class description"
              />
            </InputGroup>
            <Button type="submit">Add Class</Button>
          </Form>
        </CardContent>
      </Card>

      {/* Display Classes */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <thead>
              <tr>
                <TableHead>Class Id</TableHead>
                <TableHead>Class Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Status</TableHead>
              </tr>
            </thead>
            <tbody>
              {data?.classes.length === 0 ? (
                <tr>
                  <td colSpan={4}>No classes available</td>
                </tr>
              ) : (
                data?.classes.map((cls: classProps) => (
                  <tr key={cls.classId}>
                    <TableCell>{cls.classId}</TableCell>
                    <TableCell>{cls.name}</TableCell>
                    <TableCell>{new Date(cls.date).toLocaleDateString()}</TableCell> {/* Convert string to Date */}
                    <TableCell>{cls.status}</TableCell>
                    <TableCell>
                      {/* we need to edit /delete / changing status button here */}
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